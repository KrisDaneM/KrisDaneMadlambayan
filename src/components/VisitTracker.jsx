import { useEffect } from 'react';
import { registerPortfolioVisit } from '../services/visitorService';

export default function VisitTracker() {
  useEffect(() => {
    registerPortfolioVisit().catch(() => {
      if (import.meta.env.DEV) console.warn('Visitor metrics are temporarily unavailable.');
    });
  }, []);

  return null;
}
