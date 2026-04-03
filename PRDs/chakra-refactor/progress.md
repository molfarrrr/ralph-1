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
| TASK-016: Footer — replace flex container with `<Container>` | done | Replaced Flex with Container as={Flex}, removed maxW/mx/px props |
| TASK-017: Footer — replace LinkedIn link hover with `linkRecipe` muted | done | Imported linkRecipe + useRecipe; applied mutedStyles via css prop; removed color/_hover/transition |
| TASK-018: Footer — replace GitHub link hover with `linkRecipe` muted | done | Replaced inline color/_hover/transition with css={mutedStyles} (reused from TASK-017) |
| TASK-019: Layout — replace main container with `<Container>` | done | Replaced Box with Container as={Box}, removed maxW/mx/px props |
| TASK-020: HomePage — replace H1 with `<PageHeading>` | done | Replaced Heading with PageHeading mb={6}; removed Heading import |
| TASK-021: HomePage — replace eyebrow text with `<EyebrowLabel>` | done | Replaced Text with EyebrowLabel mb={5}; removed Text import not needed |
| TASK-022: HomePage — replace CTA link hover with `linkRecipe` | done | Applied linkRecipe default variant via css prop; removed color/_hover/transition |
| TASK-023: AboutPage — replace H1 with `<PageHeading>` | done | Replaced Heading as="h1" with PageHeading mb={5}; added PageHeading import from @/components/ui |
| TASK-024: AboutPage — replace "Experience" divider with `<SectionDivider>` | done | Added SectionDivider import; replaced Box at line 293 and its closing tag |
| TASK-025: AboutPage — replace "Contact" divider with `<SectionDivider>` | done | Replaced Box with SectionDivider; updated closing tag |
| TASK-026: AboutPage — replace "Education" divider with `<SectionDivider>` | done | Replaced Box with SectionDivider; closing tag updated |
| TASK-027: AboutPage — replace "Skills" divider with `<SectionDivider>` | done | Replaced Box with SectionDivider; closing tag updated |
| TASK-028: AboutPage — replace email + phone link hovers with `linkRecipe` | done | Applied linkRecipe default variant via css prop; removed _hover + transition |
| TASK-029: AboutPage — replace LinkedIn + GitHub link hovers with `linkRecipe` | done | Reused defaultLinkStyles (css prop) from TASK-028; removed _hover + transition |
| TASK-030: AboutPage — replace Print button with `iconButtonRecipe` solid | done | Imported iconButtonRecipe; applied solidStyles via css prop; removed layout/hover/transition props |
| TASK-031: AboutPage — replace Preview button with `iconButtonRecipe` outline | done | Applied outlineStyles via css prop; removed layout/border/hover/transition inline props |
| TASK-032: AboutPage — replace modal close button with `iconButtonRecipe` ghostRound | done | Applied ghostRoundStyles via css prop; removed w/h/display/alignItems/justifyContent/borderRadius/cursor/_hover/transition |
| TASK-033: ContactPage — replace H1 with `<PageHeading>` | done | Replaced Heading as="h1" with PageHeading mb={5}; removed Heading import |
| TASK-034: ContactPage — replace "Reach out" divider with `<SectionDivider>` | done | Wrapped Box flex={1} + SectionDivider; added SectionDivider to import |
| TASK-035: ContactPage — replace "Profiles" divider with `<SectionDivider>` | done | Wrapped Box flex={1} + SectionDivider; same pattern as TASK-034 |
| TASK-036: ContactPage — replace email + phone link hovers with `linkRecipe` | done | Applied linkRecipe default variant via css prop; removed color/_hover/transition |
| TASK-037: ContactPage — replace LinkedIn + GitHub link hovers with `linkRecipe` | done | Reused defaultLinkStyles (css prop) from TASK-036; removed color/_hover/transition |
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

---
---
### [TASK-017] Footer — replace LinkedIn link hover with `linkRecipe` muted — iteration 17
- **Status:** done
- **Files changed:** `src/components/layout/Footer.tsx`
- **Key decisions:** Added `useRecipe` + `linkRecipe` imports; called `link({ variant: 'muted' })` once and reused on LinkedIn `<chakra.a>` via `css={mutedStyles}`; removed `color`, `_hover`, `transition` inline props
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `mutedStyles` will be reused for GitHub link in TASK-018 (same file, same variable already defined)
---

---
### [TASK-018] Footer — replace GitHub link hover with `linkRecipe` muted — iteration 18
- **Status:** done
- **Files changed:** `src/components/layout/Footer.tsx`
- **Key decisions:** `mutedStyles` was already computed in TASK-017; reused it on GitHub `<chakra.a>`; removed `color`, `_hover`, `transition` inline props
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** No new imports needed — `linkRecipe`, `useRecipe`, and `mutedStyles` already present from TASK-017
---

### [TASK-019] Layout — replace main container with `<Container>` — iteration 19
- **Status:** done
- **Files changed:** `src/components/layout/Layout.tsx`
- **Key decisions:** Added `Container` import from `@/components/ui`; replaced `<Box as="main" maxW/mx/px ...>` with `<Container as={Box} ...>`; kept `flex`, `w`, `pt` props
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `as="main"` removed since Container renders a Box by default; layout unchanged at all breakpoints

---
---
### [TASK-020] HomePage — replace H1 with `<PageHeading>` — iteration 20
- **Status:** done
- **Files changed:** `src/pages/HomePage.tsx`
- **Key decisions:** Replaced `<Heading as="h1" ...>` with `<PageHeading mb={6}>`; removed `Heading` from Chakra import; added `PageHeading` import from `@/components/ui`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Recipe page variant uses fontWeight 300 / lineHeight 1.02 vs original 200 / 1.1 — intentional per PRD spec
---

---
### [TASK-021] HomePage — replace eyebrow text with `<EyebrowLabel>` — iteration 21
- **Status:** done
- **Files changed:** `src/pages/HomePage.tsx`
- **Key decisions:** Added `EyebrowLabel` to import from `@/components/ui`; replaced `<Text fontFamily="body" fontSize="sm" fontWeight="500" color="neutral.500" letterSpacing="0.1em" textTransform="uppercase" mb={5}>` with `<EyebrowLabel mb={5}>`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `Text` import retained — still used for supporting paragraph
---

---
### [TASK-022] HomePage — replace CTA link hover with `linkRecipe` — iteration 22
- **Status:** done
- **Files changed:** `src/pages/HomePage.tsx`
- **Key decisions:** Added `useRecipe` + `linkRecipe` imports; called `link({ variant: 'default' })` and applied via `css={linkStyles}`; removed `color="neutral.900"`, `_hover`, `transition` inline props
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `borderBottom` and `borderColor` remain explicit since recipe only covers color/transition; borderColor hover for the underline is not in the recipe but PRD specifies to remove it
---

---
### [TASK-023] AboutPage — replace H1 with `<PageHeading>` — iteration 23
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** Added `PageHeading` import from `@/components/ui`; replaced `<Heading as="h1" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} ...>` with `<PageHeading mb={5}>`; `Heading` import retained (used for h2 elements in experience/education sections)
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Actual file had `3xl/4xl/5xl` sizes (vs PRD-listed `4xl/5xl/6xl`); replaced per PRD instruction; recipe page variant now controls font sizing
---

---
### [TASK-024] AboutPage — replace "Experience" divider with `<SectionDivider>` — iteration 24
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** Added `SectionDivider` to import from `@/components/ui`; replaced `<Box borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` at line 293 with `<SectionDivider>`; updated closing tag accordingly
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Three more similar dividers remain (Contact, Education, Skills) — TASK-025/026/027
---

---
### [TASK-025] AboutPage — replace "Contact" divider with `<SectionDivider>` — iteration 4
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** Replaced `<Box borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` wrapping "Contact" heading and content with `<SectionDivider>`; `SectionDivider` was already imported from TASK-024
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Education (line 366) and Skills (line 381) dividers still pending as separate tasks
---

---
### [TASK-026] AboutPage — replace "Education" divider with `<SectionDivider>` — iteration 5
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** Replaced `<Box borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` wrapping Education content with `<SectionDivider>`; `SectionDivider` already imported from TASK-024
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Skills divider (TASK-027) also pending at line 381
---

---
### [TASK-027] AboutPage — replace "Skills" divider with `<SectionDivider>` — iteration 6
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** Replaced `<Box borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` wrapping Skills content with `<SectionDivider>`; `SectionDivider` already imported from TASK-024
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** All four section dividers in AboutPage are now using SectionDivider
---

---
### [TASK-028] AboutPage — replace email + phone link hovers with `linkRecipe` — iteration 7
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** Added `useRecipe` to Chakra import and `linkRecipe` import; called `link({ variant: 'default' })` in component body as `defaultLinkStyles`; applied via `css={defaultLinkStyles}` on email and phone `<chakra.a>`; removed `_hover` and `transition` props
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `defaultLinkStyles` variable will be reused for LinkedIn/GitHub links in TASK-029
---

---
### [TASK-029] AboutPage — replace LinkedIn + GitHub link hovers with `linkRecipe` — iteration 8
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** `defaultLinkStyles` was already computed in TASK-028; reused `css={defaultLinkStyles}` on LinkedIn and GitHub `<chakra.a>`; removed `_hover={{ color: 'neutral.500' }}` and `transition="0.25s ease"`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** No new imports needed — `linkRecipe`, `useRecipe`, and `defaultLinkStyles` already present from TASK-028
---

---
### [TASK-030] AboutPage — replace Print button with `iconButtonRecipe` solid variant — iteration 9
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** Added `iconButtonRecipe` import; called `useRecipe({ recipe: iconButtonRecipe })` + `iconBtn({ variant: 'solid' })` for `solidStyles`; applied via `css={solidStyles}`; removed `display`, `alignItems`, `justifyContent`, `px`, `py`, `bg`, `color`, `borderRadius`, `cursor`, `_hover`, `transition`; kept `fontSize`, `fontWeight`, `onClick`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `solidStyles` variable ready to be reused for any future solid buttons; `outlineStyles` needed for TASK-031 Preview button
---

---
### [TASK-031] AboutPage — replace Preview button with `iconButtonRecipe` outline variant — iteration 10
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** Added `outlineStyles = iconBtn({ variant: 'outline' })` (reused existing `iconBtn` from TASK-030); applied via `css={outlineStyles}`; removed `display`, `alignItems`, `justifyContent`, `px`, `py`, `border`, `borderColor`, `color`, `borderRadius`, `cursor`, `_hover`, `transition`; kept `fontSize`, `fontWeight`, `onClick`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `outlineStyles` ready for reuse on any future outline buttons
---

---
### [TASK-032] AboutPage — replace modal close button with `iconButtonRecipe` ghostRound — iteration 11
- **Status:** done
- **Files changed:** `src/pages/AboutPage.tsx`
- **Key decisions:** Added `ghostRoundStyles = iconBtn({ variant: 'ghostRound' })` reusing existing `iconBtn` from TASK-030; applied via `css={ghostRoundStyles}`; removed `w`, `h`, `display`, `alignItems`, `justifyContent`, `borderRadius`, `cursor`, `_hover`, `transition`; kept `color` and `onClick`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `iconBtn` and `iconButtonRecipe` already imported from TASK-030/031 — no new imports needed
---

---
### [TASK-033] ContactPage — replace H1 with `<PageHeading>` — iteration 12
- **Status:** done
- **Files changed:** `src/pages/ContactPage.tsx`
- **Key decisions:** Added `PageHeading` import from `@/components/ui`; replaced `<Heading as="h1" fontSize=... fontWeight="300" lineHeight="1.02" color="neutral.900" letterSpacing="-0.04em" mb={5}>` with `<PageHeading mb={5}>`; removed `Heading` from Chakra import (no other usage)
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `pageRecipe` variant now controls all heading typography
---

---
### [TASK-034] ContactPage — replace "Reach out" divider with `<SectionDivider>` — iteration 13
- **Status:** done
- **Files changed:** `src/pages/ContactPage.tsx`
- **Key decisions:** Added `SectionDivider` to import from `@/components/ui`; `flex={1}` kept on wrapping `<Box>` since SectionDivider doesn't accept flex prop; replaced `<Box flex={1} borderTop... pt={6}>` with `<Box flex={1}><SectionDivider>...</SectionDivider></Box>`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Same pattern needed for "Profiles" divider in TASK-035
---

---
### [TASK-035] ContactPage — replace "Profiles" divider with `<SectionDivider>` — iteration 14
- **Status:** done
- **Files changed:** `src/pages/ContactPage.tsx`
- **Key decisions:** Replaced `<Box flex={1} borderTop="1px solid" borderColor="rgba(31,31,31,0.12)" pt={6}>` with `<Box flex={1}><SectionDivider>...</SectionDivider></Box>`; kept `flex={1}` on outer Box since SectionDivider doesn't accept flex prop; `SectionDivider` already imported from TASK-034
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Same wrapping pattern as TASK-034 "Reach out" divider
---

---
### [TASK-036] ContactPage — replace email + phone link hovers with `linkRecipe` — iteration 15
- **Status:** done
- **Files changed:** `src/pages/ContactPage.tsx`
- **Key decisions:** Added `useRecipe` + `linkRecipe` imports; called `link({ variant: 'default' })` as `defaultLinkStyles`; applied via `css={defaultLinkStyles}` on email and phone `<chakra.a>`; removed `color`, `_hover`, `transition`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** `defaultLinkStyles` will be reused for LinkedIn/GitHub links in TASK-037 (same file, same variable)
---

---
### [TASK-037] ContactPage — replace LinkedIn + GitHub link hovers with `linkRecipe` — iteration 16
- **Status:** done
- **Files changed:** `src/pages/ContactPage.tsx`
- **Key decisions:** `defaultLinkStyles` was already computed in TASK-036; reused `css={defaultLinkStyles}` on LinkedIn and GitHub `<chakra.a>`; removed `color="neutral.900"`, `_hover`, `transition` inline props
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** No new imports needed — `linkRecipe`, `useRecipe`, and `defaultLinkStyles` already present from TASK-036
---

### [TASK-016] Footer — replace flex container with `<Container>` — iteration 16
- **Status:** done
- **Files changed:** `src/components/layout/Footer.tsx`
- **Key decisions:** Replaced `<Flex maxW="1128px" mx="auto" px={...}>` with `<Container as={Flex} ...>`; kept `align`, `justify`, `wrap`, `gap`; `Flex` import retained as it's passed as `as` prop; added `Container` import from `@/components/ui`
- **Verification:** `npx tsc --noEmit` — zero errors
- **Notes:** Footer layout unchanged; same pattern as Navbar TASK-010
---
