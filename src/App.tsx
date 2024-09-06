import { useAuthenticator } from '@aws-amplify/ui-react'
import { AdminLayout, AuthenticationLayout } from '@layouts'
import {
  LogsPage,
  PasswordResetPage,
  PDFPage,
  SignInPage,
  SignUpPage,
  WavesPage,
} from '@pages'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { WavesDetailPage } from './pages/WavesDetailPage'

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
          <Route path="/pdf" element={<PDFPage />} />
          <Route path="/waves/:id" element={<WavesDetailPage />} />
          <Route path="/waves" element={<WavesPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
