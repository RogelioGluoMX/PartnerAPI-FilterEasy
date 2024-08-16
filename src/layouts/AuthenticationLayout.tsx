import FilterEasyLogo from '@assets/logos/filtereasy-logo-2x.png'
import { Box, Container, Image } from '@chakra-ui/react'
import { useAuth } from '@hooks'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const AuthenticationLayout = () => {
  const navigate = useNavigate()
  const { authenticated } = useAuth()

  useEffect(() => {
    if (authenticated) {
      navigate('/waves')
    }
  }, [authenticated, navigate])

  return (
    !authenticated && (
      <Container pt={16}>
        <Box display="flex" justifyContent="center">
          <Image src={FilterEasyLogo} width={282} />
        </Box>
        <Outlet />
      </Container>
    )
  )
}
