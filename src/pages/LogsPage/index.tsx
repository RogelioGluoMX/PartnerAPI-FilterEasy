import { Container, VStack } from '@chakra-ui/react'
import {
  type Filters,
  HeaderWithSearch,
  type Log,
  LogsTable,
  NoMatches,
  Pagination,
  SearchFilters,
} from '@components'
import { useFilterParams } from '@hooks'
import feLogsData from '../../data/fe-logs-data.json'

const defaultFilters: Filters = {
  fromDate: '',
  toDate: '',
  status: 'All',
  entriesPerPage: 50,
}

const logs = feLogsData as Log[]
const entriesTotal = 571

export const LogsPage = () => {
  const { params, onFilter, onPageChange, onSearch } = useFilterParams(
    defaultFilters,
    (flattenedParams) => {
      // Send request
      console.log(JSON.stringify(flattenedParams))
    }
  )

  return (
    <Container maxW="container.xl" pt={7} pb={12}>
      <VStack align={'stretch'} spacing={6}>
        <HeaderWithSearch title="Logs" onSearch={onSearch} />
        <SearchFilters
          type="logs"
          defaultValues={defaultFilters}
          onFilter={onFilter}
          stats={{ entriesTotal, page: params.page, wavesCount: logs.length }}
        />

        {logs.length > 0 ? (
          <>
            <LogsTable logs={logs} />
            <Pagination
              currentPage={params.page}
              entriesPerPage={params.filters.entriesPerPage}
              totalEntries={entriesTotal}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <NoMatches />
        )}
      </VStack>
    </Container>
  )
}
