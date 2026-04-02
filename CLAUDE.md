# CLAUDE.md — ralph-1

## Off Limits

Never modify, delete, or overwrite anything inside `.claude/` — this includes `settings.json`, `settings.local.json`, and all skills. These are configuration files for the AI tooling, not application code.

## Non-Negotiable

This codebase will outlive you. Every shortcut you take becomes
someone else's burden. Every hack compounds into technical debt
that slows the whole team down.

You are not just writing code. You are shaping the future of this
project. The patterns you establish will be copied. The corners
you cut will be cut again.

Fight entropy. Leave the codebase better than you found it.

## Project Overview
Personal website frontend. No backend, no auth, no API calls.

## Stack
- **Vite** — build tool
- **React 19** — UI framework (web only)
- **TypeScript** — strict mode
- **Chakra UI 3** — component library and styling (`createSystem` + `defaultConfig`)
- **React Router v7** — client-side routing (`BrowserRouter`, `Routes`, `Route`)

## Project Structure
```
src/
  assets/       # Images and app-bundled static assets
  components/
    layout/     # Navbar, Footer, Layout
    ui/         # Reusable UI primitives
  pages/        # One file per route
  theme/        # Chakra custom theme (index.ts)
  hooks/        # Custom React hooks
  utils/        # Pure utility functions
PRDs/           # Product requirement documents
public/         # Static assets
```

## Path Aliases
Use `@/` for all internal imports (maps to `src/`).
```ts
import { Navbar } from '@/components/layout/Navbar'
```

## Styling Rules
- Use **Chakra UI style props** exclusively — no inline `style={{}}`, no CSS files, no SCSS
- All colors must reference theme tokens: `brand.50`, `brand.100`, `brand.700`, `neutral.0`, `neutral.500`, `neutral.900`
- Interactive elements should use motion tokens from the theme (`fast`, `standard`, `expressive`) instead of hardcoded transition strings
- Responsive props use Chakra breakpoint array syntax: `fontSize={{ base: 'md', lg: 'xl' }}`

## Design Tokens
| Token       | Value   |
|------------|---------|
| brand.50    | #f2e9e9 |
| brand.100   | #e6ddd9 |
| brand.700   | #2d1640 |
| neutral.0   | #f4f2e9 |
| neutral.500 | #737373 |
| neutral.900 | #1f1f1f |

Fonts: **Manrope** (body, heading) · **ui-monospace** (mono)

## Local Commands
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Preview production build: `npm run preview`
- Run linting: `npm run lint`
- Auto-fix lint issues: `npm run lint:fix`
- Run tests once: `npm run test`
- Run tests in watch mode: `npm run test:watch`
- Run tests with coverage: `npm run test:coverage`
- Run browser verification against a running local app: `node scripts/verify-project-setup.mjs`
- Run browser verification against preview or another URL: `node scripts/verify-project-setup.mjs http://127.0.0.1:4173`

## Testing Notes
- App smoke test lives in `src/App.test.tsx`
- Vitest setup file is `src/test/setup.ts`
- Coverage output is generated in `coverage/` and should not be committed
- For PRD-style browser verification, start the app locally and use `scripts/verify-project-setup.mjs`

## TypeScript Rules
- Strict mode — no `any`
- Explicit return types on all functions
- Use `React.FC` only when necessary; prefer plain function declarations

## Component Conventions
- One component per file, filename matches component name
- Props interface defined above the component: `interface NavbarProps { ... }`
- No default exports — use named exports only

## Routing
Routes are defined in `src/App.tsx`. Every page is wrapped in `<Layout>`.
Add new routes there when creating new pages.

## Skills
When developing any React feature, component, page, or hook — invoke the `/react-developer` skill first. It contains project-specific patterns, Chakra UI 3 snippets, React 19 conventions, and a pre-commit checklist. Do not write React code without consulting it.

## PRDs
Task specifications live in `PRDs/`. Complete tasks in order. Each task has an acceptance criterion — verify it before marking done.
