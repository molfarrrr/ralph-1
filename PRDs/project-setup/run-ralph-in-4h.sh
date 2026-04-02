#!/bin/bash

set -euo pipefail

WORKSPACE="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$WORKSPACE"

DELAY_SECONDS=$((4 * 60 * 60))

echo "Waiting 4 hours before starting PRDs/project-setup/ralph.sh..."
echo "Start requested at: $(date)"
echo "Scheduled run time: $(date -v+4H 2>/dev/null || true)"

sleep "$DELAY_SECONDS"

echo "Starting PRDs/project-setup/ralph.sh at $(date)"
exec bash PRDs/project-setup/ralph.sh "$@"
