import { useState } from 'react'
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerBody,
  DrawerCloseTrigger,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Work',    href: '/work' },
  { label: 'Contact', href: '/contact' },
] as const

export function Navbar(): React.JSX.Element {
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Box
        as="nav"
        w="full"
        bg="transparent"
        position="fixed"
        top={0}
        zIndex={100}
      >
        <Flex
          maxW={{ base: '95vw', lg: '85vw' }}
          mx="auto"
          py={5}
          align="center"
          justify="space-between"
        >
          {/* Wordmark */}
          <Link to="/">
            <Text
              fontWeight="600"
              fontSize="lg"
              color="neutral.900"
              fontFamily="heading"
              transition="0.25s ease"
              _hover={{ color: 'neutral.500' }}
            >
              Oleh Gladyshev
            </Text>
          </Link>

          {/* Desktop nav links */}
          <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} to={href}>
                <Text
                  color="neutral.900"
                  fontFamily="body"
                  fontSize="sm"
                  fontWeight="400"
                  _hover={{ color: 'neutral.500' }}
                  transition="0.25s ease"
                  pb="2px"
                  borderBottom={pathname === href ? '1px solid' : 'none'}
                  borderColor="neutral.900"
                >
                  {label}
                </Text>
              </Link>
            ))}
          </HStack>

          {/* Hamburger icon (mobile only) */}
          <Box
            display={{ base: 'flex', md: 'none' }}
            flexDirection="column"
            gap="5px"
            w="24px"
            cursor="pointer"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Box h="1.5px" w="full" bg="neutral.900" transition="0.25s ease" />
            <Box h="1.5px" w="full" bg="neutral.900" transition="0.25s ease" />
            <Box h="1.5px" w="full" bg="neutral.900" transition="0.25s ease" />
          </Box>
        </Flex>
      </Box>

      {/* Mobile drawer */}
      <DrawerRoot
        open={drawerOpen}
        onOpenChange={(e) => setDrawerOpen(e.open)}
        placement="end"
      >
        <DrawerBackdrop />
        <DrawerContent bg="neutral.0">
          <DrawerCloseTrigger />
          <DrawerBody>
            <VStack gap={6} align="flex-start" pt={12}>
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={href} to={href} onClick={() => setDrawerOpen(false)}>
                  <Text
                    fontSize="2xl"
                    fontWeight="300"
                    color="neutral.900"
                    fontFamily="heading"
                    _hover={{ color: 'neutral.500' }}
                    transition="0.25s ease"
                  >
                    {label}
                  </Text>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </>
  )
}
