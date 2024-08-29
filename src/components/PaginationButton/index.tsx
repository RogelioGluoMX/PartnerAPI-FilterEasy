import { Button } from '@chakra-ui/react'

export type PaginationButtonProps = {
  isActive: boolean
  page: number
  onPageChange: (page: number) => void
}

export const PaginationButton = ({
  isActive,
  page,
  onPageChange,
}: PaginationButtonProps) => {
  const isSeparator = page === -1

  return (
    <Button
      size="sm"
      variant={isActive ? 'solid' : 'ghost'}
      fontWeight={400}
      onClick={() => onPageChange(page)}
      isDisabled={isSeparator}
    >
      {!isSeparator ? page : '...'}
    </Button>
  )
}
