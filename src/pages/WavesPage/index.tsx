import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { FormEvent, KeyboardEvent, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

interface SearchFormElements extends HTMLFormControlsCollection {
  searchQuery: HTMLInputElement
}

interface SearchForm extends HTMLFormElement {
  readonly elements: SearchFormElements
}

export const WavesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const formRef = useRef<SearchForm | null>(null)

  const handleSearchSubmit = (event: FormEvent<SearchForm>) => {
    event.preventDefault()
    const form = event.currentTarget
    const { searchQuery } = form.elements
    const params = { q: searchQuery.value }
    setSearchParams(params)
    alert('Search: ' + searchQuery.value)
  }

  const handleClearQuery = () => {
    const form = formRef.current as SearchForm
    form.reset()
    setSearchParams(undefined)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') handleClearQuery()
  }

  return (
    <Container maxW="container.xl" pt={7}>
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
                  defaultValue={searchParams.get('q') || ''}
                  onKeyUp={handleKeyUp}
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
    </Container>
  )
}
