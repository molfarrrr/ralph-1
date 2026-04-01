import { Box, Flex, Heading, Text, Image, chakra } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

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
            Product Designer &amp; Developer
          </Text>

          {/* H1 */}
          <Heading
            as="h1"
            fontFamily="heading"
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="200"
            lineHeight="1.1"
            color="neutral.900"
            mb={6}
          >
            Crafting digital<br />
            <Box as="span" fontWeight="300">
              experiences
            </Box>
          </Heading>

          {/* Supporting paragraph */}
          <Text
            fontFamily="body"
            fontSize={{ base: 'md', lg: 'lg' }}
            fontWeight="400"
            color="neutral.900"
            lineHeight="1.7"
            maxW="480px"
            mb={10}
          >
            I design and build thoughtful products that put people first.
            Based in Kyiv, open to remote opportunities worldwide.
          </Text>

          {/* CTA — minimal text/arrow treatment */}
          <ChakraLink
            to="/work"
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
            View my work
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
          />
        </Box>
      </Flex>
    </Box>
  )
}
