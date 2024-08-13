import { useAuthenticator } from '@aws-amplify/ui-react'
import { AdminLayout, AuthenticationLayout } from '@layouts'
import { PasswordResetPage, SignInPage, TodosPage } from '@pages'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthenticationLayout />,
      children: [
        { index: true, element: <SignInPage /> },
        { path: 'password-reset', element: <PasswordResetInPage /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [{ index: true, element: <TodosPage /> }],
    },
  ])

  // const { authStatus } = useAuthenticator()

  // return authStatus === 'unauthenticated' ? <SignInPage /> : <TodosPage />
  return <RouterProvider router={router} />
}

export default App
