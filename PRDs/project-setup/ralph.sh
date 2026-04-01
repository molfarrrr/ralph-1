#!/bin/bash
# ralph.sh — AI agent loop for project-setup PRD
# Usage: ./ralph.sh <iterations>

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

PRD="PRDs/project-setup/project-setup.PRD.md"
PROGRESS="PRDs/project-setup/progress.md"

for ((i=1; i<=$1; i++)); do
  echo "--- Iteration $i of $1 ---"

  result=$(docker sandbox run claude -p \
"@${PRD} @${PROGRESS}

You are an AI agent executing a PRD task by task.

## Before starting:
1. Read @${PROGRESS} carefully — it shows which tasks are done, blocked, or in progress.
   Use it to avoid re-doing completed work and to understand decisions made in prior iterations.
2. Read @${PRD} to understand the full task list, implementation details, and verification steps.

## Your job this iteration:
1. Pick ONE task that is still \`pending\` or \`in progress\`.
   Choose based on dependency order — earlier tasks must be complete before later ones.
2. Implement it fully, following every instruction in the PRD task definition.
3. Run every verification step listed under that task. All must pass before proceeding.
4. Update @${PROGRESS}: change the task row status to \`done\`.
5. Append an entry at the bottom of @${PROGRESS} in this format:

---
### [TASK-XXX] <task name> — iteration $i
- **Status:** done
- **Files changed:** <list files>
- **Key decisions:** <what and why, be terse>
- **Verification:** <which steps ran, what passed>
- **Notes:** <blockers, deviations, things next iteration should know>
---

6. Make a single git commit scoped to this task only.
7. ONLY work on one task per iteration.

## If all tasks in @${PROGRESS} are \`done\`:
Output exactly: <promise>COMPLETE</promise>
")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "All tasks complete. PRD done."
    exit 0
  fi
done

echo "Reached iteration limit ($1). Check $PROGRESS for remaining tasks."
