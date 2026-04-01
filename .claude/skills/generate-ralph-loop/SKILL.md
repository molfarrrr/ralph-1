---
name: generate-ralph-loop
description: Generates a tailored ralph.sh agent loop script for a given PRD, including pre-flight environment setup based on detected prerequisites
---

# Generate Ralph Loop

When invoked, read the target PRD file, analyze it for required tools and environments,
then generate a customized `ralph.sh` script using `templates/base.sh` as the base
and `examples/project-setup.ralph.sh` as a complete reference implementation.

Output the script to the same folder as the PRD's `progress.md`.

---

## Step 1 — Identify the PRD

Ask the user for the PRD path if not already provided in the invocation.
Then read the full PRD file.

---

## Step 2 — Detect Prerequisites

Scan the PRD's **Verification** sections for tools, runtimes, and services.
Use this detection table to map findings to pre-flight commands:

### Detection Table

| Signal in PRD | Prerequisite | Pre-flight command |
|---|---|---|
| `Playwright`, `browser_navigate`, `browser_snapshot`, `browser_evaluate` | Chromium browser | `npx playwright install chromium --with-deps` |
| `pytest`, `python`, `.py` files | Python + pip deps | `pip install -r requirements.txt` |
| `docker-compose`, `docker compose` | Docker Compose services | `docker compose up -d && sleep 5` |
| `psql`, `postgres`, `pg_` | PostgreSQL | `pg_isready \|\| (pg_ctlcluster start && sleep 3)` |
| `redis-cli`, `Redis` | Redis | `redis-cli ping \|\| (redis-server --daemonize yes && sleep 2)` |
| `mongo`, `MongoDB` | MongoDB | `mongosh --eval "db.runCommand({ping:1})" \|\| (mongod --fork --logpath /tmp/mongo.log && sleep 3)` |
| `go test`, `.go` files | Go deps | `go mod download` |
| `cargo test`, `.rs` files | Rust deps | `cargo fetch` |
| `mvn`, `gradle`, `.java` files | Java deps | `mvn dependency:resolve -q` or `gradle dependencies -q` |
| `npx tsc`, `tsconfig` | TypeScript | already covered by npm install — no extra pre-flight |
| `npm run`, `package.json` | Node deps | `npm install` (add as first pre-flight always if Node project) |

### Always include
- If the PRD involves any `npm`/Node project: add `npm install` as the first pre-flight step.
- If the PRD uses Playwright verification steps: always add Chromium install.

---

## Step 3 — Detect Allowed Tools

Build the `--allowedTools` list based on what the PRD's verification steps require:

**Always include (base set):**
```
Bash,Read,Write,Edit,Glob,Grep
```

**Add if Playwright verification steps detected:**
```
mcp__playwright__browser_navigate,mcp__playwright__browser_snapshot,mcp__playwright__browser_click,mcp__playwright__browser_evaluate,mcp__playwright__browser_resize,mcp__playwright__browser_console_messages,mcp__playwright__browser_network_requests,mcp__playwright__browser_wait_for,mcp__playwright__browser_take_screenshot,mcp__playwright__browser_type,mcp__playwright__browser_hover
```

**Add if GitHub MCP operations detected (PRs, issues, CI):**
```
mcp__github__create_pull_request,mcp__github__get_pull_request,mcp__github__list_issues
```

---

## Step 4 — Build Extra Capabilities List

Based on detected tools, add bullet points to the "You have full permissions to:" section:

| Detected | Add capability line |
|---|---|
| Playwright | `- Use Playwright to verify UI in the browser` |
| Docker Compose | `- Start and stop Docker Compose services` |
| Database | `- Connect to and query the database` |
| Python | `- Install and run Python packages` |

---

## Step 5 — Build Verification Tools Hint

Add a hint line under "Run every verification step" describing how to verify for this PRD:

Examples:
- Node/Playwright PRD: `   - Use Bash for CLI verification (tsc, npm run lint, npm run test, npm run build)\n   - Use Playwright tools for browser verification (navigate, evaluate, snapshot, resize)`
- Python/API PRD: `   - Use Bash to run pytest and curl API endpoints`
- Go PRD: `   - Use Bash to run go test ./... and check exit codes`

---

## Step 6 — Generate the Script

Using `templates/base.sh` as the base, substitute all placeholders:

| Placeholder | Value |
|---|---|
| `{{PRD_NAME}}` | Human-readable PRD name (from the PRD's `#` heading) |
| `{{PRD_PATH}}` | Relative path to the PRD `.md` file |
| `{{PROGRESS_PATH}}` | Relative path to `progress.md` (same folder as PRD) |
| `{{PREFLIGHT_BLOCK}}` | All pre-flight steps assembled from Step 2, each wrapped in an `echo` + `docker sandbox run` block (see example below) |
| `{{ALLOWED_TOOLS}}` | Comma-separated tool list from Step 3 |
| `{{EXTRA_CAPABILITIES}}` | Bullet lines from Step 4 |
| `{{VERIFICATION_TOOLS_HINT}}` | Hint line from Step 5 |

### Pre-flight block format

Each prerequisite becomes:
```bash
echo "Pre-flight: <description>..."
docker sandbox run claude \
  --dangerously-skip-permissions \
  -p "Run this bash command and output the result: <command>"
echo "Pre-flight complete: <description>"
echo ""
```

---

## Step 7 — Write and confirm

- Write the generated script to `<PRD_folder>/ralph.sh`
- Set executable: `chmod +x <PRD_folder>/ralph.sh`
- Print a summary of what was detected and what pre-flight steps were added
- Show the user the recommended invocation command:
  ```bash
  ./<PRD_folder>/ralph.sh <number_of_tasks + 5>
  ```

---

## Reference Files

- **Base template:** `.claude/skills/generate-ralph-loop/templates/base.sh`
- **Complete example:** `.claude/skills/generate-ralph-loop/examples/project-setup.ralph.sh`

When in doubt about structure or formatting, refer to the example — it is a fully working
output for the `PRDs/project-setup/project-setup.PRD.md` PRD.
