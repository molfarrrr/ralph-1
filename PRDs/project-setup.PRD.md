# PRD: Personal Website — Vite + React + TypeScript + Chakra UI 3 + React Router

## Stack
- Vite (build tool)
- React 19 (web)
- TypeScript (strict)
- Chakra UI 3 (styling & components)
- React Router v7 (routing)

## Design System Reference (Eonia Template)

### Colors
| Token       | Value   | Usage                    |
|------------|---------|--------------------------|
| brand.500   | #4353FF | Primary accent, CTAs     |
| brand.600   | #2e3bcc | Hover states             |
| neutral.900 | #2a2a2a | Primary text, headings   |
| neutral.500 | #6b6b6b | Secondary text           |
| neutral.100 | #f5f5f5 | Subtle backgrounds       |
| white       | #ffffff | Page background          |

### Typography
| Role    | Family      | Weights       |
|--------|-------------|---------------|
| body    | Inter       | 300, 400, 500 |
| heading | Inter       | 600, 700      |
| mono    | Roboto Mono | 400, 500      |

### Transitions
All interactive elements: `0.3s ease-out`

### Breakpoints
| Name | Value  |
|------|--------|
| sm   | 480px  |
| md   | 768px  |
| lg   | 992px  |
| xl   | 1320px |

---

## Tasks

### TASK-001: Initialize Vite + React + TypeScript project
- Run `npm create vite@latest . -- --template react-ts`
- Delete boilerplate content from `src/App.css`, `src/index.css`, `src/App.tsx`
- Acceptance: `npm run dev` starts with blank page, no errors

### TASK-002: Configure .gitignore
- Entries: `node_modules/`, `dist/`, `.env*`, `.DS_Store`, `*.local`
- Acceptance: file exists with correct entries

### TASK-003: Configure path aliases (@/ → src/)
- `vite.config.ts`: add `resolve.alias: { '@': path.resolve(__dirname, 'src') }`
- `tsconfig.json`: add `"baseUrl": "."` and `"paths": { "@/*": ["src/*"] }`
- Install `@types/node` if needed for path import
- Acceptance: `@/` imports resolve without TypeScript errors

### TASK-004: Install Chakra UI 3
- Run `npm install @chakra-ui/react@^3 @emotion/react`
- Acceptance: packages in `package.json`, no peer dependency warnings

### TASK-005: Install React Router v7
- Run `npm install react-router-dom`
- Acceptance: package in `package.json`

### TASK-006: Add Google Fonts to index.html
- Add `<link rel="preconnect">` for Google Fonts
- Load Inter weights 300,400,500,600,700 and Roboto Mono weights 400,500
- Acceptance: fonts visible in browser Network tab on load

### TASK-007: Create Chakra UI 3 custom theme
- File: `src/theme/index.ts`
- Use `createSystem` + `defaultConfig` from `@chakra-ui/react`
- Define color tokens: brand (500, 600) and neutral (100, 500, 900)
- Define fonts: body → `'Inter, sans-serif'`, heading → `'Inter, sans-serif'`, mono → `'Roboto Mono, monospace'`
- Global styles: `body { background: white; color: neutral.900 }`
- Acceptance: theme exports a valid `system` object, no TS errors

### TASK-008: Wire ChakraProvider and BrowserRouter in main.tsx
- Import `ChakraProvider` from `@chakra-ui/react`, `system` from `@/theme`
- Import `BrowserRouter` from `react-router-dom`
- Wrap: `<BrowserRouter><ChakraProvider value={system}><App /></ChakraProvider></BrowserRouter>`
- Acceptance: app renders, no console errors

### TASK-009: Create folder structure
- Create with placeholder files:
  - `src/components/layout/`
  - `src/components/ui/`
  - `src/pages/`
  - `src/theme/`
  - `src/hooks/`
  - `src/utils/`
- Acceptance: directories present in repo

### TASK-010: Create Navbar component
- File: `src/components/layout/Navbar.tsx`
- Chakra `Box` container: full width, `bg: white`, bottom border `1px solid` `neutral.100`
- Left: site name in Inter 600, `color: neutral.900`, links to `/`
- Right: nav links (Home `/`, About `/about`, Work `/work`, Contact `/contact`)
  - Inter 400, `color: neutral.900`, hover `color: brand.500`, transition `0.3s ease-out`
- Mobile: hide links, show hamburger; open Chakra `Drawer` with stacked links
- Acceptance: renders correctly on desktop and mobile, links are correct paths

### TASK-011: Create Footer component
- File: `src/components/layout/Footer.tsx`
- Single row: copyright left, placeholder social links right
- `bg: white`, top border `1px solid` `neutral.100`
- Inter 400, `color: neutral.500`
- Acceptance: renders at all breakpoints

### TASK-012: Create Layout component
- File: `src/components/layout/Layout.tsx`
- Renders: `<Navbar />` + `<Box as="main">` (min-height fills viewport) + `<Footer />`
- Main container: centered, `maxW: 1320px`, `px: 20px`
- Props: `{ children: React.ReactNode }`
- Acceptance: children render correctly between nav and footer

### TASK-013: Create HomePage
- File: `src/pages/HomePage.tsx`
- Hero section:
  - H1 in Inter 700, `color: neutral.900`, e.g. "Hi, I'm [Name]"
  - Subtitle paragraph in Inter 300, `color: neutral.500`
  - CTA button: `bg: brand.500`, `color: white`, hover `bg: brand.600`, transition `0.3s ease-out`
  - Profile image: `public/prof pic.png` in Chakra `Image`, circular crop (`borderRadius: full`)
- Acceptance: hero section renders with image, text, and CTA

### TASK-014: Create AboutPage (placeholder)
- File: `src/pages/AboutPage.tsx`
- Heading "About" + one paragraph placeholder text
- Acceptance: page renders at `/about`

### TASK-015: Create WorkPage (placeholder)
- File: `src/pages/WorkPage.tsx`
- Heading "Work" + one paragraph placeholder text
- Acceptance: page renders at `/work`

### TASK-016: Create ContactPage (placeholder)
- File: `src/pages/ContactPage.tsx`
- Heading "Contact" + one paragraph placeholder text
- Acceptance: page renders at `/contact`

### TASK-017: Configure React Router routes in App.tsx
- `src/App.tsx`: use `<Routes>` and `<Route>` from `react-router-dom`
- Wrap each page in `<Layout>`
- Routes:
  - `/` → `<HomePage />`
  - `/about` → `<AboutPage />`
  - `/work` → `<WorkPage />`
  - `/contact` → `<ContactPage />`
  - `*` → redirect to `/`
- Acceptance: navigating to each path renders correct page

### TASK-018: Verify design tokens render correctly
- Manual check in browser:
  - Inter font loads for all text
  - Roboto Mono available (apply `fontFamily: mono` to one element temporarily)
  - Brand blue #4353FF shows on CTA button
  - Neutral dark #2a2a2a on headings
  - Responsive layout works at mobile (375px) and desktop (1440px)
- Acceptance: all design tokens visually correct

### TASK-019: Production build check
- Run `npm run build`
- Run `npm run preview`
- Verify all routes work in preview
- Acceptance: build succeeds, all pages load in preview
