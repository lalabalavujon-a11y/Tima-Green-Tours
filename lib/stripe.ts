export async function fetchLineItems(sessionId: string, secretKey: string) {
  const url = `https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${secretKey}`,
    },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Stripe line items error: ${res.status} ${txt}`);
  }
  return res.json();
}

