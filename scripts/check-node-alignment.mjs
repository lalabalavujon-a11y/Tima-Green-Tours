// Verify Node version alignment across .nvmrc, package.json engines, and Vercel project
import { readFileSync, existsSync } from 'node:fs';

function readText(path) {
  return existsSync(path) ? readFileSync(path, 'utf8').trim() : null;
}

function readJson(path) {
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null;
}

function majorFromSemverRange(range) {
  // Expect forms like ">=22 <23" or "22.x" or "22"
  if (!range) return null;
  const m = range.match(/(\d{1,2})/);
  return m ? Number(m[1]) : null;
}

function fail(msg) {
  console.error(`[verify:node] ${msg}`);
  process.exit(1);
}

const nvmrc = readText('.nvmrc');
const pkg = readJson('package.json');
const vercel = readJson('.vercel/project.json');

const nvmMajor = nvmrc ? Number(nvmrc.replace(/[^0-9].*$/, '')) : null;
const enginesRange = pkg?.engines?.node || null;
const enginesMajor = majorFromSemverRange(enginesRange);
const vercelNode = vercel?.settings?.nodeVersion || vercel?.nodeVersion || null;
const vercelMajor = majorFromSemverRange(vercelNode);

if (!nvmMajor) fail('Missing or invalid .nvmrc (expected a major like "22").');
if (!enginesMajor) fail('Missing or invalid package.json engines.node (e.g., ">=22 <23").');
if (!vercelMajor) fail('Missing or invalid .vercel/project.json nodeVersion (e.g., "22.x").');

if (nvmMajor !== enginesMajor) {
  fail(`.nvmrc major (${nvmMajor}) != engines.node major (${enginesMajor}).`);
}
if (nvmMajor !== vercelMajor) {
  fail(`.nvmrc major (${nvmMajor}) != Vercel nodeVersion major (${vercelMajor}).`);
}

console.log(`[verify:node] OK: Node ${nvmMajor} aligned across .nvmrc, engines, and Vercel.`);
