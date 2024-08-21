import { Box, Container, VStack } from '@chakra-ui/react'
import { type Filters, HeaderWithSearch, WavesFilters } from '@components'
import { useState } from 'react'

const defaultFilters: Filters = {
  fromDate: '',
  toDate: '',
  status: 'All',
  entriesPerPage: '50',
}

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
    <Container maxW="container.xl" pt={7}>
      <VStack align={'stretch'} spacing={6}>
        <HeaderWithSearch onSearch={handleOnSearch} />
        <WavesFilters
          defaultValues={defaultFilters}
          onFilter={handleOnFilter}
        />
        <Box>Table</Box>
        <Box>Pagination</Box>
      </VStack>
    </Container>
  )
}
