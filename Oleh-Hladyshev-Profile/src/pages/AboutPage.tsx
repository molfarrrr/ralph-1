import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Grid, Heading, HStack, Portal, Text, VStack, chakra } from '@chakra-ui/react'
import { PageHeading, SectionDivider } from '@/components/ui'

const VIEW_RESUME_URL = '/resume/resume_03_2026.html'

type ExperienceBullet = {
  id: string
  content: React.ReactNode
}

type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  bullets: ExperienceBullet[]
}

const EXPERIENCE = [
  {
    company: 'Behavox',
    role: 'Senior Front-End Engineer',
    period: 'Sep 2025 - Mar 2026',
    location: 'Toronto, Canada (Remote)',
    bullets: [
      {
        id: 'behavox-quantum',
        content: (
          <>
            Built and enhanced complex <strong>Angular</strong> and <strong>TypeScript</strong> web applications for the
            Quantum Surveillance platform.
          </>
        ),
      },
      {
        id: 'behavox-upgrades',
        content: 'Led framework upgrades and codebase modernization, removing legacy patterns and improving maintainability.',
      },
      {
        id: 'behavox-quality',
        content: 'Strengthened code quality through enhanced static analysis, linting, and engineering standards.',
      },
      {
        id: 'behavox-architecture',
        content: 'Owned system-level improvements, proactively resolving architectural and technical gaps.',
      },
      {
        id: 'behavox-japanese',
        content: 'Led full internationalization of the platform UI into Japanese, coordinating cross-functional delivery on schedule.',
      },
      {
        id: 'behavox-mosaic',
        content: (
          <>
            Contributed to the Mosaic Smart Data platform using <strong>React</strong>, <strong>TypeScript</strong>, and{' '}
            <strong>Chakra UI</strong>.
          </>
        ),
      },
      {
        id: 'behavox-claude',
        content: (
          <>
            Integrated <strong>Claude-based AI skills and agents</strong> as part of a company-wide AI-first development initiative.
          </>
        ),
      },
    ],
  },
  {
    company: 'MarshallZehr Group Inc.',
    role: 'Senior Software Developer',
    period: 'May 2022 - Feb 2025',
    location: 'Waterloo, Canada',
    bullets: [
      { id: 'mz-architecture', content: 'Defined product technical architecture and shaped the roadmap around practical delivery value.' },
      {
        id: 'mz-stack',
        content: (
          <>
            Built internal applications and services with <strong>C#</strong>, <strong>SQL</strong>, <strong>Angular</strong>,{' '}
            <strong>NgRx</strong>, <strong>Angular Material</strong>, <strong>SCSS</strong>, and <strong>Box SDK</strong>.
          </>
        ),
      },
      { id: 'mz-prototypes', content: 'Created prototypes, evaluated technical approaches, and mentored junior developers.' },
      { id: 'mz-process', content: 'Contributed across reviews, sprint planning, design sessions, and retrospectives.' },
    ],
  },
  {
    company: 'Barclays Investment Bank',
    role: 'Senior Software Engineer (VP)',
    period: 'Apr 2020 - Aug 2022',
    location: 'Prague, Czech Republic',
    bullets: [
      { id: 'barclays-leadership', content: 'Led a cross-functional team and handled planning, coordination, technical supervision, and hiring.' },
      { id: 'barclays-poc', content: 'Built proof-of-concepts and improved independent delivery processes for the team.' },
      {
        id: 'barclays-stack',
        content: (
          <>
            Delivered product features with <strong>TypeScript</strong>, <strong>C#</strong>, <strong>Angular</strong>,{' '}
            <strong>NgRx</strong>, <strong>RxJS</strong>, <strong>AG Grid</strong>, <strong>SCSS</strong>, and{' '}
            <strong>Angular Material</strong>.
          </>
        ),
      },
    ],
  },
  {
    company: 'EPAM Systems',
    role: 'Senior Frontend Software Engineer',
    period: 'Jul 2017 - Mar 2020',
    location: 'Prague, Czech Republic',
    bullets: [
      { id: 'epam-replatform', content: 'Worked on strategic re-platforming initiatives for Barclays Investment Bank.' },
      { id: 'epam-delivery', content: 'Owned requirement analysis, proof-of-concepts, feature delivery, and cross-team collaboration.' },
      {
        id: 'epam-teamcity',
        content: (
          <>
            Implemented and maintained <strong>TeamCity</strong> builds and delivery support processes.
          </>
        ),
      },
    ],
  },
  {
    company: 'CloudRoute',
    role: 'Software Engineer',
    period: 'Jul 2015 - Jun 2017',
    location: 'Kyiv, Ukraine',
    bullets: [
      { id: 'cloudroute-angularjs', content: 'Implemented the frontend part of applications using AngularJS.' },
      { id: 'cloudroute-mentoring', content: 'Provided AngularJS tutoring and hands-on guidance for the team.' },
      { id: 'cloudroute-planning', content: 'Handled requirements management and task estimation.' },
    ],
  },
  {
    company: 'Compellotech',
    role: 'Software Engineer',
    period: 'Feb 2013 - Jun 2015',
    location: 'Remote',
    bullets: [
      {
        id: 'compellotech-stack',
        content: (
          <>
            Developed applications using <strong>Silverlight</strong>, <strong>WPF</strong>, <strong>Knockout</strong>,{' '}
            <strong>AngularJS</strong>, <strong>C#</strong>, and <strong>MS SQL</strong>.
          </>
        ),
      },
    ],
  },
  {
    company: 'Volcano Ideas',
    role: 'Intern PHP Developer',
    period: 'Jan 2012 - Sep 2012',
    location: 'Ukraine',
    bullets: [
      {
        id: 'volcano-foundation',
        content: 'First professional software development role, focused on learning fast and building a foundation in delivery work.',
      },
    ],
  },
] satisfies readonly ExperienceItem[]

const SKILL_GROUPS = [
  ['Angular 19+', 'NgRx', 'React', 'Redux', 'TypeScript', 'JavaScript', 'Chakra UI', 'Angular Material'],
  ['C#', 'SQL', 'SCSS/CSS', 'HTML', 'AG Grid'],
  ['Claude Skills & Agents', 'AI-augmented Development', 'TeamCity', 'Octopus Deploy', 'Git'],
] as const

export function AboutPage(): React.JSX.Element {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const printFrameRef = useRef<HTMLIFrameElement | null>(null)

  useEffect((): (() => void) | void => {
    if (!isResumeOpen) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsResumeOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return (): void => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isResumeOpen])

  const handlePrint = (): void => {
    const resumeWindow = printFrameRef.current?.contentWindow

    if (!resumeWindow) return

    resumeWindow.focus()
    resumeWindow.print()
  }

  return (
    <>
      <Box py={{ base: 12, lg: 18 }}>
        <VStack align="stretch" gap={{ base: 10, lg: 14 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'flex-start', lg: 'flex-end' }}
          justify="space-between"
          gap={8}
        >
          <Box maxW="760px">
            <PageHeading mb={5}>
              Senior software developer with a strong frontend edge.
            </PageHeading>
            <Text
              fontSize={{ base: 'md', lg: 'lg' }}
              lineHeight="1.8"
              color="neutral.500"
              maxW="680px"
            >
              Senior software developer with 13+ years of experience across frontend and full-stack engineering,
              with a strong focus on complex business applications, long-lived enterprise systems, and product work
              that has to survive real operational pressure. I have led modernization efforts, built and scaled UI
              platforms with Angular, React, C#, and SQL, worked across architecture and delivery, and consistently
              improved code quality, team effectiveness, and maintainability in environments where the software
              actually matters.
            </Text>
          </Box>

          <HStack gap={3} flexWrap="wrap">
            <chakra.button
              type="button"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              bg="neutral.900"
              color="neutral.0"
              fontSize="sm"
              fontWeight="500"
              borderRadius="full"
              cursor="pointer"
              onClick={handlePrint}
              _hover={{ opacity: 0.82 }}
              transition="opacity 0.25s ease"
            >
              <chakra.svg w="16px" h="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" mr={2}>
                <path d="M7 9V4h10v5" />
                <path d="M6 18H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
                <path d="M7 14h10v6H7z" />
              </chakra.svg>
              Print
            </chakra.button>
            <chakra.button
              type="button"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              border="1px solid"
              borderColor="neutral.900"
              color="neutral.900"
              fontSize="sm"
              fontWeight="500"
              borderRadius="full"
              cursor="pointer"
              onClick={() => setIsResumeOpen(true)}
              _hover={{ bg: 'rgba(31, 31, 31, 0.04)' }}
              transition="0.25s ease"
            >
              <chakra.svg w="16px" h="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" mr={2}>
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                <circle cx="12" cy="12" r="3" />
              </chakra.svg>
              Preview
            </chakra.button>
          </HStack>
        </Flex>

        <Grid templateColumns={{ base: '1fr', lg: '1.7fr 1fr' }} gap={{ base: 8, lg: 12 }}>
          <VStack align="stretch" gap={8}>
            <SectionDivider>
              <Text fontSize={{ base: '2xl', lg: '3xl' }} fontWeight="400" color="neutral.900" letterSpacing="-0.03em" mb={5}>
                Experience
              </Text>
              <VStack align="stretch" gap={8}>
                {EXPERIENCE.map((item) => (
                  <Box key={`${item.company}-${item.period}`}>
                    <Flex
                      direction={{ base: 'column', md: 'row' }}
                      align={{ base: 'flex-start', md: 'baseline' }}
                      justify="space-between"
                      gap={2}
                      mb={3}
                    >
                      <Box>
                        <Heading as="h2" fontSize={{ base: 'xl', lg: '2xl' }} fontWeight="400" color="neutral.900">
                          {item.role}
                        </Heading>
                        <Text fontSize="md" color="neutral.500" mt={1}>
                          {item.company} · {item.location}
                        </Text>
                      </Box>
                      <Text fontSize="sm" color="neutral.500" whiteSpace="nowrap">
                        {item.period}
                      </Text>
                    </Flex>
                    <Box as="ul" pl={5} color="neutral.900">
                      {item.bullets.map((bullet) => (
                        <Text as="li" key={bullet.id} fontSize="md" lineHeight="1.8" mb={2}>
                          {bullet.content}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                ))}
              </VStack>
            </SectionDivider>
          </VStack>

          <VStack align="stretch" gap={8}>
            <SectionDivider>
              <Text fontSize="md" fontWeight="500" color="neutral.900" letterSpacing="-0.02em" mb={4}>
                Contact
              </Text>
              <VStack align="stretch" gap={2} color="neutral.900">
                <Text fontSize="md">Digby, Nova Scotia, Canada</Text>
                <chakra.a href="mailto:molfarr@gmail.com" _hover={{ color: 'neutral.500' }} transition="0.25s ease">
                  molfarr@gmail.com
                </chakra.a>
                <chakra.a href="tel:+12267538037" _hover={{ color: 'neutral.500' }} transition="0.25s ease">
                  +1 226 753 8037
                </chakra.a>
                <chakra.a
                  href="https://www.linkedin.com/in/oleg-gladyshev-profile/"
                  target="_blank"
                  rel="noreferrer"
                  _hover={{ color: 'neutral.500' }}
                  transition="0.25s ease"
                >
                  LinkedIn
                </chakra.a>
                <chakra.a
                  href="https://github.com/molfarrrr/"
                  target="_blank"
                  rel="noreferrer"
                  _hover={{ color: 'neutral.500' }}
                  transition="0.25s ease"
                >
                  GitHub
                </chakra.a>
              </VStack>
            </SectionDivider>

            <SectionDivider>
              <Text fontSize="md" fontWeight="500" color="neutral.900" letterSpacing="-0.02em" mb={4}>
                Education
              </Text>
              <Heading as="h2" fontSize="lg" fontWeight="500" color="neutral.900" mb={2}>
                Bachelor of Computer Science
              </Heading>
              <Text fontSize="md" color="neutral.500">
                Sevastopol National Technical University
              </Text>
              <Text fontSize="sm" color="neutral.500" mt={1}>
                2005 - 2011
              </Text>
            </SectionDivider>

            <Box borderTop="1px solid" borderColor="rgba(31, 31, 31, 0.12)" pt={6}>
              <Text fontSize="md" fontWeight="500" color="neutral.900" letterSpacing="-0.02em" mb={4}>
                Skills
              </Text>
              <VStack align="stretch" gap={4}>
                {SKILL_GROUPS.map((group) => (
                  <Flex key={group.join('-')} gap={2} wrap="wrap">
                    {group.map((skill) => (
                      <Box
                        key={skill}
                        px={3}
                        py={2}
                        borderRadius="full"
                        border="1px solid"
                        borderColor="rgba(31, 31, 31, 0.14)"
                        color="neutral.900"
                        fontSize="sm"
                      >
                        {skill}
                      </Box>
                    ))}
                  </Flex>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Grid>
        </VStack>
      </Box>

      <Portal>
        <Box
          display={isResumeOpen ? 'block' : 'none'}
          position="fixed"
          inset={0}
          bg="rgba(31, 31, 31, 0.55)"
          zIndex={300}
          onClick={() => setIsResumeOpen(false)}
        >
          <Flex align="center" justify="center" minH="100vh" p={{ base: 3, md: 6 }}>
            <Box
              w="min(1120px, 100%)"
              h={{ base: '88vh', md: '90vh' }}
              bg="neutral.0"
              borderRadius={{ base: '20px', md: '28px' }}
              overflow="hidden"
              boxShadow="0 20px 70px rgba(0, 0, 0, 0.18)"
              onClick={(event) => event.stopPropagation()}
            >
              <Flex align="center" justify="space-between" px={{ base: 4, md: 5 }} py={4} borderBottom="1px solid" borderColor="rgba(31, 31, 31, 0.1)">
                <Text fontSize="sm" fontWeight="500" color="neutral.900">
                  CV Preview
                </Text>
                <chakra.button
                  type="button"
                  w="36px"
                  h="36px"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  color="neutral.900"
                  cursor="pointer"
                  onClick={() => setIsResumeOpen(false)}
                  _hover={{ bg: 'rgba(31, 31, 31, 0.06)' }}
                  transition="0.25s ease"
                  aria-label="Close resume preview"
                >
                  <Box position="relative" w="18px" h="18px" aria-hidden="true">
                    <Box position="absolute" top="8px" left="0" w="18px" h="1.5px" bg="neutral.900" transform="rotate(45deg)" />
                    <Box position="absolute" top="8px" left="0" w="18px" h="1.5px" bg="neutral.900" transform="rotate(-45deg)" />
                  </Box>
                </chakra.button>
              </Flex>
              <iframe
                title="Exact HTML CV preview"
                src={VIEW_RESUME_URL}
                style={{
                  width: '100%',
                  height: 'calc(100% - 69px)',
                  border: 0,
                  background: '#fff',
                  display: 'block',
                }}
              />
            </Box>
          </Flex>
        </Box>
      </Portal>

      <iframe
        ref={printFrameRef}
        title="Hidden print frame"
        src={VIEW_RESUME_URL}
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          border: 0,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
