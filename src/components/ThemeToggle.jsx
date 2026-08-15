import { Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const STORAGE_KEY = 'portfolio-theme';

function getCurrentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme);
  const [transitionTheme, setTransitionTheme] = useState(null);
  const isTransitioning = useRef(false);

  function applyTheme(next) {
    const root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f7f2ea' : '#080808');
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* The selected theme still works for this session. */ }
    setTheme(next);
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const followSystem = (event) => {
      let saved = null;
      try { saved = window.localStorage.getItem(STORAGE_KEY); } catch { /* Storage may be unavailable. */ }
      if (saved !== 'light' && saved !== 'dark') {
        const next = event.matches ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        document.documentElement.style.colorScheme = next;
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f7f2ea' : '#080808');
        setTheme(next);
      }
    };
    media.addEventListener('change', followSystem);
    return () => {
      media.removeEventListener('change', followSystem);
      document.documentElement.classList.remove('theme-transitioning');
    };
  }, []);

  async function toggleTheme() {
    if (isTransitioning.current) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof document.startViewTransition !== 'function') {
      applyTheme(next);
      return;
    }

    isTransitioning.current = true;
    setTransitionTheme(next);
    document.documentElement.classList.add('theme-transitioning');
    try {
      const transition = document.startViewTransition(() => applyTheme(next));
      await transition.finished;
    } finally {
      document.documentElement.classList.remove('theme-transitioning');
      isTransitioning.current = false;
      setTransitionTheme(null);
    }
  }

  const light = theme === 'light';
  return <>
    <div className="appearance-control">
      <span className="appearance-label">Appearance</span>
      <button className="universe-switch" type="button" role="switch" aria-checked={light} aria-label={`Switch to ${light ? 'dark' : 'light'} mode`} onClick={toggleTheme} disabled={Boolean(transitionTheme)}>
        <span className="universe-icon universe-moon" aria-hidden="true"><Moon /></span>
        <span className="universe-track" aria-hidden="true"><i /></span>
        <span className="universe-icon universe-sun" aria-hidden="true"><Sun /></span>
      </button>
    </div>
    {createPortal(<div className="theme-transition-divider" aria-hidden="true" />, document.body)}
  </>;
}
