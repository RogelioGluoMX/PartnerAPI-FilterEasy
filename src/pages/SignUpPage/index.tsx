import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  useToast,
  VStack,
  Input
} from '@chakra-ui/react'
import { Alert, FormInput, PasswordRequirementsList } from '@components'
import { useValidatePassword } from '@hooks'
import { getErrorMessage } from '@utils'
import { signUp, confirmSignUp, type ConfirmSignUpInput, type SignUpInput } from 'aws-amplify/auth'
import { useState, useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const validUsername = "admin"
const validPassword = "admin"

const AuthenticationScreen = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const handleLogin = () => {
    if (username === validUsername && password === validPassword) {
      onAuthSuccess()
    } else {
      setError('Incorrect username or password.')
    }
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.8)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="1000"
    >
      <Card width="300px">
        <CardHeader>
          <Heading size="md">Restricted Access</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
            {error && (
              <Alert
                description={error}
                status="error"
                onClose={() => setError(undefined)}
              />        
            )}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}


interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  username: HTMLInputElement
  password: HTMLInputElement
  confirmPassword: HTMLInputElement
  confirmationCode: HTMLInputElement
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: SignUpFormElements
}

export const SignUpPage = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const toast = useToast()
  const [passwordState, validatePassword] = useValidatePassword()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const formRef = useRef<HTMLFormElement>(null)


  const handleSignUp = async ({ password, email }: { password: string; email: string }) => {
    try {
      await signUp({
        username: email, 
        password,
        attributes: {
          email,
        },
      } as SignUpInput) // Cast to SignUpInput to satisfy TypeScript
      toast({
        title: 'Sign Up Successful',
        description: "Check your email for the confirmation code.",
        variant: 'solid',
        position: 'top',
        status: 'success',
      })
      setIsConfirming(true)
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmSignUp = async () => {
    const input: ConfirmSignUpInput = {
      username: email, 
      confirmationCode,
    }
  
    try {
      await confirmSignUp(input) 
      toast({
        title: 'Account Confirmed',
        description: "Your account has been confirmed successfully.",
        variant: 'solid',
        position: 'top',
        status: 'success',
      })
      navigate('/signin')
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<SignUpForm>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(undefined)

    const form = event.currentTarget
    const { email, password, confirmPassword } =
      form.elements as unknown as SignUpFormElements

    if (isConfirming) {
      handleConfirmSignUp()
    } else {
      if (password.value !== confirmPassword.value) {
        setError('Password confirm mismatch.')
        setIsLoading(false)
        return
      }

      setEmail(email.value) // Save email for confirmation
      handleSignUp({
        password: password.value,
        email: email.value,
      })
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    validatePassword(value)
  }

  const handlePasswordConfirmChange = (value: string) => {
    setConfirmPassword(value)
  }

  const handleConfirmationCodeChange = (value: string) => {
    setConfirmationCode(value)
  }

  const isPasswordMatch = confirmPassword === password

  return (
    <>
      {!isAuthenticated && (
        <AuthenticationScreen onAuthSuccess={() => setIsAuthenticated(true)} />
      )}
      {isAuthenticated && (      
          <Card mt={12}>
              <CardHeader p={8} pb={2}>
                <Heading as="h3" size="md" lineHeight={7}>
                  {isConfirming ? 'Confirm Your Account' : 'Sign Up'}
                </Heading>
              </CardHeader>
              <CardBody p={8} pt={6}>
                <form onSubmit={handleSubmit} ref={formRef} autoComplete="off">
                  <VStack spacing={4}>
                    {!isConfirming && (
                      <>
                        <FormInput
                          type="email"
                          name="email"
                          label="Email Address"
                          placeholder="Enter your Email"
                          isRequired
                        />                
                        <FormInput
                          type="password"
                          name="password"
                          label="Password"
                          placeholder="Enter your Password"
                          onChangeText={handlePasswordChange}
                          isRequired
                        />
                        <Box alignSelf={'flex-start'}>
                          <Heading as="h6" size="xs">
                            Your Password must meet the following requirements:
                          </Heading>
                          <PasswordRequirementsList state={passwordState} />
                        </Box>
                        <FormInput
                          type="password"
                          name="confirmPassword"
                          label="Confirm Password"
                          placeholder="Confirm your Password"
                          onChangeText={handlePasswordConfirmChange}
                          isInvalid={!isPasswordMatch}
                          isRequired
                        />
                      </>
                    )}

                    {isConfirming && (
                      <FormInput
                        type="text"
                        name="confirmationCode"
                        label="Confirmation Code"
                        placeholder="Enter the confirmation code"
                        onChangeText={handleConfirmationCodeChange}
                        isRequired
                      />
                    )}

                    {error && (
                      <Alert
                        description={error}
                        status="error"
                        onClose={() => setError(undefined)}
                      />
                    )}

                    <Button type="submit" width="full" isLoading={isLoading}>
                      {isConfirming ? 'Confirm Code' : 'Sign Up'}
                    </Button>

                    {isConfirming && (
                      <Button
                        variant="link"
                        colorScheme="text"
                        textDecoration="underline"
                        onClick={() => setIsConfirming(false)}
                      >
                        Back to Sign Up
                      </Button>
                    )}
                  </VStack>
                </form>
              </CardBody>
            </Card>
      )}
    </>

    
  )
}
