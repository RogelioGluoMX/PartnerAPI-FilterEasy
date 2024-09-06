import { Button, Flex } from '@chakra-ui/react'
import { StatsMessage, type Stats } from '@components'
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined'

export type FiltersHeaderProps = {
  entriesPerPage: number
  isOpen: boolean
  stats: Stats
  onToggle: () => void
}

export const FiltersHeader = ({
  entriesPerPage,
  isOpen,
  stats,
  onToggle,
}: FiltersHeaderProps) => {
  return (
    <Flex justify="space-between">
      <Button
        variant="ghostBlueAlt"
        fontSize={20}
        rightIcon={<FilterAltOutlined fontSize="small" />}
        onClick={onToggle}
      >
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </Button>
      {!!stats.wavesCount && (
        <StatsMessage entriesPerPage={entriesPerPage} stats={stats} />
      )}
    </Flex>
  )
}
