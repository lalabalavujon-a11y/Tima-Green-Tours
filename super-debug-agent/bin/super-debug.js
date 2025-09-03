#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const [, , command = 'help'] = process.argv;

function run(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function ensureLocalInstallScript(cwd) {
  const localPath = path.join(cwd, 'super-debug-agent', 'scripts', 'install.js');
  if (fs.existsSync(localPath)) return localPath;
  try {
    const pkgRoot = path.dirname(new URL(import.meta.url).pathname);
    const resolved = path.resolve(pkgRoot, '..', 'scripts', 'install.js');
    if (fs.existsSync(resolved)) return resolved;
  } catch {}
  return null;
}

async function main() {
  const cwd = process.cwd();
  if (command === 'install') {
    const script = await ensureLocalInstallScript(cwd);
    if (script) {
      await run('node', [script]);
      return;
    }
    await run('node', ['scripts/install.js']);
    return;
  }
  if (command === 'start') {
    await run('node', ['index.js']);
    return;
  }
  if (command === 'fix') {
    await run('node', ['index.js', '--fix']);
    return;
  }
  if (command === 'monitor') {
    await run('node', ['index.js', '--monitor']);
    return;
  }
  // help
  // eslint-disable-next-line no-console
  console.log(`super-debug <command>
  install   Install ESLint and project configs
  start     Run one-time check
  fix       Run check with --fix
  monitor   Start file watcher`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

