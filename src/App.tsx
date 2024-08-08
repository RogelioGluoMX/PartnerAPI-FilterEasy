import { useAuthenticator } from '@aws-amplify/ui-react'
import { SignInPage, TodosPage } from './pages'

function App() {
  const { authStatus } = useAuthenticator()

  return authStatus === 'unauthenticated' ? <SignInPage /> : <TodosPage />
}

export default App
