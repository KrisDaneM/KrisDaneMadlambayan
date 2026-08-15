import { ArrowUp, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { askPortfolioAssistant } from '../services/aiService';

const INTRO_MESSAGE = {
  id: 'intro',
  role: 'assistant',
  content: 'Hi — I’m the KDM portfolio assistant. Ask me about Kris, his projects, skills, or work. I know a little about the person behind the code, too.',
};

const SUGGESTED_QUESTIONS = [
  'What projects has Kris built?',
  'Tell me about SOCConsult',
  'Tell me about AC-CORE',
  'What technologies does Kris use?',
  'What does Kris do outside coding?',
  'How can I contact Kris?',
];

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export default function PortfolioAssistant() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INTRO_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const conversationRef = useRef(null);
  const closeTimerRef = useRef(null);
  const hintIntroTimerRef = useRef(null);
  const hintHideTimerRef = useRef(null);

  const openAssistant = useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
    window.clearTimeout(hintHideTimerRef.current);
    setHintVisible(false);
    setMounted(true);
    window.requestAnimationFrame(() => {
      setOpen(true);
      window.requestAnimationFrame(() => inputRef.current?.focus());
    });
  }, []);

  const showHint = useCallback(() => {
    if (open) return;
    window.clearTimeout(hintHideTimerRef.current);
    setHintVisible(true);
  }, [open]);

  const hideHint = useCallback(() => {
    window.clearTimeout(hintHideTimerRef.current);
    hintHideTimerRef.current = window.setTimeout(() => setHintVisible(false), 180);
  }, []);

  const finishClose = useCallback(() => {
    setMounted(false);
    triggerRef.current?.focus();
  }, []);

  const closeAssistant = useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
    setOpen(false);
    if (reducedMotion()) finishClose();
    else closeTimerRef.current = window.setTimeout(finishClose, 210);
  }, [finishClose]);

  const sendMessage = useCallback(async (rawMessage) => {
    const message = rawMessage.trim();
    if (!message || loading || message.length > 1600) return;

    const history = messages
      .filter(({ id, error }) => id !== 'intro' && !error)
      .map(({ role, content }) => ({ role, content }))
      .slice(-8);
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content: message },
    ]);
    setInput('');
    setLoading(true);

    try {
      const answer = await askPortfolioAssistant(message, history);
      setMessages((current) => [
        ...current,
        { id: `assistant-${Date.now()}`, role: 'assistant', content: answer },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'The portfolio assistant is temporarily unavailable.',
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages]);

  useEffect(() => {
    if (!mounted) return undefined;
    const handleEscape = (event) => {
      if (event.key === 'Escape') closeAssistant();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeAssistant, mounted]);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem('kdm_assistant_hint_seen')) return undefined;
      hintIntroTimerRef.current = window.setTimeout(() => {
        window.sessionStorage.setItem('kdm_assistant_hint_seen', 'true');
        setHintVisible(true);
        hintHideTimerRef.current = window.setTimeout(() => setHintVisible(false), 5500);
      }, 900);
    } catch {
      hintIntroTimerRef.current = window.setTimeout(() => {
        setHintVisible(true);
        hintHideTimerRef.current = window.setTimeout(() => setHintVisible(false), 5500);
      }, 900);
    }

    return () => {
      window.clearTimeout(hintIntroTimerRef.current);
      window.clearTimeout(hintHideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    let locked = false;

    const restoreScroll = () => {
      if (!locked) return;
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
      locked = false;
    };

    const syncScrollLock = () => {
      if (!mobileQuery.matches) {
        restoreScroll();
        return;
      }
      if (locked) return;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
      locked = true;
    };

    syncScrollLock();
    mobileQuery.addEventListener('change', syncScrollLock);
    return () => {
      mobileQuery.removeEventListener('change', syncScrollLock);
      restoreScroll();
    };
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: reducedMotion() ? 'auto' : 'smooth',
    });
  }, [loading, messages, mounted]);

  useEffect(() => () => {
    window.clearTimeout(closeTimerRef.current);
    window.clearTimeout(hintIntroTimerRef.current);
    window.clearTimeout(hintHideTimerRef.current);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className={`portfolio-assistant${open ? ' is-open' : ''}`}>
      {mounted && (
        <section
          id="assistant-panel"
          className={`assistant-panel${open ? ' is-open' : ''}`}
          role="dialog"
          aria-labelledby="assistant-title"
          aria-describedby="assistant-description"
        >
          <header className="assistant-header">
            <div>
              <span>Portfolio AI</span>
              <h2 id="assistant-title">KDM / ASSISTANT</h2>
            </div>
            <button type="button" onClick={closeAssistant} aria-label="Close KDM portfolio assistant">
              <X aria-hidden="true" size={17} />
            </button>
          </header>

          <p id="assistant-description" className="assistant-description">
            Ask me about Kris and his work.
          </p>

          <div ref={conversationRef} className="assistant-conversation" aria-live="polite">
            {messages.map((message) => (
              <div className={`assistant-message is-${message.role}${message.error ? ' is-error' : ''}`} key={message.id}>
                <span>{message.role === 'assistant' ? 'KDM' : 'YOU'}</span>
                <p>{message.content}</p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="assistant-suggestions" aria-label="Suggested questions">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button type="button" key={question} onClick={() => sendMessage(question)} disabled={loading}>
                    {question}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="assistant-thinking" role="status">
                <span>KDM is thinking</span><i /><i /><i />
              </div>
            )}
          </div>

          <form className="assistant-form" onSubmit={submit}>
            <label htmlFor="assistant-input" className="sr-only">Ask the KDM portfolio assistant</label>
            <textarea
              ref={inputRef}
              id="assistant-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask about my projects, skills, or experience..."
              maxLength={1600}
              rows="2"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
              <ArrowUp aria-hidden="true" size={17} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={`assistant-hint${hintVisible && !open ? ' is-visible' : ''}`}
        onClick={openAssistant}
        tabIndex={hintVisible && !open ? 0 : -1}
        aria-hidden={!hintVisible || open}
      >
        <strong>Need me?</strong>
        <span>Ask about Kris.</span>
      </button>

      <button
        ref={triggerRef}
        type="button"
        className={`assistant-trigger${open ? ' is-open' : ''}`}
        onClick={mounted && open ? closeAssistant : openAssistant}
        aria-label={open ? 'Close KDM portfolio assistant' : 'Open KDM portfolio assistant'}
        aria-expanded={open}
        aria-controls="assistant-panel"
        onMouseEnter={showHint}
        onMouseLeave={hideHint}
        onFocus={showHint}
        onBlur={hideHint}
      >
        <span className="assistant-logo">KDM<span className="assistant-logo-accent" aria-hidden="true">.</span></span>
      </button>
    </div>
  );
}
