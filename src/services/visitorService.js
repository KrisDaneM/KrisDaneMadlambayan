const VISITOR_ID_KEY = 'kdm_portfolio_visitor_id';
let registrationPromise;

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
    }).then(async (response) => {
      if (!response.ok) throw new Error('Visitor registration failed.');
      return response.json();
    });
  }
  return registrationPromise;
}
