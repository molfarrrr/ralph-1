# PRD: Chakra UI Refactoring — Recipes, Shared Components & Dev Guidance

## Goal
Eliminate repeated Chakra style props across the codebase by:
1. Creating Chakra **recipes** for recurring style patterns
2. Extracting **shared components** into `src/components/ui/`
3. Updating the **react-developer skill** with Chakra component authoring guidance

## Progress Tracking Instructions

After completing each task:
1. Open `PRDs/chakra-refactor/progress.md`
2. Change the task status from `pending` to `done`
3. Add a brief note in the Notes column

Status values: `pending` · `in progress` · `done` · `blocked`

Do not move to the next task until the acceptance criterion is verified and progress.md is updated.

## Strict Boundaries

- ONLY touch files listed in each task. Nothing else.
- NEVER modify `.claude/`, `CLAUDE.md`, `PRDs/`, or `ralph.sh`.
- NEVER change behaviour — refactoring only. Pages must render identically before and after.
- After each refactor task: run `npx tsc --noEmit` — must pass with zero errors.

---

## Repeated Patterns Found (source of truth for this PRD)

| Pattern | Occurrences | Files affected |
|---|---|---|
| Hover color + transition on links | 15+ | Navbar, Footer, AboutPage, ContactPage, HomePage |
| Responsive H1 heading style | 3 | HomePage, AboutPage, ContactPage |
| Max-width container padding | 4 | Layout, Navbar, Footer |
| Section border divider | 4 | AboutPage, ContactPage |
| Text link hover states | 10+ | All pages |
| Icon button (print/preview) | 2 | AboutPage |
| Animated hamburger icon | 2 | Navbar |
| Portal + overlay + escape-key modal | 2 | Navbar, AboutPage |

---

## Tasks

### TASK-001: Create `linkRecipe` in theme
- File: `src/theme/recipes/link.recipe.ts`
- Use Chakra `defineRecipe` to encode the repeated link hover pattern:
  ```ts
  color: 'neutral.900'
  transition: 'color {durations.standard} {easings.standard}'
  _hover: { color: 'neutral.500' }
  ```
- Variants: `default` (neutral.900 → neutral.500), `muted` (neutral.500 → neutral.900)
- Register in `src/theme/index.ts` under `recipes.link`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Read `src/theme/index.ts` — confirm recipe is registered

### TASK-002: Create `headingRecipe` in theme
- File: `src/theme/recipes/heading.recipe.ts`
- Variants:
  - `page`: `fontSize: { base: '4xl', md: '5xl', lg: '6xl' }`, `fontWeight: 300`, `lineHeight: 1.02`, `letterSpacing: -0.04em`, `color: neutral.900`
  - `section`: `fontSize: { base: '2xl', md: '3xl' }`, `fontWeight: 400`, `color: neutral.900`
  - `label`: `fontSize: sm`, `fontWeight: 500`, `letterSpacing: 0.08em`, `textTransform: uppercase`, `color: neutral.500`
- Register in `src/theme/index.ts` under `recipes.heading`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Read `src/theme/index.ts` — confirm recipe registered

### TASK-003: Create `<Container>` shared component
- File: `src/components/ui/Container.tsx`
- Named export: `Container`
- Wraps Chakra `Box` with: `maxW="1128px"`, `mx="auto"`, `px={{ base: 5, md: 8, xl: 0 }}`
- Props: `{ children: React.ReactNode; as?: React.ElementType }`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Read file — confirm props interface and named export

### TASK-004: Create `<SectionDivider>` shared component
- File: `src/components/ui/SectionDivider.tsx`
- Named export: `SectionDivider`
- Renders a `Box` with: `borderTop="1px solid"`, `borderColor="rgba(31,31,31,0.12)"`, `pt={6}`
- Props: `{ pt?: number | string }`
- **Verification:**
  - `npx tsc --noEmit` — zero errors

### TASK-005: Create `<PageHeading>` shared component
- File: `src/components/ui/PageHeading.tsx`
- Named export: `PageHeading`
- Renders Chakra `Heading` using `headingRecipe` variant `page`
- Props: `{ children: React.ReactNode; as?: 'h1' | 'h2' | 'h3' }`
- Default `as="h1"`
- **Verification:**
  - `npx tsc --noEmit` — zero errors

### TASK-006: Create `<NavLink>` shared component
- File: `src/components/ui/NavLink.tsx`
- Named export: `NavLink`
- Wraps React Router `Link` inside a Chakra `Box` using `linkRecipe`
- Props: `{ to: string; children: React.ReactNode; isActive?: boolean }`
- When `isActive`: `color: neutral.900`, `fontWeight: 500`
- When not active: use `default` recipe variant
- **Verification:**
  - `npx tsc --noEmit` — zero errors

### TASK-007: Create `<EyebrowLabel>` shared component
- File: `src/components/ui/EyebrowLabel.tsx`
- Named export: `EyebrowLabel`
- Uses `headingRecipe` variant `label`
- Props: `{ children: React.ReactNode }`
- **Verification:**
  - `npx tsc --noEmit` — zero errors

### TASK-008: Refactor Navbar to use shared components
- Replace inline max-width/padding container with `<Container>`
- Replace nav link `Box`/`Text` hover patterns with `<NavLink>`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Start dev server, confirm Navbar renders identically at 1440px and 375px
  - Confirm mobile drawer still opens and closes

### TASK-009: Refactor Footer to use shared components
- Replace inline container with `<Container>`
- Replace link hover patterns with `linkRecipe` or `<NavLink>` as appropriate
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Confirm Footer renders identically

### TASK-010: Refactor Layout to use `<Container>`
- Replace inline `maxW` / `mx="auto"` / `px` props in Layout's main area with `<Container>`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Confirm page layout unchanged at all breakpoints

### TASK-011: Refactor HomePage to use shared components
- Replace H1 inline styles with `<PageHeading>`
- Replace eyebrow text with `<EyebrowLabel>`
- Replace CTA link hover pattern with `linkRecipe`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Confirm hero renders identically

### TASK-012: Refactor AboutPage to use shared components
- Replace H1 with `<PageHeading>`
- Replace eyebrow with `<EyebrowLabel>`
- Replace section border dividers with `<SectionDivider>`
- Replace link hover patterns with `linkRecipe`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Confirm page renders identically

### TASK-013: Refactor ContactPage to use shared components
- Replace H1 with `<PageHeading>`
- Replace section border dividers with `<SectionDivider>`
- Replace link hover patterns with `linkRecipe`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Confirm page renders identically

### TASK-014: Create `src/components/ui/index.ts` barrel export
- File: `src/components/ui/index.ts`
- Re-export all shared components:
  ```ts
  export { Container } from './Container'
  export { SectionDivider } from './SectionDivider'
  export { PageHeading } from './PageHeading'
  export { NavLink } from './NavLink'
  export { EyebrowLabel } from './EyebrowLabel'
  ```
- Update all imports across the codebase to use `@/components/ui`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Grep for direct imports of individual ui files — should all use barrel

### TASK-015: Update react-developer skill with Chakra component guidance
- File: `.claude/skills/react-developer/SKILL.md`
- Add a new section `## 13. Chakra Component Authoring Rules` BEFORE the checklist section
- Content must cover:
  - **Use recipes first**: before writing inline style props, check `src/theme/recipes/` for an existing recipe
  - **Use shared components**: before creating a new heading/link/container/divider, check `src/components/ui/`
  - **Never duplicate**: if a pattern appears more than once, it belongs in a recipe or shared component
  - **Recipe usage snippet**: how to use `useRecipe` or pass recipe props to a Chakra component
  - **Adding a new recipe**: file location, `defineRecipe`, registration in `theme/index.ts`
  - **Adding a new shared component**: file in `src/components/ui/`, named export, add to barrel `index.ts`
- **Verification:**
  - Read the updated SKILL.md — confirm all 6 bullet points above are covered
  - `npx tsc --noEmit` — zero errors (skill file is markdown, just confirm no ts errors from other changes)
