import {
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { FiltersHeader, Stats, type Wave } from '@components'
import { FormEvent } from 'react'

interface FiltersFormElements extends HTMLFormControlsCollection {
  fromDate: HTMLInputElement
  toDate: HTMLInputElement
  status?: HTMLInputElement
  entriesPerPage: HTMLInputElement
}

interface FiltersForm extends HTMLFormElement {
  readonly elements: FiltersFormElements
}

export type Filters = {
  fromDate: string
  toDate: string
  status?: Wave['status']
  entriesPerPage: number
}

export type SearchFiltersProps = {
  defaultValues: Filters
  stats: Stats
  type: 'logs' | 'waves'
  onFilter: (filters: Filters) => void
}

export const SearchFilters = ({
  defaultValues,
  stats,
  type,
  onFilter,
}: SearchFiltersProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const { fromDate, toDate, status, entriesPerPage } = defaultValues

  const handleFiltersSubmit = (event: FormEvent<FiltersForm>) => {
    event.preventDefault()
    const form = event.currentTarget
    const { fromDate, toDate, status, entriesPerPage } = form.elements

    onFilter({
      fromDate: fromDate.value,
      toDate: toDate.value,
      status: status?.value as Filters['status'],
      entriesPerPage: +entriesPerPage.value,
    })
  }

  const handleFiltersClearAll = () => {
    onFilter(defaultValues)
  }

  const isWaves = type === 'waves'

  return (
    <form onSubmit={handleFiltersSubmit}>
      {/* Toggle and Results */}
      <FiltersHeader
        isOpen={isOpen}
        onToggle={onToggle}
        stats={stats}
        entriesPerPage={+entriesPerPage}
      />

      <Collapse in={isOpen}>
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

            {isWaves && (
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select name="status" bg="white" defaultValue={status}>
                  <option>All</option>
                  <option>Available</option>
                  <option>Downloaded</option>
                </Select>
              </FormControl>
            )}

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
