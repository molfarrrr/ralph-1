import { Box, useRecipe } from '@chakra-ui/react'
import { headingRecipe } from '@/theme/recipes/heading.recipe'

interface EyebrowLabelProps {
  children: React.ReactNode
  mb?: number | string
}

export function EyebrowLabel({ children, mb }: EyebrowLabelProps): React.JSX.Element {
  const recipe = useRecipe({ recipe: headingRecipe })
  const styles = recipe({ variant: 'label' })
  return (
    <Box css={styles} mb={mb}>
      {children}
    </Box>
  )
}
