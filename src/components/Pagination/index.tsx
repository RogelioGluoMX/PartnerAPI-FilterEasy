import { HStack, IconButton } from '@chakra-ui/react'
import { PaginationButton, type PaginationButtonProps } from '@components'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { useCallback } from 'react'

export type PaginationProps = {
  currentPage: number
  entriesPerPage: number
  totalEntries: number
  onPageChange: PaginationButtonProps['onPageChange']
}

export const Pagination = ({
  currentPage,
  entriesPerPage,
  totalEntries,
  onPageChange,
}: PaginationProps) => {
  const maxButtons = 5
  const separators = 2
  const sideButtons = maxButtons - 1 // 1 separator on each side at the time
  const middleButtons = maxButtons - separators
  const separator = -1

  const totalPages = Math.floor(totalEntries / entriesPerPage) + 1

  const getRange = (count: number, startFrom = 1) =>
    Array.from({ length: count }, (_, index) => startFrom + index)

  const generatePageNumbers = useCallback(() => {
    if (totalPages <= maxButtons + separators) {
      return getRange(totalPages)
    }

    const pageNumbers = []

    // First button
    pageNumbers.push(...getRange(1, 1))

    // Left separator and side buttons
    if (currentPage >= sideButtons) pageNumbers.push(separator)

    if (currentPage < sideButtons) {
      pageNumbers.push(...getRange(sideButtons, 2))
    } else if (currentPage <= totalPages - sideButtons) {
      pageNumbers.push(...getRange(middleButtons, currentPage - 1))
    } else {
      pageNumbers.push(...getRange(sideButtons, totalPages - sideButtons))
    }

    // Right separator
    if (currentPage <= totalPages - sideButtons) pageNumbers.push(separator)

    // Last button
    pageNumbers.push(...getRange(1, totalPages))

    return pageNumbers
  }, [currentPage, middleButtons, sideButtons, totalPages, separator])

  const ButtonList = useCallback(() => {
    return generatePageNumbers().map((page, index) => (
      <PaginationButton
        key={index}
        isActive={currentPage === page}
        page={page}
        onPageChange={onPageChange}
      />
    ))
  }, [currentPage, generatePageNumbers, onPageChange])

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1)
  }

  const handleNextPage = () => {
    onPageChange(currentPage + 1)
  }

  return (
    <HStack justify="center" spacing={{ base: 1, md: 3 }}>
      <IconButton
        aria-label="Previous Page"
        variant="ghost"
        color="text"
        icon={<ChevronLeft />}
        onClick={handlePreviousPage}
        isDisabled={currentPage === 1}
      />

      <ButtonList />

      <IconButton
        aria-label="Next Page"
        variant="ghost"
        color="text"
        icon={<ChevronRight />}
        onClick={handleNextPage}
        isDisabled={currentPage === totalPages}
      />
    </HStack>
  )
}
