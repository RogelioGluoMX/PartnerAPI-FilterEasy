import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
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

const statusList = ['All', 'Available', 'Downloaded'] as const
const entriesList = ['50', '75', '100'] as const

export type Filters = {
  fromDate: string
  toDate: string
  status: (typeof statusList)[number]
  entriesPerPage: (typeof entriesList)[number]
}

export type WavesFiltersProps = {
  defaultValues: Filters
  onFilter: (filters: Filters) => void
}

export const WavesFilters = ({
  defaultValues,
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
      entriesPerPage: entriesPerPage.value as Filters['entriesPerPage'],
    })
  }

  return (
    <form onSubmit={handleFiltersSubmit}>
      <VStack align={'stretch'} spacing={4}>
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
          <Text>
            Showing <Text as="b">11</Text> to <Text as="b">20</Text> of 59,120
            entries
          </Text>
        </Flex>

        {/* Fields */}
        {isFiltersSectionOpen && (
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
                {statusList.map((statusOption, index) => (
                  <option key={index}>{statusOption}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Show per page</FormLabel>
              <Select
                name="entriesPerPage"
                bg="white"
                defaultValue={entriesPerPage}
              >
                {entriesList.map((entriesOption, index) => (
                  <option key={index}>{entriesOption}</option>
                ))}
              </Select>
            </FormControl>
          </Flex>
        )}

        {/* Actions */}
        {isFiltersSectionOpen && (
          <Flex justify="flex-end" columnGap={10}>
            <Button
              type="reset"
              variant="ghost"
              color="text"
              textDecoration={'underline'}
            >
              Clear All
            </Button>

            <Button type="submit">Apply Filters</Button>
          </Flex>
        )}
      </VStack>
    </form>
  )
}
