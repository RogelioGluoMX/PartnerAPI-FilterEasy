import {
  Card,
  Link as ChakraLink,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
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
  return (
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
                  <ChakraLink as={Link} to={wave.waveNumber} variant="blueAlt">
                    {wave.waveNumber}
                  </ChakraLink>
                </Td>
                <Td>{wave.lpn}</Td>
                <Td>{wave.createdAt}</Td>
                <Td>{wave.lastDownloaded}</Td>
                <Td>{wave.slipCount}</Td>
                <Td>
                  <ChakraLink as={Link} to={'/pdf'} variant="file">
                    <CustomIcon.FilePDF boxSize={6} />
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
  )
}
