import { Box, Text } from '@chakra-ui/react'
import { PageHeading } from '@/components/ui'

export function WorkPage(): React.JSX.Element {
  return (
    <Box py={16}>
      <PageHeading mb={6}>
        Work
      </PageHeading>
      <Text fontSize="lg" fontWeight="400" color="neutral.500" maxW="600px">
        This page is coming soon.
      </Text>
    </Box>
  )
}
