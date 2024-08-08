import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { FormEvent, useCallback, useState } from 'react'

export type FormInputProps = {
  type: 'text' | 'password' | 'email'
  name: string
  label?: string
  placeholder?: string
  initialValue?: string
  isReadOnly?: boolean
  isRequired?: boolean
}

export const FormInput = ({
  type,
  name,
  label,
  placeholder,
  initialValue = '',
  isReadOnly = false,
  isRequired = false,
}: FormInputProps) => {
  const [value, setValue] = useState(initialValue)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  const getInputType = useCallback(
    (inputType: FormInputProps['type']) => {
      return inputType === 'password'
        ? isPasswordVisible
          ? 'text'
          : 'password'
        : inputType
    },
    [isPasswordVisible]
  )

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }

  const viewPassIcon = isPasswordVisible ? <ViewOffIcon /> : <ViewIcon />

  return (
    <FormControl isReadOnly={isReadOnly} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input
          type={getInputType(type)}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
        {type === 'password' && (
          <InputRightElement>
            <IconButton
              variant="link"
              colorScheme="secondary"
              aria-label="Show Password"
              fontSize="20px"
              icon={viewPassIcon}
              onClick={handlePasswordVisibility}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  )
}
