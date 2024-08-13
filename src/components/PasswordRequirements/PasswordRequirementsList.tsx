import { UnorderedList } from '@chakra-ui/react'
import { type PasswordState } from '@hooks'
import { PasswordRequirementsItem } from './PasswordRequirementsItem'

type Props = { state: PasswordState }

export const PasswordRequirementsList = ({ state }: Props) => {
  const { hasLowercase, hasNumber, hasSpecial, hasUppercase, hasValidLength } =
    state

  return (
    <UnorderedList>
      <PasswordRequirementsItem
        label="One uppercase letter"
        isValid={hasUppercase}
      />
      <PasswordRequirementsItem
        label="One lowercase letter"
        isValid={hasLowercase}
      />
      <PasswordRequirementsItem label="One digit" isValid={hasNumber} />
      <PasswordRequirementsItem
        label="One special characters"
        isValid={hasSpecial}
      />
      <PasswordRequirementsItem
        label="Between 8 and 20 characters long"
        isValid={hasValidLength}
      />
    </UnorderedList>
  )
}
