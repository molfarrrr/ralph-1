import { chakra, useRecipe } from '@chakra-ui/react'
import { linkRecipe } from '@/theme/recipes/link.recipe'

interface TextLinkProps extends React.ComponentProps<typeof chakra.a> {
  variant?: 'default' | 'muted'
}

export function TextLink({
  variant = 'default',
  children,
  ...rest
}: TextLinkProps): React.JSX.Element {
  const recipe = useRecipe({ recipe: linkRecipe })
  const styles = recipe({ variant })

  return (
    <chakra.a css={styles} {...rest}>
      {children}
    </chakra.a>
  )
}
