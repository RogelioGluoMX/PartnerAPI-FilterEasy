import {
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { type Wave } from '@components'
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined'
import { FormEvent, useState } from 'react'

interface FiltersFormElements extends HTMLFormControlsCollection {
  fromDate: HTMLInputElement
  toDate: HTMLInputElement
  status: HTMLInputElement
  entriesPerPage: HTMLInputElement
}

interface FiltersForm extends HTMLFormElement {
  readonly elements: FiltersFormElements
}

export type Filters = {
  fromDate: string
  toDate: string
  status: Wave['status']
  entriesPerPage: number
}

export type Stats = {
  entriesTotal: number
  page: number
  wavesCount: number
}

export type WavesFiltersProps = {
  defaultValues: Filters
  stats: Stats
  onFilter: (filters: Filters) => void
}

export const WavesFilters = ({
  defaultValues,
  stats,
  onFilter,
}: WavesFiltersProps) => {
  const [isFiltersSectionOpen, setIsFiltersSectionOpen] = useState(false)
  const { fromDate, toDate, status, entriesPerPage } = defaultValues

  const toggleFiltersSection = () => {
    setIsFiltersSectionOpen((prevState) => !prevState)
  }

  const handleFiltersSubmit = (event: FormEvent<FiltersForm>) => {
    event.preventDefault()
    const form = event.currentTarget
    const { fromDate, toDate, status, entriesPerPage } = form.elements

    onFilter({
      fromDate: fromDate.value,
      toDate: toDate.value,
      status: status.value as Filters['status'],
      entriesPerPage: +entriesPerPage.value,
    })
  }

  const handleFiltersClearAll = () => {
    onFilter(defaultValues)
  }

  const rangeBottom = 1 + Number(entriesPerPage) * (stats.page - 1)
  const rangeTop = rangeBottom + stats.wavesCount - 1
  const totalEntries = stats.entriesTotal.toLocaleString()

  return (
    <form onSubmit={handleFiltersSubmit}>
      {/* Toggle and Results */}
      <Flex justify="space-between">
        <Button
          variant="ghost"
          fontFamily="urbana"
          fontSize={20}
          color="secondary.500"
          rightIcon={<FilterAltOutlined fontSize="small" />}
          textDecoration={'underline'}
          onClick={toggleFiltersSection}
        >
          {isFiltersSectionOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
        {!!stats.wavesCount && (
          <Text>
            Showing <Text as="b">{rangeBottom}</Text> to{' '}
            <Text as="b">{rangeTop}</Text> of {totalEntries} entries
          </Text>
        )}
      </Flex>

      <Collapse in={isFiltersSectionOpen}>
        <VStack align="stretch" spacing={4} overflow="hidden" pt={4}>
          {/* Fields */}
          <Flex columnGap={5}>
            <FormControl>
              <FormLabel>From</FormLabel>
              <Input
                type="date"
                name="fromDate"
                bg="white"
                defaultValue={fromDate}
              />
            </FormControl>
            <FormControl>
              <FormLabel>To</FormLabel>
              <Input
                type="date"
                name="toDate"
                bg="white"
                defaultValue={toDate}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select name="status" bg="white" defaultValue={status}>
                <option>All</option>
                <option>Available</option>
                <option>Downloaded</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Show per page</FormLabel>
              <Select
                name="entriesPerPage"
                bg="white"
                defaultValue={entriesPerPage}
              >
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </Select>
            </FormControl>
          </Flex>
          {/* Actions */}
          <Flex justify="flex-end" columnGap={10}>
            <Button
              type="reset"
              variant="ghost"
              color="text"
              textDecoration={'underline'}
              onClick={handleFiltersClearAll}
            >
              Clear All
            </Button>
            <Button type="submit">Apply Filters</Button>
          </Flex>
        </VStack>
      </Collapse>
    </form>
  )
}
