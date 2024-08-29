import { Button, ButtonOptions, StyleProps } from '@chakra-ui/react'

export type PaginationButtonProps = {
  isActive: boolean
  page: number | string
  onPageChange: (page: number | string) => void
}

export const PaginationButton = ({
  isActive,
  page,
  onPageChange,
  ...rest
}: PaginationButtonProps & StyleProps & ButtonOptions) => {
  return (
    <Button
      size="sm"
      variant={isActive ? 'solid' : 'ghost'}
      color={isActive ? 'white' : 'text'}
      fontWeight={400}
      onClick={() => onPageChange(page)}
      {...rest}
    >
      {page}
    </Button>
  )
}
