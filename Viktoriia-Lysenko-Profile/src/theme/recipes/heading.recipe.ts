import { defineRecipe } from '@chakra-ui/react'

export const headingRecipe = defineRecipe({
  variants: {
    variant: {
      page: {
        fontSize: { base: '4xl', md: '5xl', lg: '6xl' },
        fontWeight: '300',
        lineHeight: '1.02',
        letterSpacing: '-0.04em',
        color: 'neutral.900',
      },
      section: {
        fontSize: { base: '2xl', lg: '3xl' },
        fontWeight: '400',
        letterSpacing: '-0.03em',
        color: 'neutral.900',
      },
      subSection: {
        fontSize: 'lg',
        fontWeight: '500',
        letterSpacing: '-0.02em',
        color: 'neutral.900',
      },
      label: {
        fontSize: 'sm',
        fontWeight: '500',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'neutral.500',
      },
    },
  },
  defaultVariants: {
    variant: 'section',
  },
})
