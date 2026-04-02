import { Box } from '@chakra-ui/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/ui'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="neutral.0">
      <Navbar />
      <Container
        as="main"
        flex={1}
        w="full"
        pt={{ base: '72px', md: '76px' }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  )
}
