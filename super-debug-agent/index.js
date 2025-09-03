#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';
import pc from 'picocolors';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findProjectRoot(startDir) {
  let currentDir = startDir;
  while (true) {
    const packagePath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packagePath)) return currentDir;
    const parent = path.dirname(currentDir);
    if (parent === currentDir) return startDir;
    currentDir = parent;
  }
}

function log(message) {
  const time = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log(pc.dim(`[${time}]`), message);
}

function run(cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('exit', () => resolve());
  });
}

async function runEslintOrNext({ fix = false } = {}) {
  const cwd = process.cwd();
  const nextBin = path.join(cwd, 'node_modules', '.bin', 'next');
  const hasNext = fs.existsSync(nextBin);
  try {
    if (hasNext) {
      const args = ['lint'];
      if (fix) args.push('--fix');
      await run(nextBin, args);
    } else {
      const args = ['.', '--max-warnings=0'];
      if (fix) args.push('--fix');
      await run('npx', ['--yes', 'eslint', ...args]);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(pc.red('Linting reported issues.'));
  }
}

async function monitor() {
  const cwd = process.cwd();
  const root = findProjectRoot(cwd);
  log(pc.green('Super Debug Agent monitoring started'));
  log(`Root: ${pc.cyan(root)}`);

  const watcher = chokidar.watch(['**/*.{js,jsx,ts,tsx,json}'], {
    ignored: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'],
    ignoreInitial: true,
  });

  let running = false;
  let queued = false;

  const scheduleRun = async () => {
    if (running) {
      queued = true;
      return;
    }
    running = true;
    log(pc.yellow('Change detected. Running lint...'));
    await runEslintOrNext({ fix: false });
    running = false;
    if (queued) {
      queued = false;
      scheduleRun();
    }
  };

  watcher
    .on('add', scheduleRun)
    .on('change', scheduleRun)
    .on('unlink', scheduleRun);
}

const args = process.argv.slice(2);
if (args.includes('--monitor')) {
  monitor();
} else if (args.includes('--fix')) {
  runEslintOrNext({ fix: true });
} else {
  runEslintOrNext({ fix: false });
}

