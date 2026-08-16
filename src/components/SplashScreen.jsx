import { memo, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'kdm_splash_seen';
const PROGRESS_START = 400;
const PROGRESS_DURATION = 1350;
const EXIT_START = 1780;
const FONT_READY_GRACE = 180;
const EXIT_SAFETY_DURATION = 750;

let showOnThisPageLoad = true;
try {
  showOnThisPageLoad = window.sessionStorage.getItem(STORAGE_KEY) !== 'true';
} catch {
  // Storage can be unavailable in privacy-restricted browsing contexts.
}

const easeOutCubic = (value) => 1 - ((1 - value) ** 3);

const SplashLogo = memo(function SplashLogo() {
  return (
    <div className="kdm-splash-logo" aria-hidden="true">
      <span className="kdm-splash-char">K</span>
      <span className="kdm-splash-char">D</span>
      <span className="kdm-splash-char">M</span>
      <span className="kdm-splash-char kdm-splash-dot">.</span>
      <i className="kdm-splash-cursor" />
    </div>
  );
});

export default function SplashScreen() {
  const [visible, setVisible] = useState(showOnThisPageLoad);
  const [progress, setProgress] = useState(1);
  const [exiting, setExiting] = useState(false);
  const startedAt = useRef(null);
  const frame = useRef(null);
  const exitTimer = useRef(null);
  const exitStarted = useRef(false);
  const lastProgress = useRef(1);
  const canPointerSkip = useRef(false);

  useEffect(() => {
    if (!visible) return undefined;

    try { window.sessionStorage.setItem(STORAGE_KEY, 'true'); } catch {
      // The module-level flag still prevents a replay during this app lifecycle.
    }
    showOnThisPageLoad = false;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reducedMotion) {
      setProgress(100);
      const reducedTimer = window.setTimeout(() => setVisible(false), 160);
      return () => {
        window.clearTimeout(reducedTimer);
      };
    }

    let fontsReady = !document.fonts;
    document.fonts?.ready.then(() => { fontsReady = true; }).catch(() => { fontsReady = true; });

    const skip = () => {
      if (exitStarted.current) return;
      exitStarted.current = true;
      setProgress(100);
      setExiting(true);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter') skip();
    };
    const pointerSkipTimer = window.setTimeout(() => { canPointerSkip.current = true; }, 450);
    window.addEventListener('keydown', onKeyDown);

    const animate = (timestamp) => {
      if (startedAt.current === null) startedAt.current = timestamp;
      const elapsed = timestamp - startedAt.current;

      if (elapsed >= PROGRESS_START) {
        const linear = Math.min((elapsed - PROGRESS_START) / PROGRESS_DURATION, 1);
        const next = Math.max(1, Math.round(easeOutCubic(linear) * 100));
        if (next !== lastProgress.current) {
          lastProgress.current = next;
          setProgress(next);
        }
      }

      if (elapsed >= EXIT_START && (fontsReady || elapsed >= EXIT_START + FONT_READY_GRACE)) {
        exitStarted.current = true;
        setExiting(true);
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
    };
  }, [visible]);

  useEffect(() => {
    if (!exiting) return undefined;
    exitTimer.current = window.setTimeout(() => setVisible(false), EXIT_SAFETY_DURATION);
    return () => window.clearTimeout(exitTimer.current);
  }, [exiting]);

  if (!visible) return null;

  const handlePointerSkip = () => {
    if (!canPointerSkip.current || exitStarted.current) return;
    exitStarted.current = true;
    setProgress(100);
    setExiting(true);
  };

  const handleRevealEnd = (event) => {
    if (event.target === event.currentTarget && event.animationName === 'kdm-splash-curve') setVisible(false);
  };

  return (
    <div
      className={`kdm-splash-stage${exiting ? ' is-exiting' : ''}`}
      aria-hidden="true"
      onPointerUp={handlePointerSkip}
    >
      <div className="kdm-splash-edge" />
      <div className="kdm-splash" onAnimationEnd={handleRevealEnd}>
        <div className="kdm-splash-content">
          <SplashLogo />
          <p className="kdm-splash-edition">Portfolio / 2026</p>
          <div className="kdm-splash-progress">
            <strong>{String(progress).padStart(3, '0')}</strong>
            <div className="kdm-splash-track"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
            <p className={progress >= 74 ? 'is-visible' : ''}><span aria-hidden="true">&darr;</span> Entering portfolio</p>
          </div>
        </div>
      </div>
    </div>
  );
}
