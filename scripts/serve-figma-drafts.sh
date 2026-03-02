#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-3310}"

cd "$(dirname "$0")/.."
echo "Serving figma-drafts at http://localhost:${PORT}"
python3 -m http.server "${PORT}" --directory figma-drafts
