import { createHash } from 'node:crypto';
import {
  CONTACT_LIMIT,
  contactIdentity,
  protectContactAttempt,
  releaseContactQuota,
  releaseDuplicateGuard,
  reserveContactQuota,
} from './_lib/contact-rate-limit.js';

const MAX_BODY_BYTES = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;
const PHONE_PATTERN = /^[+()\-\s\d.]{7,32}$/u;

function parseBody(body) {
  if (typeof body !== 'string') return body;
  try { return JSON.parse(body); } catch { return null; }
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim().replace(/\r\n?/gu, '\n') : '';
}

function hasUnsupportedControlCharacter(value, allowWhitespace = false) {
  return [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 && !(allowWhitespace && (code === 9 || code === 10));
  });
}

export function validateContactPayload(body) {
  const payload = parseBody(body);
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;

  const name = cleanText(payload.name);
  const email = cleanText(payload.email).toLowerCase();
  const phone = cleanText(payload.number || payload.phone);
  const message = cleanText(payload.message);
  const website = cleanText(payload.website);

  if (website) return { spam: true };
  if (name.length < 2 || name.length > 100 || /[\r\n]/u.test(name)) return null;
  if (email.length > 254 || !EMAIL_PATTERN.test(email) || /[\r\n]/u.test(email)) return null;
  if (phone && !PHONE_PATTERN.test(phone)) return null;
  if (message.length < 10 || message.length > 5000) return null;
  if (hasUnsupportedControlCharacter(name) || hasUnsupportedControlCharacter(message, true)) return null;

  return { name, email, phone, message, website: '' };
}

async function deliverWithEmailJs(input) {
  const serviceId = process.env.EMAILJS_SERVICE_ID || 'service_su6pyfv';
  const templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_fq7byqe';
  const publicKey = process.env.EMAILJS_PUBLIC_KEY || 'r0Ke9SEJtUOKvP8xw';
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!serviceId || !templateId || !publicKey) throw new Error('Contact delivery is not configured.');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const body = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        name: input.name,
        email: input.email,
        number: input.phone,
        phone: input.phone,
        message: input.message,
        from_name: input.name,
        reply_to: input.email,
      },
    };
    if (privateKey) body.accessToken = privateKey;
    const result = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!result.ok) throw new Error(`Email provider returned ${result.status}.`);
  } finally {
    clearTimeout(timeout);
  }
}

function sendError(response, status, code, message, retryAfterSeconds) {
  if (retryAfterSeconds) response.setHeader('Retry-After', String(retryAfterSeconds));
  return response.status(status).json({ success: false, code, message, ...(retryAfterSeconds ? { retryAfterSeconds } : {}) });
}

export default async function handler(request, response) {
  response.setHeader('Allow', 'POST');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'POST') return sendError(response, 405, 'METHOD_NOT_ALLOWED', 'Method not allowed.');
  if (!String(request.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    return sendError(response, 415, 'CONTACT_CONTENT_TYPE', 'The message request format is not supported.');
  }
  if (Number(request.headers['content-length'] || 0) > MAX_BODY_BYTES) {
    return sendError(response, 413, 'CONTACT_PAYLOAD_TOO_LARGE', 'The message is too large.');
  }

  const input = validateContactPayload(request.body);
  if (input?.spam) return response.status(200).json({ success: true, remaining: CONTACT_LIMIT });
  if (!input) return sendError(response, 400, 'CONTACT_INVALID', 'Please check the form fields and try again.');

  let reservation;
  let duplicateKey;
  try {
    const identity = contactIdentity(request, input.email);
    const fingerprint = createHash('sha256')
      .update(`${identity.ipHash}:${input.email}:${input.message}`)
      .digest('hex');
    const attempt = await protectContactAttempt({ ...identity, fingerprint });
    if (!attempt.allowed) {
      const message = attempt.code === 'CONTACT_DUPLICATE'
        ? 'This message was already submitted. Please wait before sending it again.'
        : 'Please wait a few seconds before sending another message.';
      return sendError(response, 429, attempt.code, message, attempt.retryAfterSeconds);
    }
    duplicateKey = attempt.duplicateKey;

    reservation = await reserveContactQuota(identity);
    if (!reservation.allowed) {
      await releaseDuplicateGuard(duplicateKey);
      duplicateKey = null;
      return sendError(
        response,
        429,
        'CONTACT_RATE_LIMITED',
        `You have reached the limit of ${CONTACT_LIMIT} messages. Please try again later.`,
        reservation.retryAfterSeconds,
      );
    }

    await deliverWithEmailJs(input);
    return response.status(200).json({ success: true, remaining: reservation.remaining });
  } catch {
    try {
      await Promise.allSettled([
        releaseContactQuota(reservation),
        releaseDuplicateGuard(duplicateKey),
      ]);
    } catch {
      // The public response remains intentionally generic and fail-closed.
    }
    return sendError(response, 503, 'CONTACT_UNAVAILABLE', 'The message service is temporarily unavailable. Please try again later.');
  }
}
