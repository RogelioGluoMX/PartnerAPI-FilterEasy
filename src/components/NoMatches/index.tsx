import NoMatchesImg from '@assets/images/no-matches-found.svg'
import { Center, Image, Stack, Text } from '@chakra-ui/react'

export const NoMatches = () => {
  return (
    <Center pt={6}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        align="center"
        spacing={14}
      >
        <Image src={NoMatchesImg} w={212} />
        <Text fontSize="x-large" maxW={498}>
          No results found. Please try using different keywords or filters.
        </Text>
      </Stack>
    </Center>
  )
}
