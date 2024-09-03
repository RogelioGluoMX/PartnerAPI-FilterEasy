import { Link as ChakraLink, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export type DetailsItemProps = {
  label: string
  value: string
  linkTo?: string
}

export const DetailsItem = ({ label, value, linkTo }: DetailsItemProps) => {
  return (
    <HStack spacing={2}>
      <Text as="b">{label}</Text>
      {linkTo ? (
        <ChakraLink as={Link} to={linkTo} variant="blue">
          {value}
        </ChakraLink>
      ) : (
        <Text>{value}</Text>
      )}
    </HStack>
  )
}
