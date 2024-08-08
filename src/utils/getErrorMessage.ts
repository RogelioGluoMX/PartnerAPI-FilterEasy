export const getErrorMessage = (e: unknown): string => {
  const error = e as Error
  return error?.message || 'An unexpected error has occurred.'
}
