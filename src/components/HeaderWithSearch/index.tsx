import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { FormEvent, useRef } from 'react'

interface SearchFormElements extends HTMLFormControlsCollection {
  searchQuery: HTMLInputElement
}

interface SearchForm extends HTMLFormElement {
  readonly elements: SearchFormElements
}

export type HeaderWithSearchProps = {
  onSearch: (query: string) => void
}

export const HeaderWithSearch = ({ onSearch }: HeaderWithSearchProps) => {
  const formRef = useRef<SearchForm | null>(null)

  const handleSearchSubmit = (event: FormEvent<SearchForm>) => {
    event.preventDefault()
    const form = event.currentTarget
    onSearch(form.elements.searchQuery.value)
  }

  const handleClearQuery = () => {
    const form = formRef.current as SearchForm
    form.reset()
    onSearch('')
  }

  return (
    <Flex justify="space-between">
      <Heading>Waves</Heading>
      <Box>
        <form onSubmit={handleSearchSubmit} ref={formRef}>
          <FormControl>
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input
                type="text"
                name="searchQuery"
                placeholder="Search"
                bg="white"
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  colorScheme="secondary"
                  aria-label="Clear search terms"
                  icon={<SmallCloseIcon boxSize={4} />}
                  onClick={handleClearQuery}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </form>
      </Box>
    </Flex>
  )
}
