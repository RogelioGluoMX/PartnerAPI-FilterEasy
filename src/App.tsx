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
        { index: true, element: <Navigate to="signin" replace /> },
        { path: '/signin', element: <SignInPage /> },
        { path: '/password-reset', element: <PasswordResetPage /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { index: true, element: <Navigate to="/admin/waves" replace /> },
        { path: '/admin/waves', element: <TodosPage /> },
        { path: '/admin/logs', element: <PasswordResetPage /> },
      ],
    },
  ])

  // const { authStatus } = useAuthenticator()

  // return authStatus === 'unauthenticated' ? <SignInPage /> : <TodosPage />
  return <RouterProvider router={router} />
}

export default App
