# Progress — chakra-refactor

| Task | Status | Notes |
|------|--------|-------|
| TASK-001: Create `linkRecipe` in theme | done | Created link.recipe.ts, registered in theme/index.ts |
| TASK-002: Create `headingRecipe` in theme | done | Created heading.recipe.ts, registered in theme/index.ts |
| TASK-003: Create `iconButtonRecipe` in theme | done | Created iconButton.recipe.ts, registered in theme/index.ts |
| TASK-004: Create `<Container>` shared component | done | Created Container.tsx in components/ui/ |
| TASK-005: Create `<SectionDivider>` shared component | done | Created SectionDivider.tsx in components/ui/ |
| TASK-006: Create `<PageHeading>` shared component | done | Created PageHeading.tsx using useRecipe with headingRecipe page variant |
| TASK-007: Create `<EyebrowLabel>` shared component | done | Created EyebrowLabel.tsx using headingRecipe label variant |
| TASK-008: Create `<NavLink>` shared component | done | Created NavLink.tsx using linkRecipe default variant; isActive adds fontWeight 500 + underline |
| TASK-009: Create barrel export `ui/index.ts` | done | Created index.ts re-exporting all 5 shared components |
| TASK-010: Navbar — replace container with `<Container>` | done | Replaced Flex with Container as={Flex}, removed maxW/mx/px props |
| TASK-011: Navbar — replace wordmark link hover with `linkRecipe` | done | Imported linkRecipe + useRecipe; applied wordmarkStyles via css prop; removed transition/_hover |
| TASK-012: Navbar — replace desktop nav links with `<NavLink>` | done | Replaced Link+Text blocks with NavLink; removed _hover/transition/color inline props |
| TASK-013: Navbar — replace mobile drawer links with `<NavLink>` | done | Replaced Link+Text blocks with Box wrapper + NavLink; preserved fontFamily/letterSpacing/onClick |
| TASK-014: Navbar — replace hamburger button with `iconButtonRecipe` ghost | done | Imported iconButtonRecipe; applied ghostStyles via css prop; removed _hover + transition |
| TASK-015: Navbar — replace close button with `iconButtonRecipe` ghost | done | Applied ghostStyles css prop; removed _hover + transition |
| TASK-016: Footer — replace flex container with `<Container>` | pending | |
| TASK-017: Footer — replace LinkedIn link hover with `linkRecipe` muted | pending | |
| TASK-018: Footer — replace GitHub link hover with `linkRecipe` muted | pending | |
| TASK-019: Layout — replace main container with `<Container>` | pending | |
| TASK-020: HomePage — replace H1 with `<PageHeading>` | pending | |
| TASK-021: HomePage — replace eyebrow text with `<EyebrowLabel>` | pending | |
| TASK-022: HomePage — replace CTA link hover with `linkRecipe` | pending | |
| TASK-023: AboutPage — replace H1 with `<PageHeading>` | pending | |
| TASK-024: AboutPage — replace "Experience" divider with `<SectionDivider>` | pending | |
| TASK-025: AboutPage — replace "Contact" divider with `<SectionDivider>` | pending | |
| TASK-026: AboutPage — replace "Education" divider with `<SectionDivider>` | pending | |
| TASK-027: AboutPage — replace "Skills" divider with `<SectionDivider>` | pending | |
| TASK-028: AboutPage — replace email + phone link hovers with `linkRecipe` | pending | |
| TASK-029: AboutPage — replace LinkedIn + GitHub link hovers with `linkRecipe` | pending | |
| TASK-030: AboutPage — replace Print button with `iconButtonRecipe` solid | pending | |
| TASK-031: AboutPage — replace Preview button with `iconButtonRecipe` outline | pending | |
| TASK-032: AboutPage — replace modal close button with `iconButtonRecipe` ghostRound | pending | |
| TASK-033: ContactPage — replace H1 with `<PageHeading>` | pending | |
| TASK-034: ContactPage — replace "Reach out" divider with `<SectionDivider>` | pending | |
| TASK-035: ContactPage — replace "Profiles" divider with `<SectionDivider>` | pending | |
| TASK-036: ContactPage — replace email + phone link hovers with `linkRecipe` | pending | |
| TASK-037: ContactPage — replace LinkedIn + GitHub link hovers with `linkRecipe` | pending | |
| TASK-038: WorkPage — replace H1 with `<PageHeading>` | pending | |
| TASK-039: Update all imports to use barrel `@/components/ui` | pending | |
| TASK-040: Update react-developer skill with Chakra authoring rules | pending | |

---
### [TASK-001] Create `linkRecipe` in theme — iteration 1
- **Status:** done
- **Files changed:** `src/theme/recipes/link.recipe.ts` (created), `src/theme/index.ts` (updated)
- **Key decisions:** Used `variant` as the discriminator key per Chakra `defineRecipe` convention; set `defaultVariants.variant = 'default'`
- **Verification:** `npx tsc --noEmit` — zero errors; `theme/index.ts` has `recipes.link`
- **Notes:** recipes directory created fresh; heading/iconButton recipes follow same pattern
---

---
### [TASK-002] Create `headingRecipe` in theme — iteration 2
- **Status:** done
- **Files changed:** `src/theme/recipes/heading.recipe.ts` (created), `src/theme/index.ts` (updated)
- **Key decisions:** Used `variant` discriminator; `defaultVariants.variant = 'section'`; fontWeight as string to match Chakra token expectations
- **Verification:** `npx tsc --noEmit` — zero errors; `theme/index.ts` has `recipes.heading`
- **Notes:** `page` variant matches exact PRD spec; `label` variant has textTransform uppercase for eyebrow labels
---

---
### [TASK-004] Create `<Container>` shared component — iteration 4
- **Status:** done
- **Files changed:** `src/components/ui/Container.tsx` (created)
- **Key decisions:** Extended BoxProps to allow passing extra Chakra props (needed for later tasks using `as={Flex}` with `py`, `align`, `justify`)
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `px` and `maxW` are the container-specific props; all others spread through to underlying Box
---

---
### [TASK-005] Create `<SectionDivider>` shared component — iteration 5
- **Status:** done
- **Files changed:** `src/components/ui/SectionDivider.tsx` (created)
- **Key decisions:** `pt ?? 6` default matches PRD spec; `borderColor` uses rgba directly as it's not a theme token
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Children render inside the bordered box — heading content goes as children
---

---
### [TASK-003] Create `iconButtonRecipe` in theme — iteration 3
- **Status:** done
- **Files changed:** `src/theme/recipes/iconButton.recipe.ts` (created), `src/theme/index.ts` (updated)
- **Key decisions:** 4 variants: ghost (opacity hover), solid (filled), outline (bordered), ghostRound (circle close button); defaultVariants.variant = 'ghost'
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** px/py passed as string '5'/'3' to match Chakra spacing token syntax
---

---
### [TASK-007] Create `<EyebrowLabel>` shared component — iteration 7
- **Status:** done
- **Files changed:** `src/components/ui/EyebrowLabel.tsx` (created)
- **Key decisions:** Same pattern as PageHeading — `useRecipe({ recipe: headingRecipe })` with `variant: 'label'`; renders as plain `Box` (no heading semantics needed for eyebrow labels)
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `mb` accepts number|string matching PageHeading convention
---

---
---
### [TASK-008] Create `<NavLink>` shared component — iteration 8
- **Status:** done
- **Files changed:** `src/components/ui/NavLink.tsx` (created)
- **Key decisions:** Used `useRecipe({ recipe: linkRecipe })` with `variant: 'default'`; `Box as={Link}` renders React Router Link with recipe styles; `isActive` applies `fontWeight: 500` and `textDecoration: underline` with `textUnderlineOffset: 3px`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `fontSize` and `fontWeight` props allow per-instance overrides (needed for mobile drawer's large font size)
---

---
### [TASK-009] Create barrel export `ui/index.ts` — iteration 9
- **Status:** done
- **Files changed:** `src/components/ui/index.ts` (created)
- **Key decisions:** Simple re-exports for all 5 components; no default exports per project conventions
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** All subsequent tasks should import from `@/components/ui` rather than individual files
---

---
### [TASK-010] Navbar — replace inner flex container with `<Container>` — iteration 10
- **Status:** done
- **Files changed:** `src/components/layout/Navbar.tsx`
- **Key decisions:** Added `import { Container } from '@/components/ui'`; replaced `<Flex maxW="1128px" mx="auto" px={...}>` with `<Container as={Flex} ...>`; kept only `py`, `align`, `justify` on the Container
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Closing `</Flex>` also replaced with `</Container>`
---

---
### [TASK-011] Navbar — replace wordmark link hover with `linkRecipe` — iteration 11
- **Status:** done
- **Files changed:** `src/components/layout/Navbar.tsx`
- **Key decisions:** Added `useRecipe` import and `linkRecipe` import; called `useRecipe({ recipe: linkRecipe })` in component body to get `wordmarkStyles`; applied via `css={wordmarkStyles}` on `<Text>`; removed `color="neutral.900"`, `transition`, and `_hover` props (color now provided by recipe)
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Recipe provides `color: neutral.900`, `transition: 0.25s ease`, `_hover: { color: neutral.500 }` — all three inline props replaced
---

---
### [TASK-012] Navbar — replace desktop nav links with `<NavLink>` — iteration 12
- **Status:** done
- **Files changed:** `src/components/layout/Navbar.tsx`
- **Key decisions:** Added `NavLink` to import from `@/components/ui`; replaced each `<Link><Text ...></Text></Link>` block with `<NavLink to={href} isActive={pathname === href} fontSize="sm">`; removed inline `color`, `_hover`, `transition`, `fontWeight`, `borderBottom` props (NavLink handles active state with underline via textDecoration)
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Desktop nav active state now uses `textDecoration: underline` (from NavLink) instead of `borderBottom: 1px solid` — consistent with NavLink component design; `Text` import retained for wordmark
---

---
### [TASK-013] Navbar — replace mobile drawer links with `<NavLink>` — iteration 13
- **Status:** done
- **Files changed:** `src/components/layout/Navbar.tsx`
- **Key decisions:** Wrapped each NavLink in a `<Box>` to preserve `onClick` (drawer close), `fontFamily`, `letterSpacing`, `textAlign`, `pb` which NavLink doesn't accept; removed `_hover` and `transition` (linkRecipe handles those); removed `borderBottom` active indicator (NavLink's textDecoration underline replaces it); passed `fontWeight` through NavLink's existing prop
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `Link` import retained — still used for wordmark
---

---
### [TASK-014] Navbar — replace hamburger button with `iconButtonRecipe` ghost — iteration 14
- **Status:** done
- **Files changed:** `src/components/layout/Navbar.tsx`
- **Key decisions:** Imported `iconButtonRecipe`; called `useRecipe({ recipe: iconButtonRecipe })` + `iconBtnStyles({ variant: 'ghost' })`; applied via `css={ghostStyles}`; removed `_hover={{ opacity: 0.7 }}` and `transition="opacity 0.25s ease"`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Recipe base provides `transition: 0.25s ease`; ghost variant provides `_hover: { opacity: 0.7 }`; explicit layout props (alignItems, justifyContent, cursor, display) kept as-is
---

---
### [TASK-015] Navbar — replace close button with `iconButtonRecipe` ghost — iteration 15
- **Status:** done
- **Files changed:** `src/components/layout/Navbar.tsx`
- **Key decisions:** `ghostStyles` was already computed in TASK-014; reused it on the close button; removed `_hover={{ opacity: 0.7 }}` and `transition="opacity 0.25s ease"`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** No new imports needed — `iconButtonRecipe` and `useRecipe` already present from TASK-014
---

### [TASK-006] Create `<PageHeading>` shared component — iteration 6
- **Status:** done
- **Files changed:** `src/components/ui/PageHeading.tsx` (created)
- **Key decisions:** Used `useRecipe({ recipe: headingRecipe })` to consume the page variant; `Box as={as}` with `css={styles}` avoids Heading component defaults; default `as="h1"` per PRD
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `mb` accepts number|string to support both spacing scale values and custom strings
---
