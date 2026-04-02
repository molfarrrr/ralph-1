import { defineRecipe } from '@chakra-ui/react'

export const linkRecipe = defineRecipe({
  variants: {
    variant: {
      default: {
        color: 'neutral.900',
        transition: '0.25s ease',
        _hover: { color: 'neutral.500' },
      },
      muted: {
        color: 'neutral.500',
        transition: '0.25s ease',
        _hover: { color: 'neutral.900' },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
