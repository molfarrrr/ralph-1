import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { linkRecipe } from './recipes/link.recipe'

const config = defineConfig({
  theme: {
    recipes: {
      link: linkRecipe,
    },
    tokens: {
      colors: {
        brand: {
          50:  { value: '#f2e9e9' },
          100: { value: '#e6ddd9' },
          700: { value: '#2d1640' },
        },
        neutral: {
          0:   { value: '#f4f2ee' },
          500: { value: '#737373' },
          900: { value: '#1f1f1f' },
        },
      },
      fonts: {
        body:    { value: 'Manrope, sans-serif' },
        heading: { value: 'Manrope, sans-serif' },
        mono:    { value: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
      },
      durations: {
        fast:       { value: '0.2s' },
        standard:   { value: '0.25s' },
        expressive: { value: '0.5s' },
      },
      easings: {
        fast:       { value: 'ease' },
        standard:   { value: 'ease' },
        expressive: { value: 'cubic-bezier(.23, 1, .32, 1)' },
      },
    },
  },
  globalCss: {
    body: {
      bg: 'neutral.0',
      color: 'neutral.900',
      fontFamily: 'body',
    },
  },
})

export const system = createSystem(defaultConfig, config)
