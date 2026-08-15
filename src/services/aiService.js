const AI_ENDPOINT = '/api/ai';
const MAX_HISTORY_ITEMS = 8;

export async function askPortfolioAssistant(message, history = []) {
  const response = await fetch(AI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      history: history
        .filter(({ role, content }) => ['user', 'assistant'].includes(role) && typeof content === 'string')
        .slice(-MAX_HISTORY_ITEMS)
        .map(({ role, content }) => ({ role, content })),
    }),
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error('Assistant response was not valid JSON.');
  }

  if (!response.ok || !payload?.success || typeof payload.answer !== 'string') {
    throw new Error('Portfolio assistant request failed.');
  }

  return payload.answer;
}
