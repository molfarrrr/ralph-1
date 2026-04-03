import { Box, Flex, Text, VStack, chakra } from '@chakra-ui/react'
import { PageHeading, SectionDivider } from '@/components/ui'

export function ContactPage(): React.JSX.Element {
  return (
    <Box py={{ base: 12, lg: 18 }}>
      <VStack align="stretch" gap={{ base: 10, lg: 14 }}>
        <Box maxW="760px">
          <PageHeading mb={5}>
            Contact
          </PageHeading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} lineHeight="1.8" color="neutral.500" maxW="620px">
            Open to relevant product and engineering conversations, especially around frontend-heavy systems,
            modernization work, and senior individual contributor roles.
          </Text>
        </Box>

        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 12 }}>
          <Box flex={1}>
            <SectionDivider>
              <Text fontSize={{ base: '2xl', lg: '3xl' }} fontWeight="400" color="neutral.900" letterSpacing="-0.03em" mb={5}>
                Reach out
              </Text>
              <VStack align="stretch" gap={4}>
                <chakra.a
                  href="mailto:molfarr@gmail.com"
                  fontSize={{ base: 'lg', lg: 'xl' }}
                  color="neutral.900"
                  _hover={{ color: 'neutral.500' }}
                  transition="0.25s ease"
                >
                  molfarr@gmail.com
                </chakra.a>
                <chakra.a
                  href="tel:+12267538037"
                  fontSize={{ base: 'lg', lg: 'xl' }}
                  color="neutral.900"
                  _hover={{ color: 'neutral.500' }}
                  transition="0.25s ease"
                >
                  +1 226 753 8037
                </chakra.a>
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
                <chakra.a
                  href="https://www.linkedin.com/in/oleg-gladyshev-profile/"
                  target="_blank"
                  rel="noreferrer"
                  fontSize={{ base: 'lg', lg: 'xl' }}
                  color="neutral.900"
                  _hover={{ color: 'neutral.500' }}
                  transition="0.25s ease"
                >
                  LinkedIn
                </chakra.a>
                <chakra.a
                  href="https://github.com/molfarrrr/"
                  target="_blank"
                  rel="noreferrer"
                  fontSize={{ base: 'lg', lg: 'xl' }}
                  color="neutral.900"
                  _hover={{ color: 'neutral.500' }}
                  transition="0.25s ease"
                >
                  GitHub
                </chakra.a>
              </VStack>
            </SectionDivider>
          </Box>
        </Flex>
      </VStack>
    </Box>
  )
}
