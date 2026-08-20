import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function ScrollProgress({ href = '#manifesto' }) {
  const progressRef = useRef(null);

  useEffect(() => {
    const line = progressRef.current;
    if (!line) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      line.style.setProperty('--scroll-progress', String(progress));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <a ref={progressRef} className="editorial-scroll" href={href} aria-label="Scroll to explore the portfolio"><span><i /></span>Scroll / Explore <ArrowDown /></a>;
}
