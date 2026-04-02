#!/bin/bash
# ralph.sh — AI agent loop for project-setup PRD
# Usage: ./ralph.sh <iterations>

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

WORKSPACE="$(pwd)"
PRD="PRDs/project-setup/project-setup.PRD.md"
PROGRESS="PRDs/project-setup/progress.md"
LOG="PRDs/project-setup/ralph.log"

echo "" > "$LOG"
echo "Ralph loop started at $(date)" | tee -a "$LOG"
echo "Workspace: $WORKSPACE" | tee -a "$LOG"
echo "Iterations: $1" | tee -a "$LOG"

# Pre-flight: install Playwright Chromium and verify
echo "" | tee -a "$LOG"
echo "Pre-flight: installing Playwright Chromium..." | tee -a "$LOG"
docker sandbox run claude "$WORKSPACE" -- -p "You must run these two bash commands in sequence and output the raw result of each. Do not ask questions. Do not summarise. Just run them.
1. npx playwright install chromium --with-deps
2. npx playwright --version && node -e \"const {chromium} = require('playwright'); chromium.executablePath() && console.log('Chromium OK:', chromium.executablePath())\"
If either command fails, output the error and exit." 2>&1 | tee -a "$LOG"
echo "Pre-flight complete." | tee -a "$LOG"

for ((i=1; i<=$1; i++)); do
  echo "" | tee -a "$LOG"
  echo "========================================" | tee -a "$LOG"
  echo " Iteration $i of $1 — $(date)" | tee -a "$LOG"
  echo "========================================" | tee -a "$LOG"

  PROMPT="Read the files $PRD and $PROGRESS before doing anything.

You are an AI agent executing a PRD task by task.

## Strict boundaries — do not cross these under any circumstances:
- ONLY touch files relevant to the current task. Nothing else.
- NEVER modify, delete, or overwrite anything inside .claude/ — settings, skills, or any config.
- NEVER modify CLAUDE.md, PRDs/, or ralph.sh.
- NEVER run npm create, npx create-*, or any scaffolding tool that overwrites the project.
- NEVER stage or commit files outside the scope of the current task.
- If in doubt whether a file is in scope — do not touch it.

## You may:
- Install packages (npm install)
- Edit and create src/ files
- Run builds, lints, and tests (npm run *)
- Use Playwright to verify UI in the browser
- git add and commit only files changed for the current task

## Before starting:
1. Read $PROGRESS carefully — it shows which tasks are done, blocked, or in progress.
   Use it to avoid re-doing completed work and to understand decisions made in prior iterations.
2. Read $PRD to understand the full task list, implementation details, and verification steps.

## Your job this iteration:
1. Pick ONE task that is still \`pending\` or \`in progress\`.
   Choose based on dependency order — earlier tasks must be complete before later ones.
2. Implement it fully, following every instruction in the PRD task definition.
3. Run every verification step listed under that task. All must pass before proceeding.
   - Use Bash for CLI verification (tsc, npm run lint, npm run test, npm run build)
   - Use Playwright tools for browser verification (navigate, evaluate, snapshot, resize)
4. Update $PROGRESS: change the task row status to \`done\`.
5. Append an entry at the bottom of $PROGRESS in this format:

---
### [TASK-XXX] <task name> — iteration $i
- **Status:** done
- **Files changed:** <list files>
- **Key decisions:** <what and why, be terse>
- **Verification:** <which steps ran, what passed>
- **Notes:** <blockers, deviations, things next iteration should know>
---

6. Make a single git commit scoped to this task only:
   git add <only files changed for this task>
   git commit -m \"<task description>\"
7. ONLY work on one task per iteration.

## If a verification step fails:
- Fix the issue before marking the task done
- Do not move to the next task with a broken state
- If you cannot fix it, mark the task as \`blocked\` in $PROGRESS with a clear reason

## If all tasks in $PROGRESS are \`done\`:
Output exactly: <promise>COMPLETE</promise>"

  # Stream output live — no buffering
  docker sandbox run claude "$WORKSPACE" -- -p "$PROMPT" 2>&1 | tee -a "$LOG"

  echo "" | tee -a "$LOG"
  echo "--- Iteration $i complete — $(date) ---" | tee -a "$LOG"
  echo "Recent commits:" | tee -a "$LOG"
  git log --oneline -3 2>&1 | tee -a "$LOG"

  if grep -q "<promise>COMPLETE</promise>" "$LOG"; then
    echo "" | tee -a "$LOG"
    echo "All tasks complete. PRD done." | tee -a "$LOG"
    exit 0
  fi
done

echo "" | tee -a "$LOG"
echo "Reached iteration limit ($1). Check $PROGRESS for remaining tasks." | tee -a "$LOG"
