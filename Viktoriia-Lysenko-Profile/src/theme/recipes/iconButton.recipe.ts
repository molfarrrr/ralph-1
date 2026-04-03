import { defineRecipe } from '@chakra-ui/react'

export const iconButtonRecipe = defineRecipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: '0.25s ease',
  },
  variants: {
    variant: {
      ghost: {
        _hover: { opacity: 0.7 },
      },
      solid: {
        bg: 'brand.500',
        color: 'neutral.0',
        px: '5',
        py: '3',
        borderRadius: 'full',
        _hover: { bg: 'brand.700' },
      },
      outline: {
        border: '1px solid',
        borderColor: 'neutral.900',
        color: 'neutral.900',
        px: '5',
        py: '3',
        borderRadius: 'full',
        _hover: { bg: 'rgba(31,31,31,0.04)' },
      },
      ghostRound: {
        w: '36px',
        h: '36px',
        borderRadius: 'full',
        _hover: { bg: 'rgba(31,31,31,0.06)' },
      },
    },
  },
  defaultVariants: {
    variant: 'ghost',
  },
})
