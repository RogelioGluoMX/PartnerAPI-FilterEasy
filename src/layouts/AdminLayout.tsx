import { Box, Container } from '@chakra-ui/react'
import { NavBar } from '@components'
import { useAuth } from '@hooks'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const AdminLayout = () => {
  const navigate = useNavigate()
  const { authenticated, signOut } = useAuth()

  useEffect(() => {
    if (!authenticated) {
      navigate('/signin')
    }
  }, [authenticated, navigate])

  return (
    authenticated && (
      <Box>
        <Box bg="white">
          <Container maxW="container.xl">
            <NavBar onSignOut={signOut} />
          </Container>
        </Box>
        <Outlet />
      </Box>
    )
  )
}
