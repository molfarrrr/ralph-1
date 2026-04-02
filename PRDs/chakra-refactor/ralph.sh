#!/bin/bash
# ralph.sh — AI agent loop for chakra-refactor PRD
# Usage: ./ralph.sh <iterations>

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

WORKSPACE="$(pwd)"
PRD="PRDs/chakra-refactor/chakra-refactor.PRD.md"
PROGRESS="PRDs/chakra-refactor/progress.md"
LOG="PRDs/chakra-refactor/ralph.log"

echo "" > "$LOG"
echo "Ralph loop started at $(date)" | tee -a "$LOG"
echo "Workspace: $WORKSPACE" | tee -a "$LOG"
echo "Iterations: $1" | tee -a "$LOG"

for ((i=1; i<=$1; i++)); do
  echo "" | tee -a "$LOG"
  echo "========================================" | tee -a "$LOG"
  echo " Iteration $i of $1 — $(date)" | tee -a "$LOG"
  echo "========================================" | tee -a "$LOG"

  PROMPT="Read the files $PRD and $PROGRESS before doing anything.

You are an AI agent executing a Chakra UI refactoring PRD task by task.

## Strict boundaries — do not cross these under any circumstances:
- ONLY touch files listed in the current task definition. Nothing else.
- NEVER modify .claude/, CLAUDE.md, PRDs/, or ralph.sh.
- NEVER change visual behaviour — refactoring only. Pages must render identically before and after.
- NEVER add features or new UI elements. Only restructure existing code.
- If in doubt whether a file is in scope — do not touch it.

## You may:
- Create new files in src/components/ui/, src/theme/recipes/
- Edit existing src/ files to use shared components and recipes
- Edit .claude/skills/react-developer/SKILL.md (TASK-015 only)
- Run npx tsc --noEmit to verify TypeScript
- git add and commit only files changed for the current task

## Before starting:
1. Read $PROGRESS carefully — know what is done and what is pending.
2. Read $PRD — understand the full task, files to touch, and verification steps.
3. Read the actual source files listed in the task before editing them.

## Your job this iteration:
1. Pick ONE task that is still \`pending\` or \`in progress\`.
   Respect dependency order — recipes (001-002) before components (003-007) before refactors (008-014).
2. Implement it exactly as specified. No extras.
3. Run every verification step. All must pass.
4. Update $PROGRESS: set task status to \`done\`.
5. Append to $PROGRESS:

---
### [TASK-XXX] <task name> — iteration $i
- **Status:** done
- **Files changed:** <list>
- **Key decisions:** <terse>
- **Verification:** <what ran, what passed>
- **Notes:** <anything next iteration should know>
---

6. git add only the files changed for this task, then commit.
7. ONE task per iteration.

## If verification fails:
- Fix before marking done.
- If unfixable, mark \`blocked\` with reason.

## If all tasks are \`done\`:
Output exactly: <promise>COMPLETE</promise>"

  docker sandbox run claude "$WORKSPACE" -- -p "$PROMPT" 2>&1 | tee -a "$LOG"

  echo "" | tee -a "$LOG"
  echo "--- Iteration $i complete — $(date) ---" | tee -a "$LOG"
  git log --oneline -3 2>&1 | tee -a "$LOG"

  if grep -q "<promise>COMPLETE</promise>" "$LOG"; then
    echo "" | tee -a "$LOG"
    echo "Chakra refactor complete." | tee -a "$LOG"
    exit 0
  fi
done

echo "" | tee -a "$LOG"
echo "Reached iteration limit ($1). Check $PROGRESS for remaining tasks." | tee -a "$LOG"
