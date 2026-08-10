import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';

function getCurrentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme);

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
    return () => media.removeEventListener('change', followSystem);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f7f2ea' : '#080808');
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* The selected theme still works for this session. */ }
    setTheme(next);
  }

  const light = theme === 'light';
  return (
    <div className="appearance-control">
      <span className="appearance-label">Appearance</span>
      <button className="universe-switch" type="button" role="switch" aria-checked={light} aria-label={`Switch to ${light ? 'dark' : 'light'} mode`} onClick={toggleTheme}>
        <span className="universe-icon universe-moon" aria-hidden="true"><Moon /></span>
        <span className="universe-track" aria-hidden="true"><i /></span>
        <span className="universe-icon universe-sun" aria-hidden="true"><Sun /></span>
      </button>
    </div>
  );
}
