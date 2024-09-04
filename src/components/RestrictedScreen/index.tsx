import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Alert, FormInput } from '@components'
import { getErrorMessage } from '@utils'
import { FormEvent, useEffect, useState } from 'react'

// TODO: Provide safer credentials and
// handle them accordingly (not hardcoded)
const validUsername = 'admin'
const validPassword = 'admin'

interface AuthFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

interface AuthForm extends HTMLFormElement {
  readonly elements: AuthFormElements
}

export type RestrictedScreenProps = {
  onAuthSuccess: () => void
}

export const RestrictedScreen = ({ onAuthSuccess }: RestrictedScreenProps) => {
  const { onClose, onOpen } = useDisclosure({ defaultIsOpen: false })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    error ? onOpen() : onClose()
  }, [error, onOpen, onClose])

  const handleSubmit = (event: FormEvent<AuthForm>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(undefined)

    const form = event.currentTarget as AuthForm
    const { username, password } = form.elements

    try {
      if (
        username.value === validUsername &&
        password.value === validPassword
      ) {
        onAuthSuccess()
      } else {
        throw new Error('Invalid credentials.')
      }
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card mt={12}>
      <CardHeader p={8} pb={2}>
        <Heading as="h3" size="lg" lineHeight={8} textAlign="center">
          Restricted Access
        </Heading>
      </CardHeader>
      <CardBody p={8} pt={6}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <VStack spacing={4}>
            <FormInput
              type="text"
              name="username"
              label="Username"
              placeholder="Enter your Username"
            />

            <FormInput
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your Password"
            />

            {error && (
              <Alert
                description={error}
                status="error"
                onClose={() => setError(undefined)}
              />
            )}

            <Button type="submit" width="full" isLoading={isLoading}>
              Log In
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  )
}
