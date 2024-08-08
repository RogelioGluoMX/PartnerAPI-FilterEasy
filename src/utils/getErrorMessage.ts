export const getErrorMessage = (e: unknown): string => {
  const error = e as Error
  const message = formatErrorMessage(error?.message)
  return message || 'An unexpected error has occurred.'
}

const formatErrorMessage = (message: string) => {
  return message
    .replace('username', 'Email')
    .replace('password', 'Password')
    .replace('signIn', 'Sign In')
}
