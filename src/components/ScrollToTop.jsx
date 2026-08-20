import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let frame = 0;
    let innerFrame = 0;
    let retry = 0;

    const scrollToHash = () => {
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return false;
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
      return true;
    };

    if (hash) {
      frame = window.requestAnimationFrame(() => {
        innerFrame = window.requestAnimationFrame(() => {
          if (!scrollToHash()) retry = window.setTimeout(scrollToHash, 120);
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(innerFrame);
      window.clearTimeout(retry);
    };
  }, [pathname, hash]);

  return null;
}
