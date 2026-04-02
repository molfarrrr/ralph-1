import { Box, useRecipe } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { linkRecipe } from '@/theme/recipes/link.recipe'

interface NavLinkProps {
  to: string
  children: React.ReactNode
  isActive?: boolean
  fontSize?: string
  fontWeight?: string
}

export function NavLink({ to, children, isActive, fontSize, fontWeight }: NavLinkProps): React.JSX.Element {
  const recipe = useRecipe({ recipe: linkRecipe })
  const styles = recipe({ variant: 'default' })
  return (
    <Box
      as={Link}
      to={to}
      css={styles}
      fontSize={fontSize}
      fontWeight={isActive ? '500' : fontWeight}
      textDecoration={isActive ? 'underline' : undefined}
      textUnderlineOffset={isActive ? '3px' : undefined}
    >
      {children}
    </Box>
  )
}
