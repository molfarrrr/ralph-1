import { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Portal,
  chakra,
  useRecipe,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { Container, NavLink } from '@/components/ui'
import { linkRecipe } from '@/theme/recipes/link.recipe'

const NAV_LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'CV',      href: '/cv' },
  { label: 'Contact', href: '/contact' },
] as const

export function Navbar(): React.JSX.Element {
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const linkStyles = useRecipe({ recipe: linkRecipe })
  const wordmarkStyles = linkStyles({ variant: 'default' })

  useEffect((): (() => void) | void => {
    if (!drawerOpen) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return (): void => {
      document.body.style.overflow = overflow
    }
  }, [drawerOpen])

  return (
    <>
      <Box
        as="nav"
        w="full"
        bg="neutral.0"
        borderBottom="1px solid"
        borderColor="rgba(31, 31, 31, 0.08)"
        position="fixed"
        top={0}
        zIndex={100}
      >
        <Container
          as={Flex}
          py={5}
          align="center"
          justify="space-between"
        >
          {/* Wordmark */}
          <Link to="/" style={{ cursor: 'pointer' }}>
            <Text
              fontWeight="600"
              fontSize="lg"
              fontFamily="heading"
              css={wordmarkStyles}
            >
              Oleh Hladyshev
            </Text>
          </Link>

          {/* Desktop nav links */}
          <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={href} to={href} isActive={pathname === href} fontSize="sm">
                {label}
              </NavLink>
            ))}
          </HStack>

          {/* Hamburger icon (mobile only) */}
          <chakra.button
            type="button"
            display={{ base: 'flex', md: 'none' }}
            alignItems="center"
            justifyContent="center"
            position="relative"
            w="32px"
            h="32px"
            cursor="pointer"
            onClick={() => setDrawerOpen((open) => !open)}
            aria-label="Open menu"
            zIndex={201}
            _hover={{ opacity: 0.7 }}
            transition="opacity 0.25s ease"
          >
            <Box
              position="absolute"
              h="1.5px"
              w="24px"
              bg="neutral.900"
              transition="transform 0.25s ease, opacity 0.25s ease"
              transform={drawerOpen ? 'rotate(45deg)' : 'translateY(-6px)'}
            />
            <Box
              position="absolute"
              h="1.5px"
              w="24px"
              bg="neutral.900"
              transition="opacity 0.25s ease"
              opacity={drawerOpen ? 0 : 1}
            />
            <Box
              position="absolute"
              h="1.5px"
              w="24px"
              bg="neutral.900"
              transition="transform 0.25s ease, opacity 0.25s ease"
              transform={drawerOpen ? 'rotate(-45deg)' : 'translateY(6px)'}
            />
          </chakra.button>
        </Container>
      </Box>

      <Portal>
        <Box
          display={{ base: drawerOpen ? 'block' : 'none', md: 'none' }}
          position="fixed"
          inset={0}
          bg="neutral.0"
          zIndex={200}
          overflow="hidden"
        >
          <Flex justify="flex-end" px={5} pt={5}>
            <chakra.button
              type="button"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w="32px"
              h="32px"
              color="neutral.900"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              cursor="pointer"
              _hover={{ opacity: 0.7 }}
              transition="opacity 0.25s ease"
            >
              <Box position="relative" w="24px" h="24px" aria-hidden="true">
                <Box
                  position="absolute"
                  top="11px"
                  left="2px"
                  w="20px"
                  h="1.5px"
                  bg="neutral.900"
                  transform="rotate(45deg)"
                />
                <Box
                  position="absolute"
                  top="11px"
                  left="2px"
                  w="20px"
                  h="1.5px"
                  bg="neutral.900"
                  transform="rotate(-45deg)"
                />
              </Box>
            </chakra.button>
          </Flex>

          <Flex
            h="calc(100vh - 72px)"
            direction="column"
            justify="center"
            align="center"
            px={5}
            gap={8}
          >
            <VStack gap={8}>
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setDrawerOpen(false)}
                  style={{ cursor: 'pointer' }}
                >
                  <Text
                    fontSize="clamp(2rem, 9vw, 3.25rem)"
                    fontWeight={pathname === href ? '500' : '300'}
                    color="neutral.900"
                    fontFamily="heading"
                    letterSpacing="-0.03em"
                    textAlign="center"
                    pb="2px"
                    borderBottom={pathname === href ? '1px solid' : 'none'}
                    borderColor="neutral.900"
                    _hover={{ color: 'neutral.500' }}
                    transition="0.25s ease"
                  >
                    {label}
                  </Text>
                </Link>
              ))}
            </VStack>
          </Flex>
        </Box>
      </Portal>
    </>
  )
}
