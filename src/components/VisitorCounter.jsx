import { useEffect, useState } from 'react';
import { registerPortfolioVisit } from '../services/visitorService';

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    registerPortfolioVisit()
      .then((metrics) => { if (active) setCount(metrics.uniqueVisitors); })
      .catch(() => {
        if (active) setUnavailable(true);
        if (import.meta.env.DEV) console.warn('Visitor metric is temporarily unavailable.');
      });
    return () => { active = false; };
  }, []);

  if (unavailable) return null;
  return (
    <div className="visitor-counter" aria-live="polite" aria-label={count === null ? 'Loading portfolio visitor count' : `${count} unique portfolio visitors`}>
      <span>KDM / Live</span>
      <strong>{count === null ? '—' : count.toLocaleString()}</strong>
      <small>Portfolio visitors</small>
    </div>
  );
}
