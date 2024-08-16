import { Box, Container, LayoutProps } from '@chakra-ui/react'
import { NavBar } from '@components'
import { useAuth } from '@hooks'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const CONTAINER_MAX_WIDTH: LayoutProps['maxW'] = 'container.xl'

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
          <Container maxW={CONTAINER_MAX_WIDTH}>
            <NavBar onSignOut={signOut} />
          </Container>
        </Box>
        <Container maxW={CONTAINER_MAX_WIDTH}>
          <Outlet />
        </Container>
      </Box>
    )
  )
}
