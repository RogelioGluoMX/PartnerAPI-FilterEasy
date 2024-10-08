import { Container, VStack } from '@chakra-ui/react'
import {
  type Filters,
  HeaderWithSearch,
  NoMatches,
  Pagination,
  SearchFilters,
  type Wave,
  WavesTable,
} from '@components'
import { useFilterParams } from '@hooks'
import feWavesData from '../../data/fe-waves-data.json'

const defaultFilters: Filters = {
  fromDate: '',
  toDate: '',
  status: 'All',
  entriesPerPage: 50,
}

const waves = feWavesData as Wave[]
const entriesTotal = 353

export const WavesPage = () => {
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
        <HeaderWithSearch title="Waves" onSearch={onSearch} />
        <SearchFilters
          type="waves"
          defaultValues={defaultFilters}
          onFilter={onFilter}
          stats={{ entriesTotal, page: params.page, wavesCount: waves.length }}
        />

        {waves.length > 0 ? (
          <>
            <WavesTable waves={waves} />
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
