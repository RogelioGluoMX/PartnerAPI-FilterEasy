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
import { ThFE } from '@components'
import { Link } from 'react-router-dom'

export type Log = {
  id: string
  username: string
  action: string
  modifiedAt: string
}

export type LogsTableProps = {
  logs: Log[]
}

export const LogsTable = ({ logs }: LogsTableProps) => {
  return (
    <Card p={3}>
      <TableContainer>
        <Table colorScheme="gray">
          <Thead>
            <Tr>
              <ThFE>User name</ThFE>
              <ThFE>Action</ThFE>
              <ThFE>Date</ThFE>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((log, index) => (
              <Tr key={index}>
                <Td>
                  <ChakraLink
                    as={Link}
                    to={`mailto:${log.username}`}
                    variant="blueAlt"
                  >
                    {log.username}
                  </ChakraLink>
                </Td>
                <Td>{log.action}</Td>
                <Td>{log.modifiedAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  )
}
