import { Box, type BoxProps } from '@chakra-ui/react'

interface ContainerProps extends BoxProps {
  children: React.ReactNode
  as?: React.ElementType
}

export function Container({ children, as, ...rest }: ContainerProps): React.JSX.Element {
  return (
    <Box
      as={as}
      maxW="1128px"
      mx="auto"
      px={{ base: 5, md: 8, xl: 0 }}
      {...rest}
    >
      {children}
    </Box>
  )
}
