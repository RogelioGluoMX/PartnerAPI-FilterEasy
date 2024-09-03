import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Button,
  Card,
  Link as ChakraLink,
  Container,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { CustomIcon, DetailsItem, ThFE, type Wave } from '@components'
import { Link, useParams } from 'react-router-dom'
import feSlipsData from '../../data/fe-slips-data.json'

const slips = feSlipsData as Partial<Wave>[]

export const WavesDetailPage = () => {
  const { id } = useParams()

  return (
    <Container maxW="container.xl" pt={7} pb={12}>
      <VStack align={'stretch'} spacing={6}>
        {/* Header */}
        <Flex>
          <Button
            as={Link}
            to="/waves"
            size="lg"
            variant="ghostBlue"
            leftIcon={<ArrowBackIcon />}
            px={0}
          >
            Back
          </Button>
          <Heading ml={8}>
            Waves Details:
            <Text as="span" ml={6} color="shading.400">
              {id}
            </Text>
          </Heading>
        </Flex>

        {/* Details */}
        <VStack
          align="stretch"
          spacing={4}
          px={5}
          py={6}
          borderBottomWidth={1}
          borderBottomColor="shading.300"
        >
          <Heading as="h3" size="lg">
            Details
          </Heading>

          <DetailsItem
            label="PDF File:"
            value="WVFEOL932171.pdf"
            linkTo="/PDF/WVFEOL932171.pdf"
          />
          <DetailsItem label="LPN:" value="OCFEOL0009347270" />
          <DetailsItem label="Created At:" value="Mar 15, 2024 11:43:01 AM" />
        </VStack>

        {/* Table */}
        <Flex justify="space-between">
          <Heading as="h3" size="lg">
            Packing Slips
          </Heading>
          <Text>
            Showing <Text as="b">{slips.length}</Text> entries
          </Text>
        </Flex>
        <Card p={3}>
          <TableContainer>
            <Table colorScheme="gray">
              <Thead>
                <Tr>
                  <ThFE>LPN</ThFE>
                  <ThFE>Created at</ThFE>
                  <ThFE>PDF</ThFE>
                </Tr>
              </Thead>
              <Tbody>
                {slips.map((slip, index) => (
                  <Tr key={index}>
                    <Td>{slip.lpn}</Td>
                    <Td>{slip.createdAt}</Td>
                    <Td>
                      <ChakraLink as={Link} to={'/pdf'} variant="file">
                        <CustomIcon.FilePDF boxSize={6} />
                      </ChakraLink>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </VStack>
    </Container>
  )
}
