import { Text } from '@chakra-ui/react'

export type Stats = {
  entriesTotal: number
  page: number
  wavesCount: number
}

export type StatsMessageProps = {
  entriesPerPage: number
  stats: Stats
}

export const StatsMessage = ({ entriesPerPage, stats }: StatsMessageProps) => {
  const rangeBottom = 1 + entriesPerPage * (stats.page - 1)
  const rangeTop = rangeBottom + stats.wavesCount - 1
  const totalEntries = stats.entriesTotal.toLocaleString()

  return (
    <Text>
      Showing <Text as="b">{rangeBottom}</Text> to{' '}
      <Text as="b">{rangeTop}</Text> of {totalEntries} entries
    </Text>
  )
}
