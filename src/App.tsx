import { useAuthenticator } from '@aws-amplify/ui-react'
import { Heading } from '@chakra-ui/react'
import { AdminLayout, AuthenticationLayout } from '@layouts'
import { PasswordResetPage, SignInPage, SignUpPage, WavesPage,PDFPage } from '@pages'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus])

  if (authStatus === 'configuring') return <></>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/waves" replace />} />
        <Route path="/" element={<AuthenticationLayout />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
        </Route>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/pdf" element={<PDFPage/>}/>
          <Route path="/waves" element={<WavesPage />} />
          <Route path="/logs" element={<Heading>Logs</Heading>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
