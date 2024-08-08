import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Image,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { signIn } from 'aws-amplify/auth'
import { useState, type FormEvent } from 'react'
import FilterEasyLogo from '../../assets/logos/filtereasy-logo-2x.png'
import { Alert, FormInput } from '../../components'
import { getErrorMessage } from '../../utils'

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements
}

export const SignInPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<SignInForm>) => {
    event.preventDefault()
    setIsLoading(true)
    onClose()

    const form = event.currentTarget
    // ... validate inputs

    try {
      await signIn({
        username: form.elements.email.value,
        password: form.elements.password.value,
      })
    } catch (e) {
      setError(getErrorMessage(e))
      onOpen()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container pt={16}>
      <Box display="flex" justifyContent="center">
        <Image src={FilterEasyLogo} width={282} />
      </Box>
      <Card mt={12}>
        <CardHeader pb={2} pt={8}>
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

              {error && isOpen && (
                <Alert description={error} status="error" onClose={onClose} />
              )}

              <Button type="submit" width="full" isLoading={isLoading}>
                Sign In
              </Button>

              <Button
                variant="link"
                colorScheme="text"
                textDecoration="underline"
                onClick={() => alert('reset password')}
              >
                Forgot your password?
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}
