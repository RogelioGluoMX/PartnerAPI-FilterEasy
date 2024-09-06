import { type Filters } from '@components'
import { useState } from 'react'

export type Params = {
  search: string
  filters: Filters
  page: number
}

export type FlattenedParams = Omit<Params, 'filters'> & Filters

export const useFilterParams = (
  defaultFilters: Filters,
  onUpdateParams: (flattenedParams: FlattenedParams) => void
) => {
  const [params, setParams] = useState<Params>({
    search: '',
    filters: defaultFilters,
    page: 1,
  })

  const updateParams = (newParams: Partial<Params>) => {
    setParams((prevParams) => {
      const updatedParams = { ...prevParams, ...newParams }
      const { search, page, filters } = updatedParams

      // Flatten parameters and call the callback
      onUpdateParams({ search, page, ...filters })

      return updatedParams
    })
  }

  const onSearch = (newSearch: string) =>
    updateParams({ search: newSearch, page: 1 })

  const onFilter = (newFilters: Filters) =>
    updateParams({ filters: newFilters, page: 1 })

  const onPageChange = (newPage: number) => updateParams({ page: newPage })

  return { params, onSearch, onFilter, onPageChange }
}
