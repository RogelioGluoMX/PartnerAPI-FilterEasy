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
import { signIn } from 'aws-amplify/auth'
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements
}

export const SignInPage = () => {
  const navigate = useNavigate()
  const { onClose, onOpen } = useDisclosure({ defaultIsOpen: false })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    error ? onOpen() : onClose()
  }, [error, onOpen, onClose])

  const handleSubmit = async (event: FormEvent<SignInForm>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(undefined)

    const form = event.currentTarget
    const { email, password } = form.elements

    try {
      await signIn({ username: email.value, password: password.value })
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
          Sign In
        </Heading>
      </CardHeader>
      <CardBody p={8} pt={6}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormInput
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your Email"
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
              Sign In
            </Button>

            <Button
              variant="link"
              colorScheme="text"
              textDecoration="underline"
              onClick={() => navigate('/password-reset')}
            >
              Forgot your password?
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  )
}
