import { Box, Heading, Text } from '@chakra-ui/react'

export function WorkPage(): React.JSX.Element {
  return (
    <Box py={16}>
      <Heading as="h1" fontSize={{ base: '3xl', lg: '5xl' }} fontWeight="300" color="neutral.900" mb={6}>
        Work
      </Heading>
      <Text fontSize="lg" fontWeight="400" color="neutral.500" maxW="600px">
        This page is coming soon.
      </Text>
    </Box>
  )
}
