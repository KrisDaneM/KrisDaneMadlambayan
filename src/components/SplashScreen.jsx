import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'kdm_splash_seen';
const TYPE_STEPS = [
  { at: 90, value: 'K' },
  { at: 195, value: 'KD' },
  { at: 305, value: 'KDM' },
  { at: 440, value: 'KDM.' },
];
const PROGRESS_START = 400;
const PROGRESS_DURATION = 1450;
const EXIT_START = 1930;
const EXIT_DURATION = 520;

let showOnThisPageLoad = true;
try {
  showOnThisPageLoad = window.sessionStorage.getItem(STORAGE_KEY) !== 'true';
} catch {
  // Storage can be unavailable in privacy-restricted browsing contexts.
}

const easeOutCubic = (value) => 1 - ((1 - value) ** 3);

export default function SplashScreen() {
  const [visible, setVisible] = useState(showOnThisPageLoad);
  const [typedLogo, setTypedLogo] = useState('');
  const [progress, setProgress] = useState(1);
  const [exiting, setExiting] = useState(false);
  const startedAt = useRef(null);
  const frame = useRef(null);
  const exitTimer = useRef(null);
  const lastProgress = useRef(1);
  const canPointerSkip = useRef(false);

  useEffect(() => {
    if (!visible) return undefined;

    try { window.sessionStorage.setItem(STORAGE_KEY, 'true'); } catch {
      // The module-level flag still prevents a replay during this app lifecycle.
    }
    showOnThisPageLoad = false;
    document.documentElement.classList.add('splash-active');

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reducedMotion) {
      setTypedLogo('KDM.');
      setProgress(100);
      const reducedTimer = window.setTimeout(() => setVisible(false), 220);
      return () => {
        window.clearTimeout(reducedTimer);
        document.documentElement.classList.remove('splash-active');
      };
    }

    const skip = () => {
      if (exitTimer.current !== null) return;
      setTypedLogo('KDM.');
      setProgress(100);
      setExiting(true);
      exitTimer.current = window.setTimeout(() => setVisible(false), EXIT_DURATION);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter') skip();
    };
    const pointerSkipTimer = window.setTimeout(() => { canPointerSkip.current = true; }, 450);
    window.addEventListener('keydown', onKeyDown);

    const animate = (timestamp) => {
      if (startedAt.current === null) startedAt.current = timestamp;
      const elapsed = timestamp - startedAt.current;
      const typeStep = TYPE_STEPS.findLast(({ at }) => elapsed >= at);
      if (typeStep) setTypedLogo((current) => current === typeStep.value ? current : typeStep.value);

      if (elapsed >= PROGRESS_START) {
        const linear = Math.min((elapsed - PROGRESS_START) / PROGRESS_DURATION, 1);
        const next = Math.max(1, Math.round(easeOutCubic(linear) * 100));
        if (next !== lastProgress.current) {
          lastProgress.current = next;
          setProgress(next);
        }
      }

      if (elapsed >= EXIT_START) setExiting(true);
      if (elapsed >= EXIT_START + EXIT_DURATION) {
        setVisible(false);
        return;
      }
      frame.current = window.requestAnimationFrame(animate);
    };
    frame.current = window.requestAnimationFrame(animate);

    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
      if (exitTimer.current !== null) window.clearTimeout(exitTimer.current);
      window.clearTimeout(pointerSkipTimer);
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.classList.remove('splash-active');
    };
  }, [visible]);

  if (!visible) return null;

  const handlePointerSkip = () => {
    if (!canPointerSkip.current || exitTimer.current !== null) return;
    setTypedLogo('KDM.');
    setProgress(100);
    setExiting(true);
    exitTimer.current = window.setTimeout(() => setVisible(false), EXIT_DURATION);
  };

  return (
    <div
      className={`kdm-splash${exiting ? ' is-exiting' : ''}`}
      aria-hidden="true"
      onPointerUp={handlePointerSkip}
    >
      <div className="kdm-splash-content">
        <div className="kdm-splash-logo" aria-hidden="true">
          <span>{typedLogo}</span><i className={typedLogo === 'KDM.' ? 'is-finished' : ''} />
        </div>
        <p className={`kdm-splash-edition${typedLogo.length >= 3 ? ' is-visible' : ''}`}>Portfolio / 2026</p>
        <div className="kdm-splash-progress">
          <strong>{String(progress).padStart(3, '0')}</strong>
          <div className="kdm-splash-track"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
          <p className={progress >= 74 ? 'is-visible' : ''}><span aria-hidden="true">&darr;</span> Entering portfolio</p>
        </div>
      </div>
    </div>
  );
}
