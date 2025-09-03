#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

function readJSON(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function mergePackageJson(projectPkg) {
  projectPkg.scripts = projectPkg.scripts || {};
  const hasNext = Boolean((projectPkg.dependencies && projectPkg.dependencies.next) || (projectPkg.devDependencies && projectPkg.devDependencies['eslint-config-next']));
  projectPkg.scripts['debug:start'] = projectPkg.scripts['debug:start'] || (hasNext ? 'next lint' : 'eslint .');
  projectPkg.scripts['debug:fix'] = projectPkg.scripts['debug:fix'] || (hasNext ? 'next lint --fix' : 'eslint . --fix');
  projectPkg.scripts['debug:monitor'] = projectPkg.scripts['debug:monitor'] || 'super-debug monitor';
  return projectPkg;
}

function ensureFile(filePath, content) {
  if (fs.existsSync(filePath)) return;
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content);
}

function run(cmd, args, { cwd } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: 'inherit', shell: false });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

async function ensureDeps(cwd) {
  const deps = [
    // Match existing project ESLint 8 to avoid conflicts
    'eslint@^8',
    '@typescript-eslint/parser@^6',
    '@typescript-eslint/eslint-plugin@^6',
    'eslint-plugin-react@^7',
    'eslint-plugin-react-hooks@^4',
    'eslint-plugin-import@^2',
    'eslint-config-prettier@^9',
    'prettier@^3'
  ];
  try {
    await run('npm', ['pkg', 'get', 'dependencies'], { cwd });
  } catch {
    // ignore
  }
  await run('npm', ['install', '--save-dev', ...deps], { cwd });
}

function eslintConfig() {
  return `{
  "env": { "es2022": true, "node": true, "browser": true },
  "overrides": [
    {
      "files": ["**/*.{ts,tsx}"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": { "ecmaVersion": 2022, "sourceType": "module", "project": false },
      "plugins": ["@typescript-eslint"],
      "extends": ["plugin:@typescript-eslint/recommended"]
    }
  ],
  "plugins": ["react", "react-hooks", "import"],
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:import/recommended", "prettier"],
  "settings": { "react": { "version": "detect" } },
  "rules": {
    "no-console": "off",
    "import/order": ["warn", { "alphabetize": { "order": "asc" }, "newlines-between": "always" }],
    "react/react-in-jsx-scope": "off"
  }
}
`;
}

function superdebugRc() {
  return `{
  "monitor": { "paths": ["**/*.{js,jsx,ts,tsx}"], "ignore": ["**/node_modules/**"] },
  "autofix": true
}
`;
}

function cursorRules() {
  return `# Cursor integration rules for Super Debug Agent\n# Keep concise and team-approved defaults.\n`;
}

async function main() {
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, 'package.json');
  const pkg = readJSON(pkgPath) || { name: path.basename(cwd) };
  writeJSON(pkgPath, mergePackageJson(pkg));

  // Only create .eslintrc.json if not using Next's config
  const projectPkgAfter = readJSON(pkgPath);
  const hasNext = Boolean((projectPkgAfter.dependencies && projectPkgAfter.dependencies.next) || (projectPkgAfter.devDependencies && projectPkgAfter.devDependencies['eslint-config-next']));
  if (!hasNext) {
    ensureFile(path.join(cwd, '.eslintrc.json'), eslintConfig());
  }
  ensureFile(path.join(cwd, '.superdebugrc'), superdebugRc());
  ensureFile(path.join(cwd, '.cursorrules'), cursorRules());

  await ensureDeps(cwd);

  // eslint-disable-next-line no-console
  console.log('\nSuper Debug Agent installed. Run:');
  // eslint-disable-next-line no-console
  console.log('  npm run debug:start');
  // eslint-disable-next-line no-console
  console.log('  npm run debug:fix');
  // eslint-disable-next-line no-console
  console.log('  npm run debug:monitor');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


