#!/bin/bash
# ralph.sh — AI agent loop for {{PRD_NAME}}
# Usage: ./ralph.sh <iterations>
#
# Claude runs autonomously inside a Docker sandbox — full permissions are safe
# because Docker provides the isolation boundary.

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

PRD="{{PRD_PATH}}"
PROGRESS="{{PROGRESS_PATH}}"

{{PREFLIGHT_BLOCK}}

for ((i=1; i<=$1; i++)); do
  echo ""
  echo "========================================"
  echo " Iteration $i of $1"
  echo "========================================"

  result=$(docker sandbox run claude \
    --dangerously-skip-permissions \
    --allowedTools "{{ALLOWED_TOOLS}}" \
    -p \
"@${PRD} @${PROGRESS}

You are an AI agent executing a PRD task by task. You have full permissions to:
- Install packages (npm install)
- Edit and create files
- Run builds, lints, and tests (npm run *)
{{EXTRA_CAPABILITIES}}
- Make git commits

## Before starting:
1. Read @${PROGRESS} carefully — it shows which tasks are done, blocked, or in progress.
   Use it to avoid re-doing completed work and to understand decisions made in prior iterations.
2. Read @${PRD} to understand the full task list, implementation details, and verification steps.

## Your job this iteration:
1. Pick ONE task that is still \`pending\` or \`in progress\`.
   Choose based on dependency order — earlier tasks must be complete before later ones.
2. Implement it fully, following every instruction in the PRD task definition.
3. Run every verification step listed under that task. All must pass before proceeding.
{{VERIFICATION_TOOLS_HINT}}
4. Update @\${PROGRESS}: change the task row status to \`done\`.
5. Append an entry at the bottom of @\${PROGRESS} in this format:

---
### [TASK-XXX] <task name> — iteration \$i
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
- If you cannot fix it, mark the task as \`blocked\` in @\${PROGRESS} with a clear reason

## If all tasks in @\${PROGRESS} are \`done\`:
Output exactly: <promise>COMPLETE</promise>
")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "All tasks complete. PRD done."
    exit 0
  fi
done

echo ""
echo "Reached iteration limit ($1). Check $PROGRESS for remaining tasks."
