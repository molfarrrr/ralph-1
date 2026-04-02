# PRD: Chakra UI Refactoring — Recipes, Shared Components & Dev Guidance

## Goal
Eliminate repeated Chakra style props by creating recipes and shared components,
then replacing every specific instance across the codebase.

## Source Directory
All source files live under: `Oleh-Hladyshev-Profile/src/`

## Progress Tracking Instructions

After completing each task:
1. Open `PRDs/chakra-refactor/progress.md`
2. Change the task status to `done`
3. Add a brief note in Notes column

Status values: `pending` · `in progress` · `done` · `blocked`

Do not move to the next task until verification passes and progress.md is updated.

## Strict Boundaries
- ONLY touch files listed in each task. Nothing else.
- NEVER modify `.claude/`, `CLAUDE.md`, `PRDs/`, or `ralph.sh`.
- NEVER change visual behaviour. Pages must render identically before and after.
- NEVER add features or new UI. Refactoring only.
- After every task: run `npx tsc --noEmit` — must pass with zero errors.

---

## PHASE 1 — Create Recipes

### TASK-001: Create `linkRecipe` in theme
- File: `Oleh-Hladyshev-Profile/src/theme/recipes/link.recipe.ts`
- Use Chakra `defineRecipe` with two variants:
  - `default`: `color: neutral.900`, `_hover: { color: neutral.500 }`, `transition: 0.25s ease`
  - `muted`: `color: neutral.500`, `_hover: { color: neutral.900 }`, `transition: 0.25s ease`
- Register recipe in `Oleh-Hladyshev-Profile/src/theme/index.ts` under `recipes.link`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Read `theme/index.ts` — confirm `recipes.link` is present

### TASK-002: Create `headingRecipe` in theme
- File: `Oleh-Hladyshev-Profile/src/theme/recipes/heading.recipe.ts`
- Variants:
  - `page`: `fontSize: { base: 4xl, md: 5xl, lg: 6xl }`, `fontWeight: 300`, `lineHeight: 1.02`, `letterSpacing: -0.04em`, `color: neutral.900`
  - `section`: `fontSize: { base: 2xl, lg: 3xl }`, `fontWeight: 400`, `letterSpacing: -0.03em`, `color: neutral.900`
  - `subSection`: `fontSize: lg`, `fontWeight: 500`, `letterSpacing: -0.02em`, `color: neutral.900`
  - `label`: `fontSize: sm`, `fontWeight: 500`, `letterSpacing: 0.1em`, `textTransform: uppercase`, `color: neutral.500`
- Register in `theme/index.ts` under `recipes.heading`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - Read `theme/index.ts` — confirm `recipes.heading` registered

### TASK-003: Create `iconButtonRecipe` in theme
- File: `Oleh-Hladyshev-Profile/src/theme/recipes/iconButton.recipe.ts`
- Base: `display: inline-flex`, `alignItems: center`, `justifyContent: center`, `cursor: pointer`, `transition: 0.25s ease`
- Variants:
  - `ghost`: `_hover: { opacity: 0.7 }` — for hamburger/close icon buttons
  - `solid`: `bg: neutral.900`, `color: neutral.0`, `px: 5`, `py: 3`, `borderRadius: full`, `_hover: { opacity: 0.82 }` — for filled action buttons
  - `outline`: `border: 1px solid`, `borderColor: neutral.900`, `color: neutral.900`, `px: 5`, `py: 3`, `borderRadius: full`, `_hover: { bg: rgba(31,31,31,0.04) }` — for bordered action buttons
  - `ghostRound`: `w: 36px`, `h: 36px`, `borderRadius: full`, `_hover: { bg: rgba(31,31,31,0.06) }` — for round close buttons
- Register in `theme/index.ts` under `recipes.iconButton`
- **Verification:**
  - `npx tsc --noEmit` — zero errors

---

## PHASE 2 — Create Shared Components

### TASK-004: Create `<Container>` shared component
- File: `Oleh-Hladyshev-Profile/src/components/ui/Container.tsx`
- Named export: `Container`
- Props: `{ children: React.ReactNode; as?: React.ElementType }`
- Style: `maxW="1128px"`, `mx="auto"`, `px={{ base: 5, md: 8, xl: 0 }}`
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-005: Create `<SectionDivider>` shared component
- File: `Oleh-Hladyshev-Profile/src/components/ui/SectionDivider.tsx`
- Named export: `SectionDivider`
- Props: `{ children: React.ReactNode; pt?: number }`
- Renders a `Box` with `borderTop="1px solid"`, `borderColor="rgba(31,31,31,0.12)"`, `pt={pt ?? 6}`
- Children render inside the box (section heading goes inside)
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-006: Create `<PageHeading>` shared component
- File: `Oleh-Hladyshev-Profile/src/components/ui/PageHeading.tsx`
- Named export: `PageHeading`
- Props: `{ children: React.ReactNode; as?: 'h1'|'h2'|'h3'; mb?: number|string }`
- Uses `headingRecipe` variant `page`, default `as="h1"`
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-007: Create `<EyebrowLabel>` shared component
- File: `Oleh-Hladyshev-Profile/src/components/ui/EyebrowLabel.tsx`
- Named export: `EyebrowLabel`
- Props: `{ children: React.ReactNode; mb?: number|string }`
- Uses `headingRecipe` variant `label`
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-008: Create `<NavLink>` shared component
- File: `Oleh-Hladyshev-Profile/src/components/ui/NavLink.tsx`
- Named export: `NavLink`
- Props: `{ to: string; children: React.ReactNode; isActive?: boolean; fontSize?: string; fontWeight?: string }`
- Wraps React Router `Link` with `linkRecipe` default variant
- When `isActive`: `fontWeight: 500`, underline treatment
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-009: Create barrel export `src/components/ui/index.ts`
- File: `Oleh-Hladyshev-Profile/src/components/ui/index.ts`
- Re-export: `Container`, `SectionDivider`, `PageHeading`, `EyebrowLabel`, `NavLink`
- **Verification:** `npx tsc --noEmit` — zero errors

---

## PHASE 3 — Apply to Navbar.tsx

### TASK-010: Navbar — replace inner flex container with `<Container>`
- File: `Oleh-Hladyshev-Profile/src/components/layout/Navbar.tsx`
- Lines ~46–52: Replace `<Flex maxW="1128px" mx="auto" px={{ base: 5, md: 8, xl: 0 }} ...>` with `<Container as={Flex} ...>` keeping only non-container props (`py`, `align`, `justify`)
- **Verification:** `npx tsc --noEmit` — zero errors; Navbar layout unchanged at 1440px

### TASK-011: Navbar — replace wordmark link hover with `linkRecipe`
- File: `Oleh-Hladyshev-Profile/src/components/layout/Navbar.tsx`
- Lines ~56–65: Remove `transition="0.25s ease"` and `_hover={{ color: 'neutral.500' }}` from wordmark `<Text>`, apply `linkRecipe` default variant
- **Verification:** `npx tsc --noEmit` — zero errors; wordmark hover still changes to neutral.500

### TASK-012: Navbar — replace desktop nav links with `<NavLink>`
- File: `Oleh-Hladyshev-Profile/src/components/layout/Navbar.tsx`
- Lines ~72–84: Replace the `<Text color="neutral.900" _hover={{ color: 'neutral.500' }} transition="0.25s ease" ...>` block for each desktop nav link with `<NavLink to={href} isActive={pathname === href}>`
- **Verification:** `npx tsc --noEmit` — zero errors; active link has underline, hover changes colour

### TASK-013: Navbar — replace mobile drawer nav links with `<NavLink>`
- File: `Oleh-Hladyshev-Profile/src/components/layout/Navbar.tsx`
- Lines ~196–210: Replace mobile drawer `<Text _hover={{ color: 'neutral.500' }} transition="0.25s ease" ...>` blocks with `<NavLink to={href} isActive={pathname === href} fontSize="clamp(2rem, 9vw, 3.25rem)">`
- **Verification:** `npx tsc --noEmit` — zero errors; mobile drawer links work and animate

### TASK-014: Navbar — replace hamburger button with `iconButtonRecipe` ghost variant
- File: `Oleh-Hladyshev-Profile/src/components/layout/Navbar.tsx`
- Lines ~90–129: Remove inline `_hover={{ opacity: 0.7 }}` and `transition="opacity 0.25s ease"` from hamburger `<chakra.button>`, apply `iconButtonRecipe` ghost variant
- **Verification:** `npx tsc --noEmit` — zero errors; hamburger opacity still animates on hover

### TASK-015: Navbar — replace close button with `iconButtonRecipe` ghost variant
- File: `Oleh-Hladyshev-Profile/src/components/layout/Navbar.tsx`
- Lines ~143–177: Remove inline `_hover={{ opacity: 0.7 }}` and `transition="opacity 0.25s ease"` from drawer close `<chakra.button>`, apply `iconButtonRecipe` ghost variant
- **Verification:** `npx tsc --noEmit` — zero errors; close button still animates on hover

---

## PHASE 4 — Apply to Footer.tsx

### TASK-016: Footer — replace flex container with `<Container>`
- File: `Oleh-Hladyshev-Profile/src/components/layout/Footer.tsx`
- Lines ~8–15: Replace `<Flex maxW="1128px" mx="auto" px={{ base: 5, md: 8, xl: 0 }} ...>` with `<Container as={Flex} ...>` keeping `align`, `justify`, `wrap`, `gap`
- **Verification:** `npx tsc --noEmit` — zero errors; footer layout unchanged

### TASK-017: Footer — replace LinkedIn link hover with `linkRecipe` muted variant
- File: `Oleh-Hladyshev-Profile/src/components/layout/Footer.tsx`
- Lines ~30–43: Remove `color="neutral.500"`, `_hover={{ color: 'neutral.900' }}`, `transition="0.25s ease"` from LinkedIn `<chakra.a>`, apply `linkRecipe` muted variant
- **Verification:** `npx tsc --noEmit` — zero errors; LinkedIn link hover still changes to neutral.900

### TASK-018: Footer — replace GitHub link hover with `linkRecipe` muted variant
- File: `Oleh-Hladyshev-Profile/src/components/layout/Footer.tsx`
- Lines ~47–56: Remove `color="neutral.500"`, `_hover={{ color: 'neutral.900' }}`, `transition="0.25s ease"` from GitHub `<chakra.a>`, apply `linkRecipe` muted variant
- **Verification:** `npx tsc --noEmit` — zero errors; GitHub link hover still changes to neutral.900

---

## PHASE 5 — Apply to Layout.tsx

### TASK-019: Layout — replace main container with `<Container>`
- File: `Oleh-Hladyshev-Profile/src/components/layout/Layout.tsx`
- Lines ~13–21: Replace `<Box maxW="1128px" mx="auto" px={{ base: 5, md: 8, xl: 0 }} ...>` with `<Container as={Box} ...>` keeping `flex`, `w`, `pt` props
- **Verification:** `npx tsc --noEmit` — zero errors; layout unchanged at all breakpoints

---

## PHASE 6 — Apply to HomePage.tsx

### TASK-020: HomePage — replace H1 with `<PageHeading>`
- File: `Oleh-Hladyshev-Profile/src/pages/HomePage.tsx`
- Lines ~32–45: Replace `<Heading as="h1" fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} fontWeight="200" lineHeight="1.1" color="neutral.900" mb={6}>` with `<PageHeading mb={6}>`, keeping only children
- **Verification:** `npx tsc --noEmit` — zero errors; H1 renders identically

### TASK-021: HomePage — replace eyebrow text with `<EyebrowLabel>`
- File: `Oleh-Hladyshev-Profile/src/pages/HomePage.tsx`
- Lines ~19–28: Replace `<Text fontFamily="body" fontSize="sm" fontWeight="500" color="neutral.500" letterSpacing="0.1em" textTransform="uppercase" mb={5}>` with `<EyebrowLabel mb={5}>`
- **Verification:** `npx tsc --noEmit` — zero errors; eyebrow text style unchanged

### TASK-022: HomePage — replace "View my CV" link hover with `linkRecipe`
- File: `Oleh-Hladyshev-Profile/src/pages/HomePage.tsx`
- Lines ~61–78: Remove `_hover={{ color: 'neutral.500', borderColor: 'neutral.500' }}` and `transition="0.25s ease"` from the CTA `<ChakraLink>`, apply `linkRecipe` default variant
- **Verification:** `npx tsc --noEmit` — zero errors; CTA link hover unchanged

---

## PHASE 7 — Apply to AboutPage.tsx

### TASK-023: AboutPage — replace H1 with `<PageHeading>`
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~220–230: Replace `<Heading as="h1" fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} fontWeight="300" lineHeight="1.02" color="neutral.900" letterSpacing="-0.04em" mb={5}>` with `<PageHeading mb={5}>`
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-024: AboutPage — replace "Experience" section divider with `<SectionDivider>`
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~300–303: Replace `<Box borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` wrapping the "Experience" heading with `<SectionDivider>`
- **Verification:** `npx tsc --noEmit` — zero errors; section border renders identically

### TASK-025: AboutPage — replace "Contact" section divider with `<SectionDivider>`
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~340–342: Replace `<Box borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` wrapping the "Contact" heading with `<SectionDivider>`
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-026: AboutPage — replace "Education" section divider with `<SectionDivider>`
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~373–375: Replace `<Box borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` wrapping "Education" with `<SectionDivider>`
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-027: AboutPage — replace "Skills" section divider with `<SectionDivider>`
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~388–390: Replace `<Box borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` wrapping "Skills" with `<SectionDivider>`
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-028: AboutPage — replace email + phone link hovers with `linkRecipe`
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~346–350: Remove `_hover={{ color: 'neutral.500' }}` and `transition="0.25s ease"` from email and phone `<chakra.a>` elements, apply `linkRecipe` default variant
- **Verification:** `npx tsc --noEmit` — zero errors; hover behaviour unchanged

### TASK-029: AboutPage — replace LinkedIn + GitHub link hovers with `linkRecipe`
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~352–369: Remove `_hover={{ color: 'neutral.500' }}` and `transition="0.25s ease"` from LinkedIn and GitHub `<chakra.a>` elements, apply `linkRecipe` default variant
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-030: AboutPage — replace Print button with `iconButtonRecipe` solid variant
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~247–270: Remove inline `display="inline-flex"`, `alignItems="center"`, `justifyContent="center"`, `px={5}`, `py={3}`, `bg="neutral.900"`, `color="neutral.0"`, `borderRadius="full"`, `cursor="pointer"`, `_hover={{ opacity: 0.82 }}`, `transition="opacity 0.25s ease"` from Print `<chakra.button>`, apply `iconButtonRecipe` solid variant
- **Verification:** `npx tsc --noEmit` — zero errors; print button renders identically

### TASK-031: AboutPage — replace Preview button with `iconButtonRecipe` outline variant
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~271–294: Remove inline layout/style props from Preview `<chakra.button>`, apply `iconButtonRecipe` outline variant
- **Verification:** `npx tsc --noEmit` — zero errors; preview button renders identically

### TASK-032: AboutPage — replace modal close button with `iconButtonRecipe` ghostRound variant
- File: `Oleh-Hladyshev-Profile/src/pages/AboutPage.tsx`
- Lines ~441–460: Remove inline `w="36px"`, `h="36px"`, `display="inline-flex"`, `alignItems="center"`, `justifyContent="center"`, `borderRadius="full"`, `cursor="pointer"`, `_hover={{ bg: 'rgba(31,31,31,0.06)' }}`, `transition="0.25s ease"` from close `<chakra.button>`, apply `iconButtonRecipe` ghostRound variant
- **Verification:** `npx tsc --noEmit` — zero errors

---

## PHASE 8 — Apply to ContactPage.tsx

### TASK-033: ContactPage — replace H1 with `<PageHeading>`
- File: `Oleh-Hladyshev-Profile/src/pages/ContactPage.tsx`
- Lines ~8–17: Replace `<Heading as="h1" fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} fontWeight="300" lineHeight="1.02" color="neutral.900" letterSpacing="-0.04em" mb={5}>` with `<PageHeading mb={5}>`
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-034: ContactPage — replace "Reach out" section divider with `<SectionDivider>`
- File: `Oleh-Hladyshev-Profile/src/pages/ContactPage.tsx`
- Lines ~26–29: Replace `<Box flex={1} borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` with `<SectionDivider>` keeping `flex={1}` on a wrapping Box if needed
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-035: ContactPage — replace "Profiles" section divider with `<SectionDivider>`
- File: `Oleh-Hladyshev-Profile/src/pages/ContactPage.tsx`
- Lines ~55–57: Replace `<Box flex={1} borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` with `<SectionDivider>`
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-036: ContactPage — replace email + phone link hovers with `linkRecipe`
- File: `Oleh-Hladyshev-Profile/src/pages/ContactPage.tsx`
- Lines ~31–47: Remove `_hover={{ color: 'neutral.500' }}` and `transition="0.25s ease"` from email and phone `<chakra.a>`, apply `linkRecipe` default variant
- **Verification:** `npx tsc --noEmit` — zero errors

### TASK-037: ContactPage — replace LinkedIn + GitHub link hovers with `linkRecipe`
- File: `Oleh-Hladyshev-Profile/src/pages/ContactPage.tsx`
- Lines ~60–80: Remove `_hover={{ color: 'neutral.500' }}` and `transition="0.25s ease"` from LinkedIn and GitHub `<chakra.a>`, apply `linkRecipe` default variant
- **Verification:** `npx tsc --noEmit` — zero errors

---

## PHASE 9 — Apply to WorkPage.tsx

### TASK-038: WorkPage — replace H1 with `<PageHeading>`
- File: `Oleh-Hladyshev-Profile/src/pages/WorkPage.tsx`
- Line ~6: Replace `<Heading as="h1" fontSize={{ base: '3xl', lg: '5xl' }} fontWeight="300" color="neutral.900" mb={6}>` with `<PageHeading mb={6}>`
- **Verification:** `npx tsc --noEmit` — zero errors

---

## PHASE 10 — Cleanup & Skill Update

### TASK-039: Update all imports to use barrel `@/components/ui`
- Scan all files for direct imports like `import { Container } from '@/components/ui/Container'`
- Replace with `import { Container } from '@/components/ui'`
- **Verification:**
  - `npx tsc --noEmit` — zero errors
  - `grep -r "from '@/components/ui/"` — should return zero results

### TASK-040: Update react-developer skill with Chakra component authoring rules
- File: `.claude/skills/react-developer/SKILL.md`
- Add section `## 13. Chakra Component Authoring Rules` before the checklist
- Must cover:
  1. Check `src/theme/recipes/` before writing any inline hover/transition/font style props
  2. Check `src/components/ui/` before creating any heading, label, link, container, or divider
  3. If a pattern appears more than once → it belongs in a recipe or shared component
  4. How to use a recipe: `useRecipe({ recipe: linkRecipe })` or pass variant prop
  5. How to add a new recipe: `defineRecipe` → file in `src/theme/recipes/` → register in `theme/index.ts`
  6. How to add a shared component: file in `src/components/ui/` → named export → add to barrel `index.ts`
- **Verification:** Read file and confirm all 6 points are present
