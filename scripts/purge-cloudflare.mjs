// Purge Cloudflare cache for a zone or specific hostnames
// Requires env vars: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID

const token = process.env.CLOUDFLARE_API_TOKEN;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;
const purgeAll = process.env.CF_PURGE_ALL === '1' || process.argv.slice(2).includes('--all');
const hostsArg = process.argv.slice(2).filter((a) => !a.startsWith('--'));

if (!token || !zoneId) {
  console.error(
    "Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID.\n" +
      "Set them in your shell or .env.local, e.g.:\n" +
      "CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ZONE_ID=... npm run cf:purge:app"
  );
  process.exit(1);
}

const endpoint = `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`;

const body = purgeAll
  ? { purge_everything: true }
  : hostsArg.length > 0
  ? { hosts: hostsArg }
  : { hosts: ["app.timagreentours.com"] };

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

async function main() {
  try {
    const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(body) });
    const json = await res.json();
    if (!res.ok || !json.success) {
      // Some accounts may not support purge by hosts; optionally suggest purge_everything
      const hint = !purgeAll
        ? "\nIf your plan doesn't support host purges, retry with: CF_PURGE_ALL=1 npm run cf:purge:all"
        : '';
      throw new Error(`Cloudflare purge failed: ${res.status} ${res.statusText} ${JSON.stringify(json)}${hint}`);
    }
    if (purgeAll) {
      console.log('Cloudflare: Purged entire zone cache successfully.');
    } else {
      console.log(`Cloudflare: Purged cache for hosts: ${(body.hosts || []).join(', ')}`);
    }
  } catch (err) {
    console.error(String(err));
    process.exit(1);
  }
}

main();

