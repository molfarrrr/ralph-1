# Progress — project-setup

| Task | Status | Notes |
|------|--------|-------|
| TASK-001: Initialize Vite + React + TypeScript project | done | Upgraded Vite 4→6 for Node 20 compat |
| TASK-002: Configure .gitignore | done | |
| TASK-003: Configure path aliases (@/ → src/) | done | |
| TASK-004: Install Chakra UI 3 | done | |
| TASK-005: Install React Router v7 | pending | |
| TASK-006: Add Google Fonts to index.html | pending | |
| TASK-007: Create Chakra UI 3 custom theme | pending | |
| TASK-008: Wire ChakraProvider and BrowserRouter in main.tsx | pending | |
| TASK-009: Create folder structure | pending | |
| TASK-010: Create Navbar component | pending | |
| TASK-011: Create Footer component | pending | |
| TASK-012: Create Layout component | pending | |
| TASK-013: Create HomePage | pending | |
| TASK-014: Create AboutPage (placeholder) | pending | |
| TASK-015: Create WorkPage (placeholder) | pending | |
| TASK-016: Create ContactPage (placeholder) | pending | |
| TASK-017: Configure React Router routes in App.tsx | pending | |
| TASK-018: Verify design tokens render correctly | pending | |
| TASK-019: Production build check | pending | |
| TASK-020: Install and configure ESLint v9 | pending | |
| TASK-021: Configure ESLint TypeScript strict integration | pending | |
| TASK-022: Install Vitest and React Testing Library | pending | |
| TASK-023: Configure Vitest in vite.config.ts | pending | |
| TASK-024: Write smoke test for App component | pending | |

---
### [TASK-004] Install Chakra UI 3 — iteration 1
- **Status:** done
- **Files changed:** package.json, package-lock.json
- **Key decisions:** Installed `@chakra-ui/react@^3.34.0` and `@emotion/react`. No peer dependency warnings.
- **Verification:** `package.json` confirms `^3.34.0`; `node -e "require('@chakra-ui/react')"` exits cleanly.
- **Notes:** none
---
### [TASK-003] Configure path aliases (@/ → src/) — iteration 3
- **Status:** done
- **Files changed:** vite.config.ts, tsconfig.app.json
- **Key decisions:** Added `resolve.alias` in vite.config.ts and `baseUrl`/`paths` in tsconfig.app.json (not tsconfig.json root, since app sources are in tsconfig.app.json). `@types/node` was already installed.
- **Verification:** `npx tsc --noEmit` → zero errors; temp `import {} from '@/App'` in main.tsx resolved without error; reverted successfully.
- **Notes:** none
---
### [TASK-002] Configure .gitignore — iteration 2
- **Status:** done
- **Files changed:** .gitignore
- **Key decisions:** Added `.env*`, updated `node_modules` → `node_modules/` and `dist` → `dist/` with trailing slashes per spec.
- **Verification:** Read .gitignore — all 5 entries present; `git status` — node_modules/ not listed as untracked.
- **Notes:** none
---
### [TASK-001] Initialize Vite + React + TypeScript project — iteration 1
- **Status:** done
- **Files changed:** package.json (vite upgraded 4→6.4.1, @vitejs/plugin-react upgraded), package-lock.json
- **Key decisions:** Project was already scaffolded; boilerplate already cleaned. Vite 4.x had CJS/ESM incompatibility with Node.js v20 (`Named export 'build' not found`). Upgraded to Vite 6.4.1. Newer esbuild (0.25) install script also fails postinstall on Alpine Linux (SIGSEGV), so used `--ignore-scripts` to bypass; native binary works fine at runtime.
- **Verification:** `npx tsc --noEmit` → zero errors; `npm run dev` → server starts at localhost:5174; all required files exist (vite.config.ts, tsconfig.json, src/main.tsx, src/App.tsx)
- **Notes:** App.css and index.css are already empty; App.tsx already has no boilerplate. Port 5173 may be in use in some runs; server falls back to 5174.
---
