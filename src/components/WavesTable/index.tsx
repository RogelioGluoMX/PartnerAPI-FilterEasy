import NoMatchesImg from '@assets/images/no-matches-found.svg'
import {
  Box,
  Card,
  Center,
  Link as ChakraLink,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { BadgeFE, CustomIcon, ThFE } from '@components'
import { Link } from 'react-router-dom'

export type Wave = {
  id: string
  waveNumber: string
  lpn: string
  createdAt: string
  lastDownloaded: string
  slipCount: number | string
  pdfURL: string
  status: 'All' | 'Available' | 'Downloaded'
}

export type WavesTableProps = {
  waves: Wave[]
}

export const WavesTable = ({ waves }: WavesTableProps) => {
  if (!waves.length) {
    return (
      <Center pt={6}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align="center"
          spacing={14}
        >
          <Image src={NoMatchesImg} w={212} />
          <Text fontSize="x-large" maxW={498}>
            No matches found, but don't worry, try searching with different
            keywords!
          </Text>
        </Stack>
      </Center>
    )
  }

  return (
    <VStack align="stretch" spacing={6}>
      <Card p={3}>
        <TableContainer>
          <Table colorScheme="gray">
            <Thead>
              <Tr>
                <ThFE>Wave Number</ThFE>
                <ThFE>LPN</ThFE>
                <ThFE>Created at</ThFE>
                <ThFE>Last downloaded</ThFE>
                <ThFE>P. Slip count</ThFE>
                <ThFE>PDF</ThFE>
                <ThFE>Status</ThFE>
              </Tr>
            </Thead>
            <Tbody>
              {waves.map((wave, index) => (
                <Tr key={index}>
                  <Td>
                    <ChakraLink
                      as={Link}
                      to={wave.waveNumber}
                      color="secondary.500"
                      fontFamily="urbana"
                    >
                      {wave.waveNumber}
                    </ChakraLink>
                  </Td>
                  <Td>{wave.lpn}</Td>
                  <Td>{wave.createdAt}</Td>
                  <Td>{wave.lastDownloaded}</Td>
                  <Td>{wave.slipCount}</Td>
                  <Td>
                    <ChakraLink as={Link} to={'/pdf'}>
                      <CustomIcon.FilePDF boxSize={6} color="primary.500" />
                    </ChakraLink>
                  </Td>
                  <Td>
                    <BadgeFE status={wave.status} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
      <Box>Pagination</Box>
    </VStack>
  )
}
