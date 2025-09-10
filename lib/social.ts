export async function scheduleSocialPostViaWebhook(payload: any) {
  const url = process.env.SOCIAL_WEBHOOK_URL || process.env.ZAPIER_WEBHOOK_URL || process.env.MAKE_WEBHOOK_URL;
  if (!url) return { ok: false, reason: 'No webhook configured' };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text();
    return { ok: false, status: res.status, body: txt };
  }
  return { ok: true };
}

