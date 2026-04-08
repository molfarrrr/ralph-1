## Agent Guidance

Use the repository's Claude-style guidance as the primary source of truth for Codex work in this project.

1. Read `CLAUDE.md` first before planning, editing, or running project commands.
2. Treat `CLAUDE.md` as the primary source for project info, coding conventions, routing, testing, and command usage.
3. Read relevant files in `.claude/` for agent and skill guidance after reading `CLAUDE.md`.
4. In particular, consult `.claude/skills/react-developer/SKILL.md` before developing any React feature, component, page, or hook.
5. Do not modify, delete, or overwrite anything inside `.claude/` unless the repository guidance explicitly requires it for the task.
6. When guidance overlaps, prefer the most specific local Claude guidance that applies to the current task.
7. If additional Claude guidance exists deeper in the tree, read the closest relevant file before making changes in that area.
