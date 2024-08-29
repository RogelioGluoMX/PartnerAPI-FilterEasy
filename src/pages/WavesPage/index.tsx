import { Container, VStack } from '@chakra-ui/react'
import {
  type Filters,
  HeaderWithSearch,
  NoMatches,
  Pagination,
  type Wave,
  WavesFilters,
  WavesTable,
} from '@components'
import { useState } from 'react'
import feWavesData from '../../data/fe-waves-data.json'

const defaultFilters: Filters = {
  fromDate: '',
  toDate: '',
  status: 'All',
  entriesPerPage: '50',
}

const waves = feWavesData as Wave[]
const entriesTotal = 353

export const WavesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [page, setPage] = useState<number | string>(1)

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery)
    const params = { search: newQuery, ...filters, page }
    console.log(params)
  }

  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters)
    const params = { search: searchQuery, ...newFilters, page }
    console.log(params)
  }

  const handlePageChange = (newPage: number | string) => {
    setPage(newPage)
    const params = { search: searchQuery, ...filters, page: newPage }
    console.log(params)
  }

  const totalPages = Math.floor(entriesTotal / +filters.entriesPerPage) + 1

  return (
    <Container maxW="container.xl" pt={7} pb={12}>
      <VStack align={'stretch'} spacing={6}>
        <HeaderWithSearch onSearch={handleSearch} />
        <WavesFilters
          defaultValues={defaultFilters}
          onFilter={handleFilter}
          stats={{ entriesTotal, page: +page, wavesCount: waves.length }}
        />

        {waves.length > 0 ? (
          <VStack align="stretch" spacing={6}>
            <WavesTable waves={waves} />
            <Pagination
              totalPages={totalPages}
              currentPage={+page}
              onPageChange={handlePageChange}
            />
          </VStack>
        ) : (
          <NoMatches />
        )}
      </VStack>
    </Container>
  )
}
