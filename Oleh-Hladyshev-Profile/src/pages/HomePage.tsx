import { Box, Flex, Text, Image, chakra } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PageHeading } from '@/components/ui'

const ChakraLink = chakra(Link)
import profilePic from '@/assets/profile/prof-pic.png'

export function HomePage(): React.JSX.Element {
  return (
    <Box py={{ base: 12, lg: 20 }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'flex-start', lg: 'center' }}
        justify="space-between"
        gap={{ base: 10, lg: 16 }}
      >
        {/* Left: text content */}
        <Box flex={1} maxW={{ lg: '560px' }}>
          {/* Eyebrow */}
          <Text
            fontFamily="body"
            fontSize="sm"
            fontWeight="500"
            color="neutral.500"
            letterSpacing="0.1em"
            textTransform="uppercase"
            mb={5}
          >
            Angular, React, C#, SQL
          </Text>

          {/* H1 */}
          <PageHeading mb={6}>
            Senior web<br />
            <Box as="span" fontWeight="300">
              developer
            </Box>
          </PageHeading>

          {/* Supporting paragraph */}
          <Text
            fontFamily="body"
            fontSize={{ base: 'md', lg: 'lg' }}
            fontWeight="400"
            color="neutral.900"
            lineHeight="1.7"
            maxW="540px"
            mb={10}
          >
            I build enterprise web applications with Angular, React, C#, and SQL, with a track record in modernization, delivery, and long-lived systems.
          </Text>

          {/* CTA — minimal text/arrow treatment */}
          <ChakraLink
            to="/cv"
            display="inline-flex"
            alignItems="center"
            gap={2}
            fontFamily="body"
            fontSize="sm"
            fontWeight="500"
            color="neutral.900"
            borderBottom="1px solid"
            borderColor="neutral.900"
            pb="2px"
            _hover={{ color: 'neutral.500', borderColor: 'neutral.500' }}
            transition="0.25s ease"
          >
            View my CV
            <Box as="span" aria-hidden="true">→</Box>
          </ChakraLink>
        </Box>

        {/* Right: portrait */}
        <Box flexShrink={0}>
          <Image
            src={profilePic}
            alt="Profile portrait"
            borderRadius="full"
            boxSize={{ base: '200px', md: '260px', lg: '320px' }}
            objectFit="cover"
            objectPosition="center 12%"
          />
        </Box>
      </Flex>
    </Box>
  )
}
