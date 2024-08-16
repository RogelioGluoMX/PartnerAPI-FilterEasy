import { useAuthenticator } from '@aws-amplify/ui-react'

export const useAuth = () => {
  const { authStatus, signOut } = useAuthenticator((context) => [
    context.authStatus,
    context.signOut,
  ])
  const authenticated = authStatus === 'authenticated'

  // signOut working intermittently,
  // see the following link for reference:
  // https://github.com/aws-amplify/amplify-js/issues/13638
  return { authenticated, signOut }
}
