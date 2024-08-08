import {
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'

export type FormInputProps = {
  type: 'text' | 'password' | 'email'
  name: string
  label?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
}

export const FormInput = ({
  type,
  name,
  label,
  placeholder,
  readOnly = false,
  required = false,
}: FormInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }

  const getInputType = (inputType: FormInputProps['type']) => {
    return inputType === 'password'
      ? isPasswordVisible
        ? 'text'
        : 'password'
      : inputType
  }

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input
          type={getInputType(type)}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
        />
        {type === 'password' && (
          <InputRightElement>
            <IconButton
              variant="link"
              colorScheme="secondary"
              aria-label="Show Password"
              fontSize="20px"
              icon={<Icon />}
              onClick={handlePasswordVisibility}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  )
}
