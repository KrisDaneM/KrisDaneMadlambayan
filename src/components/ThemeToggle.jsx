import { Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';

function getCurrentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme);
  const buttonRef = useRef(null);
  const timerRef = useRef(null);

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
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const rect = buttonRef.current?.getBoundingClientRect();
    root.style.setProperty('--theme-x', `${rect ? rect.left + rect.width / 2 : window.innerWidth / 2}px`);
    root.style.setProperty('--theme-y', `${rect ? rect.top + rect.height / 2 : window.innerHeight / 2}px`);
    root.classList.remove('theme-changing');
    void root.offsetWidth;
    root.classList.add('theme-changing');
    root.dataset.theme = next;
    root.style.colorScheme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f7f2ea' : '#080808');
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* The selected theme still works for this session. */ }
    setTheme(next);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => root.classList.remove('theme-changing'), 620);
  }

  const light = theme === 'light';
  return (
    <div className="appearance-control">
      <span className="appearance-label">Appearance</span>
      <button ref={buttonRef} className="universe-switch" type="button" role="switch" aria-checked={light} aria-label={`Switch to ${light ? 'dark' : 'light'} mode`} onClick={toggleTheme}>
        <span className="universe-icon universe-moon" aria-hidden="true"><Moon /></span>
        <span className="universe-track" aria-hidden="true"><i /></span>
        <span className="universe-icon universe-sun" aria-hidden="true"><Sun /></span>
      </button>
    </div>
  );
}
