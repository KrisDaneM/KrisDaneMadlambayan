import { useEffect, useRef, useState } from 'react';
import AnimatedNumber from './AnimatedNumber';
import { resumeStats } from '../data/resume';

export default function ResumeStats() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: .2 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  return <aside className="resume-stats" ref={rootRef}><div className="resume-card-label"><span>Development stats</span><small>Derived from portfolio data</small></div><div>{resumeStats.map((stat, index) => <article key={stat.label}><span>{String(index + 1).padStart(2, '0')}</span><strong><AnimatedNumber value={visible ? stat.value : null} /></strong><p>{stat.label}</p></article>)}</div></aside>;
}
