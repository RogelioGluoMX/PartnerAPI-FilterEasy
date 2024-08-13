import { ListItem, Text } from '@chakra-ui/react'

type Props = { label: string; isValid: boolean }

export const PasswordRequirementsItem = ({ label, isValid }: Props) => {
  return (
    <ListItem fontSize="xs" color="#3053AD">
      {' '}
      {/* TODO: Use theme color */}
      <Text as={isValid ? 's' : undefined}>{label}</Text>
    </ListItem>
  )
}
