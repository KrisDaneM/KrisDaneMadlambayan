const OBVIOUS_INAPPROPRIATE = /\b(kantot(?:in|an| nga)?|putang\s*ina|putangina|tang\s*ina(?:\s+mo)?|tangina(?:\s+mo)?|fuck\s+(?:you|off)|bold\s+sex|explicit\s+sex|sexual\s+request)\b/i;
const PORTFOLIO_INTENT = /\b(kris|kdm|portfolio|projects?|socconsult|ac[-\s]?core|thryve|smartcalc|recowebdation|attheblanc|q[-\s]?zone|stack|tech(?:nology|nologies)?|skills?|frontend|backend|contact|resume|website|case study)\b/i;
const QUESTION_INTENT = /\b(what|which|how|tell|ano|alin|paano|anong)\b/i;

export function isPrimarilyInappropriate(message) {
  if (!OBVIOUS_INAPPROPRIATE.test(message)) return false;
  return !(PORTFOLIO_INTENT.test(message) && QUESTION_INTENT.test(message));
}

export function getInappropriateResponse(message, history = []) {
  if (!isPrimarilyInappropriate(message)) return null;
  const repeated = history.some((entry) => entry.role === 'user' && isPrimarilyInappropriate(entry.content));
  return repeated
    ? 'Boss makulit ka. Sabi nang wag ganyan. Tanong ka na lang tungkol kay Kris.'
    : "Boss wag ganyan, masama 'yan. Kakarmahin ka niyan.";
}
