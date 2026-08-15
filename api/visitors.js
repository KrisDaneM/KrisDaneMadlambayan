import { createHash } from 'node:crypto';
import { getDatabase } from './_lib/mongodb.js';

const METRICS_ID = 'portfolio';

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

async function registerVisitor(database, visitorId) {
  const visitors = database.collection('visitors');
  const metrics = database.collection('metrics');
  const visitorHash = createHash('sha256').update(visitorId).digest('hex');
  const now = new Date();
  let visitorResult;

  try {
    visitorResult = await visitors.updateOne(
      { _id: visitorHash },
      { $setOnInsert: { firstSeenAt: now }, $set: { lastSeenAt: now }, $inc: { views: 1 } },
      { upsert: true },
    );
  } catch (error) {
    if (error?.code !== 11000) throw error;
    await visitors.updateOne(
      { _id: visitorHash },
      { $set: { lastSeenAt: now }, $inc: { views: 1 } },
    );
    visitorResult = { upsertedCount: 0 };
  }

  const metricsResult = await metrics.findOneAndUpdate(
    { _id: METRICS_ID },
    {
      $inc: { totalViews: 1, uniqueVisitors: visitorResult.upsertedCount === 1 ? 1 : 0 },
      $set: { updatedAt: now },
      $setOnInsert: { projectViews: 0, resumeDownloads: 0 },
    },
    { upsert: true, returnDocument: 'after' },
  );
  return publicMetrics(metricsResult);
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Allow', 'GET, POST');

  try {
    const database = await getDatabase();
    if (request.method === 'GET') {
      const metrics = await database.collection('metrics').findOne(
        { _id: METRICS_ID },
        { projection: { _id: 0, totalViews: 1, uniqueVisitors: 1, projectViews: 1, resumeDownloads: 1 } },
      );
      return response.status(200).json(publicMetrics(metrics));
    }
    if (request.method === 'POST') {
      const visitorId = parseVisitorId(request.body);
      if (!visitorId) return response.status(400).json({ error: 'A valid visitorId is required.' });
      return response.status(200).json(await registerVisitor(database, visitorId));
    }
    return response.status(405).json({ error: 'Method not allowed.' });
  } catch {
    const error = request.method === 'GET'
      ? 'Unable to retrieve visitor metrics.'
      : 'Unable to register portfolio visit.';
    return response.status(500).json({ error });
  }
}
