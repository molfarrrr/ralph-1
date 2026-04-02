# PRD: Personal Website — Vite + React + TypeScript + Chakra UI 3 + React Router

## Progress Tracking Instructions

After completing each task:
1. Open `PRDs/project-setup/progress.md`
2. Change the task status from `pending` to `done`
3. Add a brief note in the Notes column if anything was non-obvious or deviated from the spec

Status values:
- `pending` — not started
- `in progress` — currently being worked on
- `done` — acceptance criterion met and all verification steps passed
- `blocked` — cannot proceed, reason in Notes

Do not move to the next task until every verification step passes and progress.md is updated.

## Stack
- Vite (build tool)
- React 19 (web)
- TypeScript (strict)
- Chakra UI 3 (styling & components)
- React Router v7 (routing)

## Design System Reference

### Colors
| Token       | Value   | Usage                                       |
|------------|---------|---------------------------------------------|
| brand.50    | #f2e9e9 | Primary blush surface, page wrapper         |
| brand.100   | #e6ddd9 | Secondary soft surface, supporting sections |
| brand.700   | #2d1640 | Deep brand accent, optional emphasis        |
| neutral.0   | #f4f2ee | Base canvas                                 |
| neutral.500 | #737373 | Muted text, inactive states                 |
| neutral.900 | #1f1f1f | Primary text, borders, icons                |

### Typography
| Role    | Family      | Weights                |
|--------|-------------|------------------------|
| body    | Manrope     | 300, 400, 500, 600    |
| heading | Manrope     | 200, 300, 400, 500    |
| mono    | ui-monospace| 400, 500              |

### Transitions
- Standard links/icons: `0.25s ease`
- Quick opacity changes: `0.2s ease`
- Expressive CTA width motion: `0.5s cubic-bezier(.23, 1, .32, 1)`

### Breakpoints
| Name | Value  |
|------|--------|
| sm   | 480px  |
| md   | 768px  |
| lg   | 992px  |
| xl   | 1280px |

### Structure Notes
- Home page should follow the reference personal landing structure: fixed transparent navbar, editorial hero, circular portrait, and a minimal footer.
- Do not implement the `Worked with` block or the placeholder logo row.
- Do not implement the `Links +` control, Instagram/Facebook/Twitter links, or Privacy Policy / Style Guide / Licensing links.
- Footer/social area should expose icon links for LinkedIn and GitHub only.

---

## Tasks

### TASK-001: Initialize Vite + React + TypeScript project
- Run `npm create vite@latest . -- --template react-ts`
- Delete boilerplate content from `src/App.css`, `src/index.css`, `src/App.tsx`
- **Verification:**
  - Run `npm run dev` — confirm exit code 0 and server URL printed
  - Run `npx tsc --noEmit` — must produce zero errors
  - Confirm files exist: `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx`

### TASK-002: Configure .gitignore
- Entries: `node_modules/`, `dist/`, `.env*`, `.DS_Store`, `*.local`
- **Verification:**
  - Read `.gitignore` and confirm all 5 entries are present
  - Run `git status` — confirm `node_modules/` does not appear as untracked

### TASK-003: Configure path aliases (@/ → src/)
- `vite.config.ts`: add `resolve.alias: { '@': path.resolve(__dirname, 'src') }`
- `tsconfig.json`: add `"baseUrl": "."` and `"paths": { "@/*": ["src/*"] }`
- Install `@types/node` if needed for `path` import
- **Verification:**
  - Run `npx tsc --noEmit` — zero errors
  - Add a temporary `import {} from '@/App'` to `main.tsx`, run `npx tsc --noEmit`, confirm no "Cannot find module" error, then revert

### TASK-004: Install Chakra UI 3
- Run `npm install @chakra-ui/react@^3 @emotion/react`
- **Verification:**
  - Read `package.json` — confirm `@chakra-ui/react` version starts with `^3` or `3.x`
  - Run `npm install` — confirm zero peer dependency warnings in output
  - Run `node -e "require('@chakra-ui/react')"` — must not throw

### TASK-005: Install React Router v7
- Run `npm install react-router-dom`
- **Verification:**
  - Read `package.json` — confirm `react-router-dom` version starts with `^7` or `7.x`
  - Run `node -e "require('react-router-dom')"` — must not throw

### TASK-006: Add Google Fonts to index.html
- Add `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com`
- Load Manrope weights 200,300,400,500,600
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Read `index.html` — confirm preconnect links present for both domains
  - Read `index.html` — confirm stylesheet `<link>` references `Manrope` with the correct weights
  - Start dev server, use Playwright to navigate to `http://localhost:5173`, intercept network requests, confirm requests to `fonts.googleapis.com` and `fonts.gstatic.com` are made
  - Use Playwright `evaluate` to run `document.fonts.check('16px Manrope')` — must return `true`

### TASK-007: Create Chakra UI 3 custom theme
- File: `src/theme/index.ts`
- Use `createSystem` + `defaultConfig` from `@chakra-ui/react`
- Define color tokens: brand (50, 100, 700) and neutral (0, 500, 900)
- Define fonts: body → `'Manrope, sans-serif'`, heading → `'Manrope, sans-serif'`, mono → `'ui-monospace, SFMono-Regular, Menlo, monospace'`
- Add motion tokens for `fast`, `standard`, and `expressive` using the transition values from the design reference
- Global styles: `body { background: neutral.0; color: neutral.900 }`
- **Verification:**
  - Run `npx tsc --noEmit` — zero errors
  - Read `src/theme/index.ts` — confirm `brand.50` value is `#f2e9e9`, `brand.100` is `#e6ddd9`, and `neutral.900` is `#1f1f1f`
  - Read `src/theme/index.ts` — confirm `fonts.body` contains `Manrope`

### TASK-008: Wire ChakraProvider and BrowserRouter in main.tsx
- Import `ChakraProvider` from `@chakra-ui/react`, `system` from `@/theme`
- Import `BrowserRouter` from `react-router-dom`
- Wrap: `<BrowserRouter><ChakraProvider value={system}><App /></ChakraProvider></BrowserRouter>`
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Run `npx tsc --noEmit` — zero errors
  - Start dev server, use Playwright to navigate to `http://localhost:5173`
  - Use Playwright `browser_console_messages` — confirm zero errors in console
  - Use Playwright `browser_snapshot` — confirm page renders (DOM is not empty)

### TASK-009: Create folder structure
- Create directories with `.gitkeep`: `src/components/layout/`, `src/components/ui/`, `src/pages/`, `src/theme/`, `src/hooks/`, `src/utils/`
- **Verification:**
  - Confirm each directory exists via `ls src/components/layout src/components/ui src/pages src/hooks src/utils`
  - Run `git status` — confirm `.gitkeep` files appear as untracked (directories are tracked)

### TASK-010: Create Navbar component
- File: `src/components/layout/Navbar.tsx`
- Chakra `Box` as `nav`, full width, `bg: transparent`, fixed top, z-index 100
- Inner container max width `85vw` on desktop and `95vw` on tablet/mobile
- Left: site name / wordmark in Manrope 600, `color: neutral.900`, links to `/`
- Right: nav links (Home `/`, About `/about`, Work `/work`, Contact `/contact`) with hover `color: neutral.500`, underline/bottom-line treatment, `transition: standard`
- Mobile: links hidden, hamburger shown; Chakra `Drawer` opens with stacked links
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Run `npx tsc --noEmit` — zero errors
  - Start dev server, use Playwright at `http://localhost:5173`
  - Desktop (1440px): snapshot confirms 4 nav links visible
  - Use Playwright `evaluate` to check computed color of a nav link: `rgb(31, 31, 31)` (neutral.900)
  - Mobile (375px): use `browser_resize` to 375×812, snapshot confirms links hidden and hamburger icon visible
  - Click hamburger — snapshot confirms Drawer opens with all 4 links
  - Click a Drawer link — confirm navigation occurs (URL changes)

### TASK-011: Create Footer component
- File: `src/components/layout/Footer.tsx`
- Minimal footer with copyright text on the left and icon links on the right
- Social links: LinkedIn and GitHub only
- Do not render `Links +`, Instagram, Facebook, Twitter, Privacy Policy, Style Guide, or Licensing
- `bg: transparent`, Manrope 400, `color: neutral.500`
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Run `npx tsc --noEmit` — zero errors
  - Use Playwright at `http://localhost:5173`, scroll to bottom
  - Snapshot confirms footer is visible with copyright text
  - Snapshot confirms LinkedIn and GitHub icons/links are visible
  - Snapshot confirms Instagram, Facebook, Privacy Policy, Style Guide, and Licensing are absent
  - Resize to 375px — snapshot confirms footer still renders without overflow

### TASK-012: Create Layout component
- File: `src/components/layout/Layout.tsx`
- Renders: `<Navbar />` + `<Box as="main">` + `<Footer />`
- Outer wrapper should use the soft blush surface from the reference layout (`bg: brand.50`)
- Main: `flex: 1`, centered, width `100%`, `maxW: 85vw`, `px: { base: 4, md: 6, lg: 0 }`
- Props: `{ children: React.ReactNode }`
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Run `npx tsc --noEmit` — zero errors
  - Use Playwright at `http://localhost:5173`
  - Snapshot confirms `nav`, `main`, and `footer` elements all present in DOM
  - Use Playwright `evaluate`: `document.querySelector('main').style.flex || getComputedStyle(document.querySelector('main')).flex` — confirms main grows to fill space
  - Use Playwright `evaluate`: `document.querySelector('main').getBoundingClientRect().width / window.innerWidth` at 1440px — must be approximately `0.85`

### TASK-013: Create HomePage
- File: `src/pages/HomePage.tsx`
- Hero structure should follow the reference layout:
- Eyebrow label above the hero copy
- Two-line editorial H1 in Manrope 200 / 300 with `color: neutral.900`
- Supporting paragraph in Manrope 400 with `color: neutral.900`
- CTA should be a minimal text/arrow treatment, not a filled brand button
- Move the provided image into the app source tree at `src/assets/profile/prof-pic.png`
- Import the image into `src/pages/HomePage.tsx` and use the imported asset for the hero portrait
- Profile image must remain circular
- Do not add a `Worked with` section or placeholder brand logos beneath the hero
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Run `npx tsc --noEmit` — zero errors
  - Use Playwright at `http://localhost:5173`
  - Snapshot confirms eyebrow, H1, paragraph, CTA, and portrait image are visible
  - Read `src/pages/HomePage.tsx` — confirm the image is imported from `@/assets/profile/prof-pic.png` or a relative `src/assets/profile/prof-pic.png` path
  - Confirm file exists: `src/assets/profile/prof-pic.png`
  - Use Playwright `evaluate`: check `h1` computed `font-family` contains `Manrope`
  - Use Playwright `evaluate`: check `h1` computed `font-weight` is `200` or `300`
  - Use Playwright `evaluate`: check profile image computed `border-radius` = `50%`
  - Snapshot confirms no `Worked with` label or placeholder logos are rendered

### TASK-014: Create AboutPage (placeholder)
- File: `src/pages/AboutPage.tsx` — Heading "About" + paragraph text
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Run `npx tsc --noEmit` — zero errors
  - Use Playwright: navigate to `http://localhost:5173/about`
  - Snapshot confirms heading "About" is visible in DOM

### TASK-015: Create WorkPage (placeholder)
- File: `src/pages/WorkPage.tsx` — Heading "Work" + paragraph text
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Run `npx tsc --noEmit` — zero errors
  - Use Playwright: navigate to `http://localhost:5173/work`
  - Snapshot confirms heading "Work" is visible in DOM

### TASK-016: Create ContactPage (placeholder)
- File: `src/pages/ContactPage.tsx` — Heading "Contact" + paragraph text
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Run `npx tsc --noEmit` — zero errors
  - Use Playwright: navigate to `http://localhost:5173/contact`
  - Snapshot confirms heading "Contact" is visible in DOM

### TASK-017: Configure React Router routes in App.tsx
- Use `<Routes>` and `<Route>`, every page wrapped in `<Layout>`
- Routes: `/` → HomePage, `/about` → AboutPage, `/work` → WorkPage, `/contact` → ContactPage, `*` → redirect `/`
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Run `npx tsc --noEmit` — zero errors
  - Use Playwright: navigate to each of `/`, `/about`, `/work`, `/contact` — confirm correct heading visible on each
  - Use Playwright: navigate to `/nonexistent` — confirm redirect to `/` and HomePage heading visible
  - Use Playwright `browser_console_messages` across all routes — zero errors

### TASK-018: Verify design tokens render correctly
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - Use Playwright at `http://localhost:5173`
  - `evaluate`: `getComputedStyle(document.body).fontFamily` — must contain `Manrope`
  - `evaluate`: `getComputedStyle(document.body).backgroundColor` — must be `rgb(244, 242, 238)`
  - `evaluate`: `getComputedStyle(document.body).color` — must be `rgb(31, 31, 31)` (#1f1f1f)
  - `evaluate`: background color of the main page wrapper / layout root — must be `rgb(242, 233, 233)` (#f2e9e9)
  - `evaluate`: computed color of muted footer/nav secondary text — must be `rgb(115, 115, 115)` (#737373)
  - Resize to 375px — snapshot confirms no horizontal overflow (`document.body.scrollWidth === window.innerWidth`)
  - Resize to 1440px — snapshot confirms layout is centered and the main content width tracks the `85vw` container

### TASK-019: Production build check
- Run `npm run build` — must exit with code 0
- Run `npm run preview` (background) — navigate with Playwright
- **Verification:**
  - Ensure Playwright Chromium is available: `node -e "require('playwright').chromium.executablePath()"` — if it throws, run `npx playwright install chromium --with-deps` first
  - `npm run build` output contains no errors, `dist/` directory created
  - `ls dist/` — confirm `index.html` and `assets/` present
  - Start preview server, use Playwright to visit each route: `/`, `/about`, `/work`, `/contact`
  - Confirm each route returns correct page heading (same checks as TASK-017)
  - `browser_console_messages` on preview — zero errors

### TASK-020: Install and configure ESLint v9
- Install: `npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y`
- Create `eslint.config.js` (v9 flat config) with TypeScript parser, React 19 settings, hooks rules, a11y rules
- Rules: `no-console: warn`, `no-unused-vars: error`, `react-hooks/exhaustive-deps: warn`
- Add scripts: `"lint": "eslint src"`, `"lint:fix": "eslint src --fix"`
- **Verification:**
  - Run `npm run lint` — exit code 0, zero errors printed
  - Create a temp file `src/test-lint.ts` with `const x = 1` (unused var), run `npm run lint` — confirm `no-unused-vars` error appears, then delete the file
  - Run `npm run lint` again — confirm clean output after temp file removed

### TASK-021: Configure ESLint TypeScript strict integration
- Extend with `typescript-eslint` recommended-type-checked rules
- Set `parserOptions.project: true`, `parserOptions.tsconfigRootDir: import.meta.dirname`
- Rules: `@typescript-eslint/no-explicit-any: error`, `@typescript-eslint/explicit-function-return-type: warn`
- **Verification:**
  - Run `npm run lint` — zero errors on the existing source
  - Create temp file `src/test-any.ts` with `const x: any = 1`, run `npm run lint` — confirm `no-explicit-any` error, then delete
  - Run `npm run lint` — clean after temp file removed

### TASK-022: Install Vitest and React Testing Library
- Install: `npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`
- **Verification:**
  - Read `package.json` devDependencies — confirm all 6 packages present
  - Run `node -e "require('vitest')"` — must not throw
  - Run `node -e "require('@testing-library/react')"` — must not throw

### TASK-023: Configure Vitest in vite.config.ts
- Add `test` block: `globals: true`, `environment: 'jsdom'`, `setupFiles: ['./src/test/setup.ts']`, `coverage: { provider: 'v8' }`
- Create `src/test/setup.ts` with `import '@testing-library/jest-dom'`
- Add scripts: `"test": "vitest run"`, `"test:watch": "vitest"`, `"test:coverage": "vitest run --coverage"`
- **Verification:**
  - Run `npx tsc --noEmit` — zero errors (Vitest types must resolve)
  - Read `vite.config.ts` — confirm `test.globals`, `test.environment`, `test.setupFiles` present
  - Read `src/test/setup.ts` — confirm `@testing-library/jest-dom` import present
  - Run `npm run test` — Vitest starts and reports "no test files found" (exit 0 or pass)

### TASK-024: Write smoke test for App component
- File: `src/App.test.tsx`
- Render `<App />` in `MemoryRouter` + `ChakraProvider value={system}`
- Assert: component renders without crashing
- Assert: home route `<h1>` heading is present in the DOM
- **Verification:**
  - Run `npm run test` — exit code 0, 1 test suite, all tests green
  - Run `npm run test:coverage` — coverage report generated in `coverage/` directory
  - Read test output — confirm test name and assertion description are meaningful (not "it works")
