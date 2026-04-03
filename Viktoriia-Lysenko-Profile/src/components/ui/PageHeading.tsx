import { Box, useRecipe } from '@chakra-ui/react'
import { headingRecipe } from '@/theme/recipes/heading.recipe'

interface PageHeadingProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3'
  mb?: number | string
}

export function PageHeading({ children, as = 'h1', mb }: PageHeadingProps): React.JSX.Element {
  const recipe = useRecipe({ recipe: headingRecipe })
  const styles = recipe({ variant: 'page' })
  return (
    <Box as={as} css={styles} mb={mb}>
      {children}
    </Box>
  )
}
