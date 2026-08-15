import { createHash } from 'node:crypto';

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;
const requestBuckets = globalThis.__kdmAiRequestBuckets ?? new Map();
globalThis.__kdmAiRequestBuckets = requestBuckets;

// Best-effort burst protection for each warm function instance. A shared store
// would be required for a distributed, deployment-wide rate limit.

function clientHash(request) {
  const forwarded = request.headers['x-forwarded-for'];
  const address = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];
  const input = address?.trim() || request.socket?.remoteAddress || 'unknown';
  return createHash('sha256').update(`kdm-ai:${input}`).digest('hex');
}

export function checkRateLimit(request, now = Date.now()) {
  const key = clientHash(request);
  const existing = requestBuckets.get(key);
  const bucket = !existing || now >= existing.resetAt
    ? { count: 0, resetAt: now + WINDOW_MS }
    : existing;

  bucket.count += 1;
  requestBuckets.set(key, bucket);

  if (requestBuckets.size > 500) {
    for (const [storedKey, storedBucket] of requestBuckets) {
      if (now >= storedBucket.resetAt) requestBuckets.delete(storedKey);
    }
  }

  return {
    allowed: bucket.count <= MAX_REQUESTS,
    retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}
