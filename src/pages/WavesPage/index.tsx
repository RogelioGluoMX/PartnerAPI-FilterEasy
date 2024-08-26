import { Container, VStack } from '@chakra-ui/react'
import {
  type Filters,
  HeaderWithSearch,
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

export const WavesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const handleOnSearch = (newQuery: string) => {
    setSearchQuery(newQuery)
    const params = { search: newQuery, ...filters }
    console.log(params)
  }

  const handleOnFilter = (newFilters: Filters) => {
    setFilters(newFilters)
    const params = { search: searchQuery, ...newFilters }
    console.log(params)
  }

  return (
    <Container maxW="container.xl" pt={7} pb={12}>
      <VStack align={'stretch'} spacing={6}>
        <HeaderWithSearch onSearch={handleOnSearch} />
        <WavesFilters
          defaultValues={defaultFilters}
          onFilter={handleOnFilter}
          stats={{ entriesTotal: 59120, page: 1, wavesCount: waves.length }}
        />
        <WavesTable waves={waves} />
      </VStack>
    </Container>
  )
}
