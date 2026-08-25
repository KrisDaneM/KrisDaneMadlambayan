import { createHash } from 'node:crypto';
import { redis } from './_lib/redis.js';

const KEYS = {
  totalViews: 'kdm:analytics:totalViews',
  uniqueVisitors: 'kdm:analytics:uniqueVisitors',
  projectViews: 'kdm:analytics:projectViews',
  resumeDownloads: 'kdm:analytics:resumeDownloads',
  visitorIds: 'kdm:analytics:visitorIds',
};

function publicMetrics(document = {}) {
  return {
    totalViews: Number(document.totalViews) || 0,
    uniqueVisitors: Number(document.uniqueVisitors) || 0,
    projectViews: Number(document.projectViews) || 0,
    resumeDownloads: Number(document.resumeDownloads) || 0,
  };
}

function parseVisitorId(body) {
  let payload = body;
  if (typeof body === 'string') {
    try { payload = JSON.parse(body); } catch { return null; }
  }
  if (!payload || typeof payload.visitorId !== 'string') return null;
  const visitorId = payload.visitorId.trim();
  if (visitorId.length < 8 || visitorId.length > 200 || /\p{C}/u.test(visitorId)) return null;
  return visitorId;
}

function parseEvent(body) {
  let payload = body;
  if (typeof body === 'string') {
    try { payload = JSON.parse(body); } catch { return null; }
  }
  if (payload?.event === 'resume-download') return { type: 'resume-download' };
  if (payload?.event !== 'project-view' || typeof payload.slug !== 'string') return null;
  const slug = payload.slug.trim();
  return /^[a-z0-9-]{2,80}$/.test(slug) ? { type: 'project-view' } : null;
}

async function getMetrics() {
  const [totalViews, uniqueVisitors, projectViews, resumeDownloads] = await redis.mget(
    KEYS.totalViews,
    KEYS.uniqueVisitors,
    KEYS.projectViews,
    KEYS.resumeDownloads,
  );
  return publicMetrics({ totalViews, uniqueVisitors, projectViews, resumeDownloads });
}

async function registerEvent(key) {
  await redis.incr(key);
  return getMetrics();
}

async function registerVisitor(visitorId) {
  const visitorHash = createHash('sha256').update(visitorId).digest('hex');
  const isNewVisitor = (await redis.sadd(KEYS.visitorIds, visitorHash)) === 1;
  const pipeline = redis.pipeline();

  pipeline.incr(KEYS.totalViews);
  if (isNewVisitor) pipeline.incr(KEYS.uniqueVisitors);

  await pipeline.exec();
  return getMetrics();
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Allow', 'GET, POST');

  try {
    if (request.method === 'GET') {
      return response.status(200).json(await getMetrics());
    }
    if (request.method === 'POST') {
      const event = parseEvent(request.body);
      if (event?.type === 'project-view') return response.status(200).json(await registerEvent(KEYS.projectViews));
      if (event?.type === 'resume-download') return response.status(200).json(await registerEvent(KEYS.resumeDownloads));
      const visitorId = parseVisitorId(request.body);
      if (!visitorId) return response.status(400).json({ error: 'A valid visitorId is required.' });
      return response.status(200).json(await registerVisitor(visitorId));
    }
    return response.status(405).json({ error: 'Method not allowed.' });
  } catch {
    const error = request.method === 'GET'
      ? 'Unable to retrieve visitor metrics.'
      : 'Unable to register portfolio visit.';
    return response.status(500).json({ error });
  }
}
