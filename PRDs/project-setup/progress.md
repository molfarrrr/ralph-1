# Progress — project-setup

| Task | Status | Notes |
|------|--------|-------|
| TASK-001: Initialize Vite + React + TypeScript project | done | Upgraded Vite 4→6 for Node 20 compat |
| TASK-002: Configure .gitignore | done | |
| TASK-003: Configure path aliases (@/ → src/) | done | |
| TASK-004: Install Chakra UI 3 | done | |
| TASK-005: Install React Router v7 | done | |
| TASK-006: Add Google Fonts to index.html | done | |
| TASK-007: Create Chakra UI 3 custom theme | done | |
| TASK-008: Wire ChakraProvider and BrowserRouter in main.tsx | done | |
| TASK-009: Create folder structure | done | |
| TASK-010: Create Navbar component | done | |
| TASK-011: Create Footer component | done | |
| TASK-012: Create Layout component | done | |
| TASK-013: Create HomePage | done | |
| TASK-014: Create AboutPage (placeholder) | done | |
| TASK-015: Create WorkPage (placeholder) | done | |
| TASK-016: Create ContactPage (placeholder) | done | |
| TASK-017: Configure React Router routes in App.tsx | done | |
| TASK-018: Verify design tokens render correctly | done | |
| TASK-019: Production build check | done | |
| TASK-020: Install and configure ESLint v9 | done | |
| TASK-021: Configure ESLint TypeScript strict integration | done | |
| TASK-022: Install Vitest and React Testing Library | pending | |
| TASK-023: Configure Vitest in vite.config.ts | pending | |
| TASK-024: Write smoke test for App component | pending | |

---
### [TASK-005] Install React Router v7 — iteration 1
- **Status:** done
- **Files changed:** package.json, package-lock.json
- **Key decisions:** Installed `react-router-dom@^7.13.2` via npm install.
- **Verification:** `package.json` confirms `^7.13.2`; `node -e "require('react-router-dom')"` exits cleanly.
- **Notes:** none
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
---
### [TASK-006] Add Google Fonts to index.html — iteration 1
- **Status:** done
- **Files changed:** index.html
- **Key decisions:** Added preconnect for fonts.googleapis.com and fonts.gstatic.com (with crossorigin), plus stylesheet link for Manrope weights 200;300;400;500;600.
- **Verification:** Playwright confirmed preconnect links in DOM, request to fonts.googleapis.com made, `document.fonts.check('16px Manrope')` returned true.
- **Notes:** fonts.googleapis.com is accessible (not blocked by firewall).
---
---
### [TASK-007] Create Chakra UI 3 custom theme — iteration 4
- **Status:** done
- **Files changed:** src/theme/index.ts
- **Key decisions:** Used `createSystem` + `defaultConfig` + `defineConfig`. Defined brand (50, 100, 700) and neutral (0, 500, 900) color tokens, Manrope fonts for body/heading, ui-monospace for mono, and motion tokens (fast/standard/expressive durations and easings). Global body styles set bg to neutral.0 and color to neutral.900.
- **Verification:** `npx tsc --noEmit` → zero errors; brand.50=#f2e9e9, brand.100=#e6ddd9, neutral.900=#1f1f1f confirmed; fonts.body contains Manrope confirmed.
- **Notes:** none
---
---
### [TASK-008] Wire ChakraProvider and BrowserRouter in main.tsx — iteration 1
- **Status:** done
- **Files changed:** src/main.tsx
- **Key decisions:** Wrapped App with BrowserRouter > ChakraProvider value={system} per spec.
- **Verification:** `npx tsc --noEmit` → zero errors; Playwright confirmed page renders with no JS runtime errors.
- **Notes:** Headless Playwright shows SSL cert error for Google Fonts (network env issue), no JS errors.
---
---
### [TASK-009] Create folder structure — iteration 6
- **Status:** done
- **Files changed:** src/components/layout/.gitkeep, src/components/ui/.gitkeep, src/pages/.gitkeep, src/hooks/.gitkeep, src/utils/.gitkeep
- **Key decisions:** Created all required directories with .gitkeep files. src/theme/ already existed from TASK-007.
- **Verification:** `ls` confirmed all directories exist; `git status` confirmed .gitkeep files appear as untracked.
- **Notes:** none
---
### [TASK-010] Create Navbar component — iteration 7
- **Status:** done
- **Files changed:** src/components/layout/Navbar.tsx, src/App.tsx (temporary render for verification)
- **Key decisions:** Fixed transparent navbar with `85vw`/`95vw` inner container. Hamburger is a `div[aria-label]` using stacked Box elements. Drawer uses Chakra UI v3 `DrawerRoot`/`DrawerContent`/`DrawerBody`/`DrawerCloseTrigger` with `open`/`onOpenChange` pattern. Active link shown with bottom border; hover transitions use `0.25s ease`.
- **Verification:** `npx tsc --noEmit` → zero errors; Playwright: 4 links visible at 1440px, nav link color = `rgb(31, 31, 31)`, hamburger visible at 375px, Drawer opens with 4 links, clicking About navigates to /about.
- **Notes:** App.tsx updated to render Navbar for test visibility; will be replaced in TASK-017.
---
### [TASK-011] Create Footer component — iteration 8
- **Status:** done
- **Files changed:** src/components/layout/Footer.tsx, src/App.tsx (temporary Footer render for verification)
- **Key decisions:** Used inline SVGs for LinkedIn and GitHub icons (no icon library installed). Footer uses `bg: transparent`, Manrope 400, `color: neutral.500`. Layout mirrors Navbar's `maxW: { base: '95vw', lg: '85vw' }` pattern. Copyright year is computed dynamically.
- **Verification:** `npx tsc --noEmit` → zero errors; Playwright: footer visible with copyright text, LinkedIn + GitHub aria-labels present, no forbidden text (Instagram/Facebook/Twitter/Privacy Policy/Style Guide/Licensing), no horizontal overflow at 375px.
- **Notes:** App.tsx updated to render Footer for test visibility; will be replaced in TASK-012.
---
---
### [TASK-012] Create Layout component — iteration 9
- **Status:** done
- **Files changed:** src/components/layout/Layout.tsx, src/App.tsx
- **Key decisions:** Outer wrapper uses `bg: brand.50` per spec; `main` uses `flex={1}`, `maxW="85vw"`, `px={{ base: 4, md: 6, lg: 0 }}`. App.tsx updated to render Layout wrapping a placeholder div.
- **Verification:** `npx tsc --noEmit` → zero errors; Playwright: nav/main/footer all in DOM, `getComputedStyle(main).flex = "1 1 0%"`, width ratio at 1440px = 0.85.
- **Notes:** none
---
### [TASK-001] Initialize Vite + React + TypeScript project — iteration 1
- **Status:** done
- **Files changed:** package.json (vite upgraded 4→6.4.1, @vitejs/plugin-react upgraded), package-lock.json
- **Key decisions:** Project was already scaffolded; boilerplate already cleaned. Vite 4.x had CJS/ESM incompatibility with Node.js v20 (`Named export 'build' not found`). Upgraded to Vite 6.4.1. Newer esbuild (0.25) install script also fails postinstall on Alpine Linux (SIGSEGV), so used `--ignore-scripts` to bypass; native binary works fine at runtime.
- **Verification:** `npx tsc --noEmit` → zero errors; `npm run dev` → server starts at localhost:5174; all required files exist (vite.config.ts, tsconfig.json, src/main.tsx, src/App.tsx)
- **Notes:** App.css and index.css are already empty; App.tsx already has no boilerplate. Port 5173 may be in use in some runs; server falls back to 5174.
---
---
### [TASK-014] Create AboutPage (placeholder) — iteration 11
- **Status:** done
- **Files changed:** src/pages/AboutPage.tsx
- **Key decisions:** Placeholder page with H1 "About" and a coming-soon paragraph. Follows component conventions (named export, explicit return type, theme tokens).
- **Verification:** `npx tsc --noEmit` → zero errors; Playwright at /about confirmed H1 "About" visible (temporarily added route to App.tsx for verification, reverted after).
- **Notes:** Routing will be properly wired in TASK-017.
---
### [TASK-015] Create WorkPage (placeholder) — iteration 12
- **Status:** done
- **Files changed:** src/pages/WorkPage.tsx
- **Key decisions:** Same pattern as AboutPage. Temporarily added /work route to App.tsx for Playwright verification, then reverted.
- **Verification:** `npx tsc --noEmit` → zero errors; Playwright at /work confirmed H1 "Work" visible.
- **Notes:** Routing will be properly wired in TASK-017.
---
### [TASK-013] Create HomePage — iteration 10
- **Status:** done
- **Files changed:** src/pages/HomePage.tsx, src/assets/profile/prof-pic.png, src/App.tsx (temporary render for verification)
- **Key decisions:** Copied `public/prof pic.png` → `src/assets/profile/prof-pic.png` and imported it as a module. Hero uses eyebrow label, two-line H1 at fontWeight 200/300, paragraph, and a minimal text+arrow CTA (no filled button). Portrait uses `borderRadius="full"` (9999px). No Worked With section.
- **Verification:** `npx tsc --noEmit` → zero errors; Playwright: eyebrow/H1/paragraph/CTA/portrait all visible, H1 fontFamily contains Manrope, fontWeight=200, borderRadius=9999px, no 'Worked with' text.
- **Notes:** App.tsx updated to render HomePage for verification; will be replaced fully in TASK-017.
---
---
---
### [TASK-017] Configure React Router routes in App.tsx — iteration 14
- **Status:** done
- **Files changed:** src/App.tsx, src/main.tsx
- **Key decisions:** Changed App to named export (was default). Added Routes with all 4 pages wrapped in Layout, plus `*` catch-all redirecting to `/`. Updated main.tsx import from default to named.
- **Verification:** `npx tsc --noEmit` → zero errors; source inspection confirmed `/`, `/about`, `/work`, `/contact` render correct headings; `/nonexistent` redirects to `/`.
- **Notes:** none
---
### [TASK-016] Create ContactPage (placeholder) — iteration 13
- **Status:** done
- **Files changed:** src/pages/ContactPage.tsx
- **Key decisions:** Same pattern as AboutPage/WorkPage. Temporarily added /contact route to App.tsx for Playwright verification, then reverted.
- **Verification:** `npx tsc --noEmit` → zero errors; Playwright at /contact confirmed H1 "Contact" visible.
- **Notes:** Routing will be properly wired in TASK-017.
---
---
### [TASK-018] Verify design tokens render correctly — iteration 15
- **Status:** done
- **Files changed:** PRDs/project-setup/progress.md only
- **Key decisions:** Verification-only task — no source changes needed.
- **Verification:** Playwright at localhost:5174 confirmed: fontFamily=Manrope, bgColor=rgb(244,242,233), textColor=rgb(31,31,31), wrapperBg=rgb(242,233,233), mutedColor=rgb(115,115,115), mainWidthRatio=0.85, noOverflow at 375px=true. All checks passed.
- **Notes:** none
---
---
---
### [TASK-020] Install and configure ESLint v9 — iteration 17
- **Status:** done
- **Files changed:** eslint.config.js, package.json, package-lock.json
- **Key decisions:** `eslint-plugin-react` and `eslint-plugin-jsx-a11y` were missing from devDependencies; installed them. Updated eslint.config.js to v9 flat config with TypeScript parser, React 19 settings, jsx-a11y rules, and the three required rules (no-console: warn, no-unused-vars: error, react-hooks/exhaustive-deps: warn). Updated lint script from `eslint .` to `eslint src` and added `lint:fix`. Several node_modules files were corrupted during install (globals.json, axe.js, react-hooks dev bundle); fixed by installing cleanly in a temp dir and copying the clean files over.
- **Verification:** `npm run lint` → exit 0, zero errors. Temp file with `const x = 1` → no-unused-vars error confirmed. Clean after removal → exit 0.
- **Notes:** File corruption in node_modules is a recurring env issue (Alpine Linux + native binary postinstall failures). Mitigation: `--ignore-scripts` for install + copy clean files from temp dir.
---
---
### [TASK-021] Configure ESLint TypeScript strict integration — iteration 18
- **Status:** done
- **Files changed:** eslint.config.js
- **Key decisions:** Replaced `tseslint.configs.recommended` with `recommendedTypeChecked`. Used explicit `project: ['./tsconfig.app.json', './tsconfig.node.json']` instead of `project: true` because root tsconfig.json uses project references with `"files": []` — `true` can't locate src files. Added `@typescript-eslint/no-explicit-any: error` and `@typescript-eslint/explicit-function-return-type: warn`.
- **Verification:** `npm run lint` → exit 0, zero errors. Temp file with `const x: any = 1` → `no-explicit-any` error confirmed. Clean after removal → exit 0.
- **Notes:** none
---
### [TASK-019] Production build check — iteration 16
- **Status:** done
- **Files changed:** src/components/layout/Footer.tsx, src/pages/HomePage.tsx, PRDs/project-setup/progress.md
- **Key decisions:** `Box as="a"` and `Box as="svg"` don't merge native HTML attrs in Chakra UI v3 strict TypeScript mode. Replaced with `chakra.a` and `chakra.svg`. Similarly, `Box as={Link}` doesn't pick up react-router's `to` prop — replaced with `chakra(Link)` pattern. `npm run build` passed after these fixes.
- **Verification:** `npm run build` → exit 0, dist/index.html and dist/assets/ present. Preview server at :4173 — Playwright confirmed /, /about, /work, /contact all render correct headings; /nonexistent redirects to /. Only console "error" is SSL cert for Google Fonts (headless browser network issue, not a JS error).
- **Notes:** Chunk size warning for large bundle (profile image + deps) — not an error, just informational.
---
