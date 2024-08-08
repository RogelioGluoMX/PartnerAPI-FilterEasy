import { Button, Card, Container, useDisclosure } from '@chakra-ui/react'
import { signIn } from 'aws-amplify/auth'
import { useState, type FormEvent } from 'react'
import { getErrorMessage } from '../../utils'
import { Alert } from '../../components'

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
    <Container>
      <Card px={4} py={6}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          {error && isOpen && (
            <Alert description={error} status="error" onClose={onClose} />
          )}
          <Button type="submit" width="full" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  )
}
