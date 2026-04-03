import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Grid, Heading, HStack, Portal, Text, VStack, chakra, useRecipe } from '@chakra-ui/react'
import { PageHeading, SectionDivider, TextLink } from '@/components/ui'
import { iconButtonRecipe } from '@/theme/recipes/iconButton.recipe'

const VIEW_RESUME_URL = new URL('resume/resume_print.html', import.meta.env.BASE_URL).toString()

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
    company: 'Medallia',
    role: 'Senior Software Engineer, Front End',
    period: 'Apr 2023 - Present',
    location: 'Waterloo, Ontario, Canada · Remote',
    bullets: [
      { id: 'medallia-ca-features', content: 'Improving existing and developing new features for a SaaS experience management platform.' },
      { id: 'medallia-ca-collab', content: 'Developing and extending features in cooperation with PMs, designers, customer support, and other teams.' },
      { id: 'medallia-ca-oncall', content: 'Participating in regular on-call rotations and investigating production issues.' },
      { id: 'medallia-ca-dx', content: 'Improving development experience by automating routine tasks and raising test and TypeScript coverage.' },
      { id: 'medallia-ca-support', content: 'Monitoring platform stability, acting as T3 technical support, and mentoring junior and new-coming developers.' },
      {
        id: 'medallia-ca-tech',
        content: (
          <>
            Technologies: <strong>React</strong>, <strong>TypeScript</strong>, <strong>GraphQL</strong>, <strong>Apollo</strong>, <strong>HTML</strong>, <strong>Jest</strong>.
          </>
        ),
      },
    ],
  },
  {
    company: 'Medallia',
    role: 'Senior Software Engineer, Front End',
    period: 'Jun 2020 - Mar 2023',
    location: 'Prague, Czechia',
    bullets: [
      { id: 'medallia-cz-features', content: 'Improving existing and developing new features for a SaaS experience management platform.' },
      { id: 'medallia-cz-collab', content: 'Developing and extending features in cooperation with PMs, designers, customer support, and other teams.' },
      { id: 'medallia-cz-oncall', content: 'Participating in regular on-call rotations, investigating production issues, and improving day-to-day development workflows.' },
      { id: 'medallia-cz-hiring', content: 'Participating in hackathons and hiring events while mentoring junior and new-coming developers.' },
      {
        id: 'medallia-cz-tech',
        content: (
          <>
            Technologies: <strong>React</strong>, <strong>TypeScript</strong>, <strong>GraphQL</strong>, <strong>Apollo</strong>, <strong>HTML</strong>, <strong>Jest</strong>.
          </>
        ),
      },
    ],
  },
  {
    company: 'Daytrip',
    role: 'Full Stack Web Developer',
    period: 'Jun 2019 - Apr 2020',
    location: 'Prague Metropolitan Area',
    bullets: [
      { id: 'daytrip-product', content: 'Developed and maintained back office tooling and the client website for a mobility service provider.' },
      { id: 'daytrip-planning', content: 'Helped prepare business requirements, planning, and demo events.' },
      { id: 'daytrip-site', content: 'Designed and developed the client website based on GraphQL and React.' },
      { id: 'daytrip-apis', content: 'Optimized logistic algorithms, integrated third-party APIs, and improved refactoring and test coverage.' },
      {
        id: 'daytrip-tech',
        content: (
          <>
            Technologies: <strong>React</strong>, <strong>Node.js</strong>, <strong>GraphQL</strong>, <strong>Apollo</strong>, <strong>MobX</strong>, <strong>MongoDB</strong>, <strong>TypeScript</strong>, <strong>HTML</strong>.
          </>
        ),
      },
    ],
  },
  {
    company: 'Relocation',
    role: 'Career Break',
    period: 'Mar 2018 - May 2019',
    location: 'Prague, Czechia',
    bullets: [
      { id: 'relocation-note', content: 'Career break during relocation to Prague.' },
    ],
  },
  {
    company: 'HelpCrunch',
    role: 'Senior Full-stack Developer',
    period: 'Oct 2016 - Feb 2018',
    location: 'Kyiv, Ukraine',
    bullets: [
      { id: 'hc-platform', content: 'Built a customer communication platform in a fast-moving startup environment.' },
      { id: 'hc-requirements', content: 'Analyzed business needs, created and estimated requirements, and reviewed and refactored code.' },
      { id: 'hc-sdk', content: 'Developed and optimized the JavaScript SDK for real-time chat and the APIs used by it.' },
      { id: 'hc-integrations', content: 'Integrated third-party services including MailGun, Stripe, Slack, emailing flows, and payment logic.' },
      { id: 'hc-admin', content: 'Created the administration panel, improved search based on lexical analysis, and developed Node.js microservices.' },
      {
        id: 'hc-tech',
        content: (
          <>
            Technologies: <strong>PHP 7</strong>, <strong>Symfony components</strong>, <strong>Doctrine2</strong>, <strong>MySQL</strong>, <strong>AngularJS</strong>, <strong>React</strong>, <strong>Node.js</strong>, <strong>HTML</strong>, <strong>CSS</strong>, <strong>Composer</strong>, <strong>Elasticsearch</strong>.
          </>
        ),
      },
    ],
  },
  {
    company: 'Freelance',
    role: 'Software Engineer (Self Employed)',
    period: 'Mar 2014 - Sep 2016',
    location: 'Remote',
    bullets: [
      { id: 'freelance-overview', content: 'Worked remotely with different clients on a feature-based contractor basis.' },
      { id: 'freelance-backend', content: 'Developed backend features using PHP with Yii2 and Symfony, as well as Node.js services.' },
      { id: 'freelance-frontend', content: 'Built frontend features with JavaScript, jQuery, Twitter Bootstrap, AngularJS, and React.' },
      { id: 'freelance-testing', content: 'Wrote unit tests and maintained and fixed existing features across both backend and frontend code.' },
      {
        id: 'freelance-tech',
        content: (
          <>
            Technologies: <strong>PHP</strong>, <strong>Yii</strong>, <strong>Symfony components</strong>, <strong>Doctrine2</strong>, <strong>MySQL</strong>, <strong>PostgreSQL</strong>, <strong>JavaScript</strong>, <strong>jQuery</strong>, <strong>AngularJS</strong>, <strong>React</strong>, <strong>Node.js</strong>, <strong>HTML</strong>, <strong>CSS</strong>, <strong>Elasticsearch</strong>, <strong>Twitter Bootstrap</strong>.
          </>
        ),
      },
    ],
  },
  {
    company: 'SoftServe',
    role: 'WebUI developer',
    period: 'Mar 2013 - Nov 2013',
    location: 'Sevastopol',
    bullets: [
      { id: 'softserve-ui', content: 'Created UI for mobile and desktop applications and built backend features using server-side JavaScript.' },
      { id: 'softserve-team', content: 'Worked in Scrum teams of 5-6 people, integrated with backend teams, and took part in demos.' },
      { id: 'softserve-coaching', content: 'Wrote unit tests, coached team members, and led junior developers.' },
      {
        id: 'softserve-tech',
        content: (
          <>
            Technologies: <strong>Node.js</strong>, <strong>Meteor</strong>, <strong>UnderscoreJS</strong>, <strong>BackboneJS</strong>, <strong>MongoDB</strong>, <strong>HTML</strong>, <strong>CSS</strong>, <strong>Less</strong>, <strong>Sass</strong>, <strong>Twitter Bootstrap</strong>, <strong>Handlebars</strong>, <strong>qUnit</strong>, <strong>Jasmine</strong>.
          </>
        ),
      },
    ],
  },
  {
    company: 'greenice.net',
    role: 'PHP developer',
    period: 'Aug 2011 - Feb 2013',
    location: 'Sevastopol',
    bullets: [
      { id: 'greenice-dev', content: 'Developed and maintained frontend and backend parts of web applications.' },
      { id: 'greenice-legacy', content: 'Implemented new functionality, updated existing solutions to match new requirements, and refactored legacy code.' },
      { id: 'greenice-collab', content: 'Worked directly with project owners to analyze requirements and shipped features in teams of 2-4 people.' },
      {
        id: 'greenice-tech',
        content: (
          <>
            Technologies: <strong>Yii</strong>, <strong>ZF1</strong>, <strong>MySQL</strong>, <strong>JavaScript</strong>, <strong>jQuery</strong>, <strong>jQuery UI</strong>, <strong>ExtJS</strong>, <strong>HTML</strong>, <strong>CSS</strong>, <strong>Sphinx</strong>, <strong>Smarty</strong>, <strong>Memcache</strong>, <strong>Redis</strong>, <strong>RabbitMQ</strong>.
          </>
        ),
      },
    ],
  },
] satisfies readonly ExperienceItem[]

const SKILL_GROUPS = [
  ['React', 'TypeScript', 'GraphQL', 'Apollo', 'AngularJS', 'JavaScript', 'HTML', 'CSS'],
  ['Node.js', 'PHP', 'Symfony', 'Yii', 'MySQL', 'PostgreSQL', 'MongoDB', 'Doctrine2'],
  ['MobX', 'Jest', 'Jasmine', 'qUnit', 'Meteor', 'BackboneJS', 'Redis', 'RabbitMQ'],
] as const

export function AboutPage(): React.JSX.Element {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const printFrameRef = useRef<HTMLIFrameElement | null>(null)
  const iconBtn = useRecipe({ recipe: iconButtonRecipe })
  const solidStyles = iconBtn({ variant: 'solid' })
  const outlineStyles = iconBtn({ variant: 'outline' })
  const ghostRoundStyles = iconBtn({ variant: 'ghostRound' })

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
                Senior software engineer focused on SaaS product delivery.
              </PageHeading>
              <Text
                fontSize={{ base: 'md', lg: 'lg' }}
                lineHeight="1.8"
                color="neutral.500"
                maxW="680px"
              >
                Fifteen years across frontend and full-stack product engineering, spanning SaaS platforms, customer-facing
                product teams, and practical delivery work with React, TypeScript, PHP, GraphQL, and Node.js.
              </Text>
            </Box>

            <HStack gap={3} flexWrap="wrap">
              <chakra.button
                type="button"
                fontSize="sm"
                fontWeight="500"
                onClick={handlePrint}
                css={solidStyles}
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
                fontSize="sm"
                fontWeight="500"
                onClick={() => setIsResumeOpen(true)}
                css={outlineStyles}
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
                  <TextLink href="mailto:lysenkoviktory@gmail.com">
                    lysenkoviktory@gmail.com
                  </TextLink>
                  <Text fontSize="md" color="neutral.500">
                    Phone to be added
                  </Text>
                  <TextLink
                    href="https://www.linkedin.com/in/viktorylysenko/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </TextLink>
                  <TextLink
                    href="https://github.com/viktory"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </TextLink>
                </VStack>
              </SectionDivider>

              <SectionDivider>
                <Text fontSize="md" fontWeight="500" color="neutral.900" letterSpacing="-0.02em" mb={4}>
                  Education
                </Text>
                <Heading as="h2" fontSize="lg" fontWeight="500" color="neutral.900" mb={2}>
                  Master of Computer Science
                </Heading>
                <Text fontSize="md" color="neutral.500">
                  Sevastopol National Technical University
                </Text>
                <Text fontSize="sm" color="neutral.500" mt={1}>
                  2007 - 2012
                </Text>
              </SectionDivider>

              <SectionDivider>
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
              </SectionDivider>
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
                  color="neutral.900"
                  onClick={() => setIsResumeOpen(false)}
                  css={ghostRoundStyles}
                  aria-label="Close resume preview"
                >
                  <Box position="relative" w="18px" h="18px" aria-hidden="true">
                    <Box position="absolute" top="8px" left="0" w="18px" h="1.5px" bg="neutral.900" transform="rotate(45deg)" />
                    <Box position="absolute" top="8px" left="0" w="18px" h="1.5px" bg="neutral.900" transform="rotate(-45deg)" />
                  </Box>
                </chakra.button>
              </Flex>
              <iframe
                title="Printable CV preview"
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
