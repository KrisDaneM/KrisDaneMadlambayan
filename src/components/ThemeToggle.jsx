import { Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';

const STORAGE_KEY = 'portfolio-theme';

function getCurrentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme);
  const isTransitioning = useRef(false);
  const buttonRef = useRef(null);

  function applyThemeTokens(next) {
    const root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
  }

  function updateBrowserTheme(next) {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f7f2ea' : '#080808');
  }

  function persistTheme(next) {
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* The selected theme still works for this session. */ }
  }

  useEffect(() => {
    return () => document.documentElement.classList.remove('theme-transitioning');
  }, []);

  async function toggleTheme() {
    if (isTransitioning.current) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof document.startViewTransition !== 'function') {
      applyThemeTokens(next);
      updateBrowserTheme(next);
      setTheme(next);
      persistTheme(next);
      return;
    }

    isTransitioning.current = true;
    if (buttonRef.current) buttonRef.current.disabled = true;
    // Move the control immediately; keep React work out of the snapshot callback.
    flushSync(() => setTheme(next));
    document.documentElement.classList.add('theme-transitioning');
    try {
      const transition = document.startViewTransition(() => applyThemeTokens(next));
      await transition.finished;
      updateBrowserTheme(next);
      persistTheme(next);
    } catch {
      if (getCurrentTheme() !== next) applyThemeTokens(next);
      updateBrowserTheme(next);
      persistTheme(next);
    } finally {
      document.documentElement.classList.remove('theme-transitioning');
      isTransitioning.current = false;
      if (buttonRef.current) buttonRef.current.disabled = false;
    }
  }

  const light = theme === 'light';
  return <>
    <div className="appearance-control">
      <span className="appearance-label">Appearance</span>
      <button ref={buttonRef} className={`universe-switch${light ? ' is-light' : ''}`} type="button" role="switch" aria-checked={light} aria-label={`Switch to ${light ? 'dark' : 'light'} mode`} onClick={toggleTheme}>
        <span className="universe-icon universe-moon" aria-hidden="true"><Moon /></span>
        <span className="universe-track" aria-hidden="true"><i /></span>
        <span className="universe-icon universe-sun" aria-hidden="true"><Sun /></span>
      </button>
    </div>
    {createPortal(<div className="theme-transition-divider" aria-hidden="true" />, document.body)}
  </>;
}
