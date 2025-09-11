// Google Sheets helper for appending and reading simple CRM data
import crypto from 'crypto';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SHEETS_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

function getPrivateKey() {
  let k = process.env.GOOGLE_SA_PRIVATE_KEY || '';
  return k.replace(/\\n/g, '\n');
}

async function getAccessToken() {
  const email = process.env.GOOGLE_SA_EMAIL!;
  const key = getPrivateKey();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };
  const base64url = (obj: any) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsigned = `${base64url(header)}.${base64url(payload)}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  const signature = signer.sign(key).toString('base64url');
  const assertion = `${unsigned}.${signature}`;
  const body = new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion });
  const res = await fetch(TOKEN_URL, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });
  if (!res.ok) throw new Error(`Token error: ${res.status}`);
  const json = await res.json();
  return json.access_token as string;
}

export async function appendLeadRow(values: any[]) {
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const range = encodeURIComponent(process.env.LEADS_SHEET_NAME || 'Leads!A1');
  const token = await getAccessToken();
  const res = await fetch(`${SHEETS_URL}/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) throw new Error(`Sheets append failed: ${res.status}`);
  return res.json();
}

export async function listLeads(limit = 100) {
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const range = encodeURIComponent(process.env.LEADS_SHEET_NAME || 'Leads!A1:H1000');
  const token = await getAccessToken();
  const res = await fetch(`${SHEETS_URL}/${sheetId}/values/${range}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Sheets read failed: ${res.status}`);
  const data = await res.json();
  const rows: string[][] = data.values || [];
  // Assume header in first row
  const header = rows[0] || [];
  return rows.slice(1, 1 + limit).map(r => Object.fromEntries(header.map((h: string, i: number) => [h, r[i] || ''])));
}

export async function listLeadsWithRows(limit = 200) {
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const range = encodeURIComponent(process.env.LEADS_SHEET_NAME || 'Leads!A1:Z10000');
  const token = await getAccessToken();
  const res = await fetch(`${SHEETS_URL}/${sheetId}/values/${range}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Sheets read failed: ${res.status}`);
  const data = await res.json();
  const rows: string[][] = data.values || [];
  const header = rows[0] || [];
  return rows.slice(1, 1 + limit).map((r, idx) => ({
    row: idx + 2, // account for header row at 1
    data: Object.fromEntries(header.map((h: string, i: number) => [h, r[i] || ''])),
  }));
}

export async function updateLeadRow(rowNumber: number, updates: Record<string, string>) {
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const sheetName = (process.env.LEADS_SHEET_NAME || 'Leads').replace(/!.*/, '');
  const token = await getAccessToken();

  // Read header to map columns
  const headerRes = await fetch(`${SHEETS_URL}/${sheetId}/values/${encodeURIComponent(sheetName + '!1:1')}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!headerRes.ok) throw new Error(`Header read failed: ${headerRes.status}`);
  const headerData = await headerRes.json();
  const header: string[] = (headerData.values && headerData.values[0]) || [];

  // Read existing row
  const rowRes = await fetch(`${SHEETS_URL}/${sheetId}/values/${encodeURIComponent(`${sheetName}!${rowNumber}:${rowNumber}`)}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!rowRes.ok) throw new Error(`Row read failed: ${rowRes.status}`);
  const rowData = await rowRes.json();
  const rowValues: string[] = (rowData.values && rowData.values[0]) || [];

  // Build new row
  const width = Math.max(header.length, rowValues.length);
  const newRow = new Array(width).fill('');
  for (let i = 0; i < width; i++) newRow[i] = rowValues[i] || '';
  for (const [k, v] of Object.entries(updates)) {
    const idx = header.indexOf(k);
    if (idx >= 0) newRow[idx] = v;
  }

  // Write back
  const updateRes = await fetch(`${SHEETS_URL}/${sheetId}/values/${encodeURIComponent(`${sheetName}!${rowNumber}:${rowNumber}`)}?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify({ values: [newRow] }),
  });
  if (!updateRes.ok) throw new Error(`Row update failed: ${updateRes.status}`);
  return updateRes.json();
}

export async function appendSocialPost(values: any[]) {
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const range = encodeURIComponent(process.env.POSTS_SHEET_NAME || 'Posts!A1');
  const token = await getAccessToken();
  const res = await fetch(`${SHEETS_URL}/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) throw new Error(`Sheets append failed: ${res.status}`);
  return res.json();
}

// Quotes helpers (simple sheet-backed storage)
export async function appendQuoteRow(values: any[]) {
  // Ensure header exists on first use
  try { await ensureQuotesHeader(); } catch { /* non-fatal */ }
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const range = encodeURIComponent(process.env.QUOTES_SHEET_NAME || 'Quotes!A1');
  const token = await getAccessToken();
  const res = await fetch(`${SHEETS_URL}/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) throw new Error(`Quotes append failed: ${res.status}`);
  const json = await res.json();
  // Try to parse updatedRange like 'Quotes!A13:H13' to get row number
  const updatedRange: string = json.updates?.updatedRange || '';
  const match = updatedRange.match(/!(?:[A-Z]+)(\d+):/);
  const row = match ? parseInt(match[1], 10) : undefined;
  return { ...json, row };
}

export async function listQuotesWithRows(limit = 500) {
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const range = encodeURIComponent(process.env.QUOTES_SHEET_NAME || 'Quotes!A1:Z10000');
  const token = await getAccessToken();
  const res = await fetch(`${SHEETS_URL}/${sheetId}/values/${range}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Quotes read failed: ${res.status}`);
  const data = await res.json();
  const rows: string[][] = data.values || [];
  const header = rows[0] || [];
  return rows.slice(1, 1 + limit).map((r, idx) => ({
    row: idx + 2,
    data: Object.fromEntries(header.map((h: string, i: number) => [h, r[i] || ''])),
  }));
}

export async function findQuoteRowById(quoteId: string) {
  const rows = await listQuotesWithRows(2000);
  const hit = rows.find(r => (r.data['Quote ID'] || r.data['QuoteId'] || r.data['quoteId']) === quoteId);
  return hit || null;
}

export async function updateQuoteRow(rowNumber: number, updates: Record<string, string>) {
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const sheetName = (process.env.QUOTES_SHEET_NAME || 'Quotes').replace(/!.*/, '');
  const token = await getAccessToken();

  // Read header to map columns
  const headerRes = await fetch(`${SHEETS_URL}/${sheetId}/values/${encodeURIComponent(sheetName + '!1:1')}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!headerRes.ok) throw new Error(`Quotes header read failed: ${headerRes.status}`);
  const headerData = await headerRes.json();
  const header: string[] = (headerData.values && headerData.values[0]) || [];

  // Read existing row
  const rowRes = await fetch(`${SHEETS_URL}/${sheetId}/values/${encodeURIComponent(`${sheetName}!${rowNumber}:${rowNumber}`)}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!rowRes.ok) throw new Error(`Quotes row read failed: ${rowRes.status}`);
  const rowData = await rowRes.json();
  const rowValues: string[] = (rowData.values && rowData.values[0]) || [];

  const width = Math.max(header.length, rowValues.length);
  const newRow = new Array(width).fill('');
  for (let i = 0; i < width; i++) newRow[i] = rowValues[i] || '';
  for (const [k, v] of Object.entries(updates)) {
    const idx = header.indexOf(k);
    if (idx >= 0) newRow[idx] = v;
  }

  const updateRes = await fetch(`${SHEETS_URL}/${sheetId}/values/${encodeURIComponent(`${sheetName}!${rowNumber}:${rowNumber}`)}?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify({ values: [newRow] }),
  });
  if (!updateRes.ok) throw new Error(`Quotes row update failed: ${updateRes.status}`);
  return updateRes.json();
}

// Ensure Quotes sheet has a header row
export async function ensureQuotesHeader() {
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const sheetName = (process.env.QUOTES_SHEET_NAME || 'Quotes').replace(/!.*/, '');
  const token = await getAccessToken();

  const headerRes = await fetch(`${SHEETS_URL}/${sheetId}/values/${encodeURIComponent(sheetName + '!1:1')}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!headerRes.ok) throw new Error(`Quotes header read failed: ${headerRes.status}`);
  const headerData = await headerRes.json();
  const header: string[] = (headerData.values && headerData.values[0]) || [];
  if (header.length > 0) return; // already has header

  const desired = [
    'Created At',
    'Quote ID',
    'Tour ID',
    'Date',
    'Pax',
    'Currency',
    'Amount',
    'Email',
    'Status',
    'Stripe Session ID',
    'Payment Link',
    'Payment Intent ID',
  ];
  const put = await fetch(`${SHEETS_URL}/${sheetId}/values/${encodeURIComponent(`${sheetName}!1:1`)}?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify({ values: [desired] }),
  });
  if (!put.ok) throw new Error(`Quotes header write failed: ${put.status}`);
}
