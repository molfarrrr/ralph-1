import { Box } from '@chakra-ui/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="brand.50">
      <Navbar />
      <Box
        as="main"
        flex={1}
        w="full"
        maxW="85vw"
        mx="auto"
        px={{ base: 4, md: 6, lg: 0 }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
