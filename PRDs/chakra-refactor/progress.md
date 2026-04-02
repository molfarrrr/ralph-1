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
| TASK-008: Create `<NavLink>` shared component | pending | |
| TASK-009: Create barrel export `ui/index.ts` | pending | |
| TASK-010: Navbar — replace container with `<Container>` | pending | |
| TASK-011: Navbar — replace wordmark link hover with `linkRecipe` | pending | |
| TASK-012: Navbar — replace desktop nav links with `<NavLink>` | pending | |
| TASK-013: Navbar — replace mobile drawer links with `<NavLink>` | pending | |
| TASK-014: Navbar — replace hamburger button with `iconButtonRecipe` ghost | pending | |
| TASK-015: Navbar — replace close button with `iconButtonRecipe` ghost | pending | |
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
### [TASK-006] Create `<PageHeading>` shared component — iteration 6
- **Status:** done
- **Files changed:** `src/components/ui/PageHeading.tsx` (created)
- **Key decisions:** Used `useRecipe({ recipe: headingRecipe })` to consume the page variant; `Box as={as}` with `css={styles}` avoids Heading component defaults; default `as="h1"` per PRD
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `mb` accepts number|string to support both spacing scale values and custom strings
---
