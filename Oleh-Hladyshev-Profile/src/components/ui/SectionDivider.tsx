import { Box } from '@chakra-ui/react'

interface SectionDividerProps {
  children: React.ReactNode
  pt?: number
}

export function SectionDivider({ children, pt }: SectionDividerProps): React.JSX.Element {
  return (
    <Box
      borderTop="1px solid"
      borderColor="rgba(31,31,31,0.12)"
      pt={pt ?? 6}
    >
      {children}
    </Box>
  )
}
