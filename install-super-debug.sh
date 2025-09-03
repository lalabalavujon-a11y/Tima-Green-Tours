#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(pwd)"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[Super Debug] Installing into: $ROOT_DIR"

if [ -d "$SCRIPT_DIR/super-debug-agent" ]; then
  echo "[Super Debug] Using local super-debug-agent package"
  (cd "$ROOT_DIR" && node "$SCRIPT_DIR/super-debug-agent/scripts/install.js")
else
  echo "[Super Debug] super-debug-agent not found next to this script. Attempting npx..."
  npx --yes super-debug-agent@latest install || true
fi

echo "\n[Super Debug] Done. Try:"
echo "  npm run debug:start"
echo "  npm run debug:fix"
echo "  npm run debug:monitor"


