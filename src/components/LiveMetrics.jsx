import { useEffect, useState } from 'react';
import AnimatedNumber from './AnimatedNumber';
import { projects } from '../data/projects';
import { getPortfolioMetrics, registerPortfolioVisit } from '../services/visitorService';

const metricDefinitions = [
  { key: 'uniqueVisitors', label: 'Unique visitors' },
  { key: 'totalViews', label: 'Total views' },
  { key: 'totalProjects', label: 'Total projects' },
];

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    registerPortfolioVisit()
      .then(() => getPortfolioMetrics())
      .then((data) => { if (active) setMetrics(data); })
      .catch((error) => {
        if (active) setUnavailable(true);
        if (import.meta.env.DEV) console.error('[KDM Metrics] Failed to load metrics:', error.message);
      });
    return () => { active = false; };
  }, []);

  return (
    <section className="live-metrics-section" aria-labelledby="live-metrics-title">
      <div className="container">
        <header className="live-metrics-header">
          <h2 id="live-metrics-title">KDM / Live metrics</h2>
          <p><span aria-hidden="true" />Live activity</p>
        </header>
        <div
          className="live-metrics-grid"
          aria-live="polite"
          aria-busy={!metrics && !unavailable}
          aria-label={unavailable ? 'Live metrics are temporarily unavailable' : undefined}
        >
          {metricDefinitions.map(({ key, label }, index) => (
            <div className="live-metric" key={key}>
              <span className="live-metric-index">{String(index + 1).padStart(2, '0')}</span>
              <strong><AnimatedNumber value={key === 'totalProjects' ? projects.length : metrics?.[key]} /></strong>
              <span className="live-metric-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
