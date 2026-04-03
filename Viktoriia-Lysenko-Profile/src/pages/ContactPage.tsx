import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { PageHeading, SectionDivider, TextLink } from '@/components/ui'

export function ContactPage(): React.JSX.Element {
  return (
    <Box py={{ base: 12, lg: 18 }}>
      <VStack align="stretch" gap={{ base: 10, lg: 14 }}>
        <Box maxW="760px">
          <PageHeading mb={5}>
            Contact
          </PageHeading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} lineHeight="1.8" color="neutral.500" maxW="620px">
            Open to relevant software engineering opportunities, SaaS product work, and conversations around frontend
            and full-stack delivery.
          </Text>
        </Box>

        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 12 }}>
          <Box flex={1}>
            <SectionDivider>
              <Text fontSize={{ base: '2xl', lg: '3xl' }} fontWeight="400" color="neutral.900" letterSpacing="-0.03em" mb={5}>
                Reach out
              </Text>
              <VStack align="stretch" gap={4}>
                <TextLink
                  href="mailto:lysenkoviktory@gmail.com"
                  fontSize={{ base: 'lg', lg: 'xl' }}
                >
                  lysenkoviktory@gmail.com
                </TextLink>
                <Text fontSize="md" color="neutral.500">
                  Phone to be added
                </Text>
                <Text fontSize="md" color="neutral.500">
                  Digby, Nova Scotia, Canada
                </Text>
              </VStack>
            </SectionDivider>
          </Box>

          <Box flex={1}>
            <SectionDivider>
              <Text fontSize={{ base: '2xl', lg: '3xl' }} fontWeight="400" color="neutral.900" letterSpacing="-0.03em" mb={5}>
                Profiles
              </Text>
              <VStack align="stretch" gap={4}>
                <TextLink
                  href="https://www.linkedin.com/in/viktorylysenko/"
                  target="_blank"
                  rel="noreferrer"
                  fontSize={{ base: 'lg', lg: 'xl' }}
                >
                  LinkedIn
                </TextLink>
                <TextLink
                  href="https://github.com/viktory"
                  target="_blank"
                  rel="noreferrer"
                  fontSize={{ base: 'lg', lg: 'xl' }}
                >
                  GitHub
                </TextLink>
              </VStack>
            </SectionDivider>
          </Box>
        </Flex>
      </VStack>
    </Box>
  )
}
