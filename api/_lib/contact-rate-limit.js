import { createHmac, randomUUID } from 'node:crypto';
import { redis } from './redis.js';

export const CONTACT_LIMIT = 5;
export const CONTACT_WINDOW_SECONDS = 24 * 60 * 60;

const CONTACT_NAMESPACE = 'kdm:contact:ratelimit';
const MINIMUM_INTERVAL_SECONDS = 5;
const DUPLICATE_WINDOW_SECONDS = 10 * 60;

const RESERVE_SCRIPT = `
local now = tonumber(ARGV[1])
local cutoff = now - tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local member = ARGV[4]
local ttl = tonumber(ARGV[5])

redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', cutoff)
redis.call('ZREMRANGEBYSCORE', KEYS[2], '-inf', cutoff)

local ipCount = redis.call('ZCARD', KEYS[1])
local emailCount = redis.call('ZCARD', KEYS[2])

if ipCount >= limit or emailCount >= limit then
  local oldestIp = redis.call('ZRANGE', KEYS[1], 0, 0, 'WITHSCORES')
  local oldestEmail = redis.call('ZRANGE', KEYS[2], 0, 0, 'WITHSCORES')
  local resetAt = now
  if ipCount >= limit and oldestIp[2] then resetAt = math.max(resetAt, tonumber(oldestIp[2]) + tonumber(ARGV[2])) end
  if emailCount >= limit and oldestEmail[2] then resetAt = math.max(resetAt, tonumber(oldestEmail[2]) + tonumber(ARGV[2])) end
  return {0, ipCount, emailCount, resetAt}
end

redis.call('ZADD', KEYS[1], now, member)
redis.call('ZADD', KEYS[2], now, member)
redis.call('PEXPIRE', KEYS[1], ttl)
redis.call('PEXPIRE', KEYS[2], ttl)
return {1, ipCount + 1, emailCount + 1, now + tonumber(ARGV[2])}
`;

const RELEASE_SCRIPT = `
redis.call('ZREM', KEYS[1], ARGV[1])
redis.call('ZREM', KEYS[2], ARGV[1])
return 1
`;

function secret() {
  const value = process.env.CONTACT_RATE_LIMIT_SECRET || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!value) throw new Error('Contact rate-limit secret is unavailable.');
  return value;
}

function digest(value) {
  return createHmac('sha256', secret()).update(value).digest('hex');
}

export function getServerObservedIp(request) {
  if (process.env.VERCEL) {
    const forwarded = request.headers['x-vercel-forwarded-for'];
    const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    return value?.split(',')[0]?.trim() || null;
  }
  return request.socket?.remoteAddress || null;
}

export function contactIdentity(request, normalizedEmail) {
  const ip = getServerObservedIp(request);
  if (!ip) throw new Error('A server-observed client address is unavailable.');
  return {
    ipHash: digest(`ip:${ip}`),
    emailHash: digest(`email:${normalizedEmail}`),
  };
}

export async function protectContactAttempt({ ipHash, fingerprint }) {
  const intervalKey = `${CONTACT_NAMESPACE}:interval:${ipHash}`;
  const duplicateKey = `${CONTACT_NAMESPACE}:duplicate:${digest(fingerprint)}`;
  const intervalAccepted = await redis.set(intervalKey, '1', { nx: true, ex: MINIMUM_INTERVAL_SECONDS });
  if (!intervalAccepted) {
    return { allowed: false, code: 'CONTACT_TOO_FAST', retryAfterSeconds: MINIMUM_INTERVAL_SECONDS };
  }

  const duplicateAccepted = await redis.set(duplicateKey, '1', { nx: true, ex: DUPLICATE_WINDOW_SECONDS });
  if (!duplicateAccepted) {
    return { allowed: false, code: 'CONTACT_DUPLICATE', retryAfterSeconds: DUPLICATE_WINDOW_SECONDS };
  }

  return { allowed: true, duplicateKey };
}

export async function reserveContactQuota({ ipHash, emailHash, now = Date.now() }) {
  const member = `${now}:${randomUUID()}`;
  const keys = [
    `${CONTACT_NAMESPACE}:ip:${ipHash}`,
    `${CONTACT_NAMESPACE}:email:${emailHash}`,
  ];
  const windowMs = CONTACT_WINDOW_SECONDS * 1000;
  const result = await redis.eval(RESERVE_SCRIPT, keys, [now, windowMs, CONTACT_LIMIT, member, windowMs]);
  const [allowed, ipCount, emailCount, resetAt] = result.map(Number);
  const used = Math.max(ipCount, emailCount);
  return {
    allowed: allowed === 1,
    keys,
    member,
    remaining: Math.max(0, CONTACT_LIMIT - used),
    retryAfterSeconds: allowed === 1 ? 0 : Math.max(1, Math.ceil((resetAt - now) / 1000)),
  };
}

export async function releaseContactQuota(reservation) {
  if (!reservation?.member || !reservation?.keys) return;
  await redis.eval(RELEASE_SCRIPT, reservation.keys, [reservation.member]);
}

export async function releaseDuplicateGuard(key) {
  if (key) await redis.del(key);
}
