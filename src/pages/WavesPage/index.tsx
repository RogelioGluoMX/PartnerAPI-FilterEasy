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
  entriesPerPage: 50,
}

const waves = feWavesData as Wave[]
const entriesTotal = 353

type Params = {
  search: string
  filters: Filters
  page: number
}

export const WavesPage = () => {
  const [params, setParams] = useState<Params>({
    search: '',
    filters: defaultFilters,
    page: 1,
  })

  const updateParams = (newParams: Partial<typeof params>) => {
    setParams((prevParams) => {
      const updatedParams = { ...prevParams, ...newParams }

      const flattenedParams = {
        search: updatedParams.search,
        page: updatedParams.page,
        ...updatedParams.filters,
      }

      // send request with updated params
      console.log(JSON.stringify(flattenedParams))

      return updatedParams
    })
  }

  const handleSearch = (newSearch: string) => {
    updateParams({ search: newSearch, page: 1 })
  }

  const handleFilter = (newFilters: Filters) => {
    updateParams({ filters: newFilters, page: 1 })
  }

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage })
  }

  const totalPages =
    Math.floor(entriesTotal / +params.filters.entriesPerPage) + 1

  return (
    <Container maxW="container.xl" pt={7} pb={12}>
      <VStack align={'stretch'} spacing={6}>
        <HeaderWithSearch onSearch={handleSearch} />
        <WavesFilters
          defaultValues={defaultFilters}
          onFilter={handleFilter}
          stats={{ entriesTotal, page: params.page, wavesCount: waves.length }}
        />

        {waves.length > 0 ? (
          <VStack align="stretch" spacing={6}>
            <WavesTable waves={waves} />
            <Pagination
              totalPages={totalPages}
              currentPage={params.page}
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
