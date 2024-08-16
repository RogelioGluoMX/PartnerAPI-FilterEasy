import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Alert, FormInput, PasswordRequirementsList } from '@components'
import { useValidatePassword } from '@hooks'
import { getErrorMessage } from '@utils'
import {
  confirmResetPassword,
  resetPassword,
  type ConfirmResetPasswordInput,
  type ResetPasswordOutput,
} from 'aws-amplify/auth'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface PasswordResetFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  confirmationCode: HTMLInputElement
  newPassword: HTMLInputElement
  confirmPassword: HTMLInputElement
}

interface PasswordResetForm extends HTMLFormElement {
  readonly elements: PasswordResetFormElements
}

export const PasswordResetPage = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [passwordState, validatePassword] = useValidatePassword()
  const { onClose, onOpen } = useDisclosure({ defaultIsOpen: false })
  const [isLoading, setIsLoading] = useState(false)
  const [isResendLoading, setIsResendLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isConfirmStep, setIsConfirmStep] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    error !== undefined ? onOpen() : onClose
  }, [error, onOpen, onClose])

  const handleResetPasswordNextSteps = (output: ResetPasswordOutput) => {
    const { nextStep } = output
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        toast({
          title: 'Code Sent Successfully',
          description:
            "If your email is linked to an account, you'll receive it shortly.",
          variant: 'solid',
          position: 'top',
          status: 'success',
        })

        setIsConfirmStep(true)

        break
      case 'DONE':
        console.log('Successfully reset password.')
        break
    }
  }

  const handleResetPassword = async (username: string) => {
    try {
      const output = await resetPassword({ username })
      handleResetPasswordNextSteps(output)
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setIsLoading(false)
      setIsResendLoading(false)
    }
  }

  const handleConfirmResetPassword = async ({
    username,
    confirmationCode,
    newPassword,
    confirmPassword,
  }: ConfirmResetPasswordInput & { confirmPassword: string }) => {
    if (newPassword !== confirmPassword) {
      setError('Password confirm mismatch.')
      setIsLoading(false)
      return
    }

    try {
      await confirmResetPassword({ username, confirmationCode, newPassword })
      toast({
        title: 'Password reset completed',
        description:
          'The password has been successfully reset. Redirecting in 5 seconds...',
        variant: 'solid',
        position: 'top',
        status: 'success',
      })
      setTimeout(() => {
        navigate('/signin')
      }, 5000)
    } catch (e) {
      setError(getErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<PasswordResetForm>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(undefined)

    const form = event.currentTarget
    const { email, confirmationCode, newPassword, confirmPassword } =
      form.elements

    if (isConfirmStep) {
      handleConfirmResetPassword({
        username: email.value,
        confirmationCode: confirmationCode.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      })
    } else {
      handleResetPassword(email.value)
    }
  }

  const handleResendCode = () => {
    setIsResendLoading(true)
    setError(undefined)
    const form = formRef.current as unknown as PasswordResetForm
    const { email } = form.elements
    handleResetPassword(email.value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    validatePassword(value)
  }

  const handlePasswordConfirmChange = (value: string) => {
    setConfirmPassword(value)
  }

  const isPasswordMatch = confirmPassword === password

  return (
    <Card mt={12}>
      <CardHeader p={8} pb={2}>
        <Heading as="h3" size="md" lineHeight={7}>
          Reset Password
        </Heading>
      </CardHeader>
      <CardBody p={8} pt={6}>
        <form onSubmit={handleSubmit} ref={formRef} autoComplete="off">
          <VStack spacing={4}>
            <FormInput
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your Email"
              isHidden={isConfirmStep}
            />

            {isConfirmStep ? (
              <>
                <FormInput
                  type="text"
                  name="confirmationCode"
                  label="Code"
                  placeholder="Enter the confirmation code"
                  helperText="You'll find the code in your email."
                  isRequired
                />

                <FormInput
                  type="password"
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter new password"
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
                  placeholder="Please confirm your Password"
                  onChangeText={handlePasswordConfirmChange}
                  isInvalid={!isPasswordMatch}
                  isRequired
                />
              </>
            ) : null}

            {error && (
              <Alert
                description={error}
                status="error"
                onClose={() => setError(undefined)}
              />
            )}

            <Button type="submit" width="full" isLoading={isLoading}>
              {isConfirmStep ? 'Reset Password' : 'Send Code'}
            </Button>

            {isConfirmStep ? (
              <Button
                variant="link"
                colorScheme="text"
                textDecoration="underline"
                onClick={handleResendCode}
                isLoading={isResendLoading}
              >
                Resend Code
              </Button>
            ) : (
              <Button
                variant="link"
                colorScheme="text"
                textDecoration="underline"
                onClick={() => navigate('/')}
              >
                Back to Sign In
              </Button>
            )}
          </VStack>
        </form>
      </CardBody>
    </Card>
  )
}
