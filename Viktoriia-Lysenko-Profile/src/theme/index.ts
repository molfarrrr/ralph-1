import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { linkRecipe } from './recipes/link.recipe'
import { headingRecipe } from './recipes/heading.recipe'
import { iconButtonRecipe } from './recipes/iconButton.recipe'

const config = defineConfig({
  theme: {
    recipes: {
      link: linkRecipe,
      heading: headingRecipe,
      iconButton: iconButtonRecipe,
    },
    tokens: {
      colors: {
        brand: {
          50:  { value: '#f4eff8' },
          100: { value: '#e7dff1' },
          500: { value: '#ea7d6f' },
          700: { value: '#c85d50' },
        },
        neutral: {
          0:   { value: '#f6f1f9' },
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
