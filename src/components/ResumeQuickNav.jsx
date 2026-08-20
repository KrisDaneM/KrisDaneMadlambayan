import { useEffect, useState } from 'react';

const sections = [
  ['resume-summary', 'Summary'],
  ['resume-strengths', 'Strengths'],
  ['resume-expertise', 'Expertise'],
  ['resume-certificates', 'Certificates'],
  ['resume-interests', 'Interests'],
  ['resume-download', 'Download'],
];

export default function ResumeQuickNav() {
  const [active, setActive] = useState(sections[0][0]);

  useEffect(() => {
    const elements = sections.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, .15, .35] });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });

  return <nav className="resume-quick-nav" aria-label="Résumé sections">{sections.map(([id, label], index) => <button type="button" className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined} onClick={() => jump(id)} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{label}</button>)}</nav>;
}
