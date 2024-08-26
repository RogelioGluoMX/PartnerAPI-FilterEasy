import { TableColumnHeaderProps, Th } from '@chakra-ui/react'

export const ThFE = ({ children, ...rest }: TableColumnHeaderProps) => {
  return (
    <Th fontSize="0.875rem" textTransform="none" {...rest}>
      {children}
    </Th>
  )
}
