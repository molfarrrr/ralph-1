import { Box } from '@chakra-ui/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="neutral.0">
      <Navbar />
      <Box
        as="main"
        flex={1}
        w="full"
        maxW="1128px"
        mx="auto"
        px={{ base: 5, md: 8, xl: 0 }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
