---
name: react-dev
description: Comprehensive React 19 + Chakra UI 3 + React Router v7 development guide with snippets tailored to this project
---

# React Dev Skill

You are developing a **React 19 + TypeScript + Chakra UI 3 + React Router v7** personal website (Vite, no backend).

Always follow the conventions in `CLAUDE.md`. This skill provides detailed patterns, snippets, and rules for every common scenario.

---

## 1. Project Conventions (non-negotiable)

- Named exports only — never `export default`
- Props interface declared above the component
- Explicit return types on all functions
- No `any` — use `unknown` + narrowing if needed
- `@/` path alias for all internal imports
- Chakra style props only — no raw CSS, no `style={{}}`, no hex values directly
- All colors via theme tokens (`brand.500`, `neutral.900`, etc.)
- All interactive elements: `transition="0.3s ease-out"`

---

## 2. Component Template

Every component follows this exact structure:

```tsx
// src/components/ui/Card.tsx
import { Box } from '@chakra-ui/react'

interface CardProps {
  title: string
  children: React.ReactNode
}

export function Card({ title, children }: CardProps): React.JSX.Element {
  return (
    <Box
      bg="white"
      borderRadius="md"
      border="1px solid"
      borderColor="neutral.100"
      p={6}
    >
      {children}
    </Box>
  )
}
```

---

## 3. Chakra UI 3 — Theme Setup

### createSystem (src/theme/index.ts)
```ts
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: '#4353FF' },
          600: { value: '#2e3bcc' },
        },
        neutral: {
          100: { value: '#f5f5f5' },
          500: { value: '#6b6b6b' },
          900: { value: '#2a2a2a' },
        },
      },
      fonts: {
        body:    { value: 'Inter, sans-serif' },
        heading: { value: 'Inter, sans-serif' },
        mono:    { value: 'Roboto Mono, monospace' },
      },
    },
    semanticTokens: {
      colors: {
        'bg.default':   { value: 'white' },
        'text.default': { value: '{colors.neutral.900}' },
        'text.muted':   { value: '{colors.neutral.500}' },
        'border.default': { value: '{colors.neutral.100}' },
      },
    },
  },
  globalCss: {
    body: {
      bg: 'white',
      color: 'neutral.900',
      fontFamily: 'body',
    },
  },
})

export const system = createSystem(defaultConfig, config)
```

### ChakraProvider (src/main.tsx)
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@/theme'
import { App } from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
)
```

---

## 4. Chakra UI 3 — Style Props Reference

### Spacing
```tsx
// margin, padding — use numeric scale (1 = 4px, 2 = 8px, 4 = 16px, 6 = 24px, 8 = 32px)
<Box p={6} mt={4} mb={8} px={4} py={2} />
```

### Colors (always tokens, never hex)
```tsx
<Box bg="brand.500" color="white" />
<Box bg="neutral.100" color="neutral.900" />
<Box borderColor="neutral.100" />
```

### Typography
```tsx
<Text fontFamily="body" fontSize="md" fontWeight="400" color="neutral.500" />
<Heading fontFamily="heading" fontSize="2xl" fontWeight="700" color="neutral.900" />
<Text fontFamily="mono" fontSize="sm" />
```

### Responsive props (mobile-first)
```tsx
// Array syntax: [base, sm, md, lg, xl]
<Box fontSize={{ base: 'sm', md: 'md', lg: 'xl' }} />
<Flex direction={{ base: 'column', md: 'row' }} />
<Box display={{ base: 'none', lg: 'flex' }} />
```

### Borders
```tsx
<Box border="1px solid" borderColor="neutral.100" borderRadius="md" />
<Box borderBottom="1px solid" borderColor="neutral.100" />
```

### Transitions (required on interactive elements)
```tsx
<Box transition="0.3s ease-out" _hover={{ color: 'brand.500' }} />
<Button transition="0.3s ease-out" _hover={{ bg: 'brand.600' }} />
```

### Pseudo-states
```tsx
<Box
  _hover={{ color: 'brand.500', transform: 'translateY(-2px)' }}
  _active={{ transform: 'translateY(0)' }}
  _focus={{ outline: '2px solid', outlineColor: 'brand.500', outlineOffset: '2px' }}
/>
```

---

## 5. Chakra UI 3 — Common Components

### Button
```tsx
import { Button } from '@chakra-ui/react'

// Primary CTA
<Button
  bg="brand.500"
  color="white"
  _hover={{ bg: 'brand.600' }}
  transition="0.3s ease-out"
  borderRadius="md"
  px={8}
  py={4}
  fontFamily="body"
  fontWeight="500"
>
  Get in Touch
</Button>

// Ghost / outline
<Button
  variant="outline"
  borderColor="brand.500"
  color="brand.500"
  _hover={{ bg: 'brand.500', color: 'white' }}
  transition="0.3s ease-out"
>
  Learn More
</Button>
```

### Stack (VStack / HStack)
```tsx
import { VStack, HStack, Stack } from '@chakra-ui/react'

<VStack gap={4} align="stretch">
  <Box />
  <Box />
</VStack>

<HStack gap={6} justify="space-between">
  <Box />
  <Box />
</HStack>

// Responsive direction
<Stack direction={{ base: 'column', md: 'row' }} gap={8}>
  <Box />
  <Box />
</Stack>
```

### Flex
```tsx
import { Flex } from '@chakra-ui/react'

<Flex
  align="center"
  justify="space-between"
  gap={4}
  wrap="wrap"
/>
```

### Grid
```tsx
import { Grid, GridItem } from '@chakra-ui/react'

<Grid
  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
  gap={6}
>
  <GridItem />
  <GridItem />
</Grid>
```

### Image
```tsx
import { Image } from '@chakra-ui/react'

<Image
  src="/prof pic.png"
  alt="Profile"
  borderRadius="full"
  boxSize="120px"
  objectFit="cover"
/>
```

### Text & Heading
```tsx
import { Text, Heading } from '@chakra-ui/react'

<Heading as="h1" fontSize={{ base: '3xl', lg: '5xl' }} fontWeight="700" color="neutral.900">
  Hi, I'm Oleh
</Heading>

<Text fontSize="lg" fontWeight="300" color="neutral.500" maxW="600px">
  Subtitle or description text here.
</Text>
```

### Divider
```tsx
import { Separator } from '@chakra-ui/react'

<Separator borderColor="neutral.100" my={8} />
```

---

## 6. Layout Components

### Layout.tsx
```tsx
// src/components/layout/Layout.tsx
import { Box } from '@chakra-ui/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box
        as="main"
        flex={1}
        maxW="1320px"
        w="full"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={12}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
```

### Navbar.tsx
```tsx
// src/components/layout/Navbar.tsx
import { Box, Flex, Text, HStack } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Work',    href: '/work' },
  { label: 'Contact', href: '/contact' },
] as const

export function Navbar(): React.JSX.Element {
  const { pathname } = useLocation()

  return (
    <Box
      as="nav"
      bg="white"
      borderBottom="1px solid"
      borderColor="neutral.100"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex
        maxW="1320px"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={4}
        align="center"
        justify="space-between"
      >
        <Link to="/">
          <Text fontWeight="600" fontSize="lg" color="neutral.900" fontFamily="heading">
            Ralph
          </Text>
        </Link>

        {/* Desktop links */}
        <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} to={href}>
              <Text
                fontWeight="400"
                color={pathname === href ? 'brand.500' : 'neutral.900'}
                _hover={{ color: 'brand.500' }}
                transition="0.3s ease-out"
              >
                {label}
              </Text>
            </Link>
          ))}
        </HStack>
      </Flex>
    </Box>
  )
}
```

---

## 7. React Router v7 — Patterns

### Routes (App.tsx)
```tsx
// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage }    from '@/pages/HomePage'
import { AboutPage }   from '@/pages/AboutPage'
import { WorkPage }    from '@/pages/WorkPage'
import { ContactPage } from '@/pages/ContactPage'

export function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/"        element={<Layout><HomePage /></Layout>} />
      <Route path="/about"   element={<Layout><AboutPage /></Layout>} />
      <Route path="/work"    element={<Layout><WorkPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="*"        element={<Navigate to="/" replace />} />
    </Routes>
  )
}
```

### Navigation hooks
```tsx
import { useNavigate, useLocation, useParams } from 'react-router-dom'

// Programmatic navigation
const navigate = useNavigate()
navigate('/about')
navigate(-1) // back

// Current path
const { pathname } = useLocation()

// Route params (e.g. /work/:id)
const { id } = useParams<{ id: string }>()
```

### Link vs NavLink
```tsx
import { Link, NavLink } from 'react-router-dom'

// Basic link — use inside Chakra components
<Link to="/about">
  <Text>About</Text>
</Link>

// NavLink — has isActive state built-in
<NavLink to="/about" style={({ isActive }) => ({ color: isActive ? '#4353FF' : 'inherit' })}>
  About
</NavLink>
```

---

## 8. React 19 — New Patterns

### use() hook — for context (replaces useContext verbosity)
```tsx
import { use } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

export function MyComponent(): React.JSX.Element {
  const theme = use(ThemeContext) // cleaner than useContext
  return <Box color={theme.primary} />
}
```

### useActionState — form state management
```tsx
import { useActionState } from 'react'

async function submitContact(_prev: unknown, formData: FormData): Promise<string> {
  // handle submission
  return 'success'
}

export function ContactForm(): React.JSX.Element {
  const [state, action, isPending] = useActionState(submitContact, null)

  return (
    <Box as="form" action={action}>
      <input name="email" type="email" />
      <Button type="submit" loading={isPending}>Send</Button>
      {state === 'success' && <Text color="green.500">Sent!</Text>}
    </Box>
  )
}
```

### useOptimistic — optimistic UI updates
```tsx
import { useOptimistic } from 'react'

const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (current: number) => current + 1
)
```

### Ref as prop (React 19 — no more forwardRef)
```tsx
// React 19: ref is just a regular prop
interface InputProps {
  ref?: React.Ref<HTMLInputElement>
  placeholder?: string
}

export function Input({ ref, placeholder }: InputProps): React.JSX.Element {
  return <input ref={ref} placeholder={placeholder} />
}
```

### Transitions for non-urgent updates
```tsx
import { startTransition, useTransition } from 'react'

const [isPending, startTransition] = useTransition()

startTransition(() => {
  setFilter(newFilter) // non-urgent, won't block typing
})
```

---

## 9. TypeScript Patterns

### Strict prop typing
```tsx
// Union types for variants
type ButtonVariant = 'primary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: Size
  isLoading?: boolean
  onClick?: () => void
  children: React.ReactNode
}
```

### Generic components
```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>): React.JSX.Element {
  return (
    <VStack gap={4} align="stretch">
      {items.map(item => (
        <Box key={keyExtractor(item)}>{renderItem(item)}</Box>
      ))}
    </VStack>
  )
}
```

### Type-safe event handlers
```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setValue(e.target.value)
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault()
}
```

---

## 10. Custom Hooks

### useMediaQuery (responsive logic in JS)
```tsx
// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent): void => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Usage
const isDesktop = useMediaQuery('(min-width: 992px)')
```

### useScrollPosition
```tsx
// src/hooks/useScrollPosition.ts
import { useState, useEffect } from 'react'

export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState<number>(0)

  useEffect(() => {
    const handler = (): void => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return scrollY
}
```

---

## 11. Common Mistakes to Avoid

| Wrong | Right |
|---|---|
| `color="#4353FF"` | `color="brand.500"` |
| `export default function Foo` | `export function Foo` |
| `style={{ marginTop: 16 }}` | `mt={4}` |
| `useContext(ThemeCtx)` | `use(ThemeCtx)` (React 19) |
| `forwardRef(...)` | ref as plain prop (React 19) |
| `import './Foo.css'` | Chakra style props only |
| `fontSize="16px"` | `fontSize="md"` |
| Hardcoded breakpoints in JS | `useBreakpointValue` or responsive props |

---

## 12. Checklist Before Committing a Component

- [ ] Named export (not default)
- [ ] Props interface defined with explicit types
- [ ] Return type `React.JSX.Element` declared
- [ ] All colors via theme tokens
- [ ] Interactive elements have `transition="0.3s ease-out"`
- [ ] Responsive props used where layout varies by screen size
- [ ] No `any`, no `style={{}}`, no raw CSS
- [ ] Imports use `@/` alias
