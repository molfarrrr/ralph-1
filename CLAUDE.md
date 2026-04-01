# CLAUDE.md — ralph-1

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
- All colors must reference theme tokens: `brand.500`, `neutral.900`, etc. — no raw hex values
- All interactive elements must have `transition: 0.3s ease-out`
- Responsive props use Chakra breakpoint array syntax: `fontSize={{ base: 'md', lg: 'xl' }}`

## Design Tokens
| Token       | Value   |
|------------|---------|
| brand.500   | #4353FF |
| brand.600   | #2e3bcc |
| neutral.900 | #2a2a2a |
| neutral.500 | #6b6b6b |
| neutral.100 | #f5f5f5 |

Fonts: **Inter** (body, heading) · **Roboto Mono** (mono)

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
