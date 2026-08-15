const VISITOR_ID_KEY = 'kdm_portfolio_visitor_id';
let registrationPromise;
let metricsPromise;
const projectViewPromises = new Map();

async function parseMetricsResponse(response, failureMessage) {
  if (!response.ok) throw new Error(failureMessage);
  const data = await response.json();
  const keys = ['totalViews', 'uniqueVisitors', 'projectViews', 'resumeDownloads'];
  if (!keys.every((key) => Number.isFinite(data[key]))) throw new Error('Invalid visitor metrics response.');
  return data;
}

function createAnonymousId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  if (globalThis.crypto?.getRandomValues) {
    const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function getAnonymousVisitorId() {
  try {
    const existing = window.localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const visitorId = createAnonymousId();
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
    return visitorId;
  } catch {
    return createAnonymousId();
  }
}

export function registerPortfolioVisit() {
  if (!registrationPromise) {
    registrationPromise = fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId: getAnonymousVisitorId() }),
    }).then((response) => parseMetricsResponse(response, 'Visitor registration failed.'));
  }
  return registrationPromise;
}

export function getPortfolioMetrics() {
  if (!metricsPromise) {
    metricsPromise = fetch('/api/visitors', { headers: { Accept: 'application/json' } })
      .then((response) => parseMetricsResponse(response, 'Visitor metrics request failed.'))
      .catch((error) => {
        metricsPromise = undefined;
        throw error;
      });
  }
  return metricsPromise;
}

export function trackProjectView(slug) {
  if (!projectViewPromises.has(slug)) {
    const request = fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'project-view', slug }),
    })
      .then((response) => parseMetricsResponse(response, 'Project view tracking failed.'))
      .then((metrics) => {
        metricsPromise = Promise.resolve(metrics);
        return metrics;
      })
      .catch((error) => {
        projectViewPromises.delete(slug);
        throw error;
      });
    projectViewPromises.set(slug, request);
  }
  return projectViewPromises.get(slug);
}
