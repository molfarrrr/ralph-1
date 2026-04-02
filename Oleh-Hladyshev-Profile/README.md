# ralph-1

Personal website frontend built with Vite, React 19, TypeScript, Chakra UI 3, and React Router.

## Requirements

- Node.js 20+
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Quality Checks

Run linting:

```bash
npm run lint
```

Auto-fix lint issues where possible:

```bash
npm run lint:fix
```

Run the test suite:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate a coverage report:

```bash
npm run test:coverage
```

Run the browser verification script against the local dev server:

```bash
node scripts/verify-project-setup.mjs
```

Run it against a custom URL, for example a preview server:

```bash
node scripts/verify-project-setup.mjs http://127.0.0.1:4173
```

## Testing Notes

- The app smoke test is in `src/App.test.tsx`
- Vitest setup is in `src/test/setup.ts`
- Coverage artifacts are written to `coverage/`
- `coverage/` is generated output and should not be committed
- For browser-level PRD verification, start `npm run dev` or `npm run preview` first, then run `node scripts/verify-project-setup.mjs`

## Project Notes

- Use `@/` imports for internal source paths
- Theme tokens live in `src/theme/index.ts`
- App routes are defined in `src/App.tsx`
