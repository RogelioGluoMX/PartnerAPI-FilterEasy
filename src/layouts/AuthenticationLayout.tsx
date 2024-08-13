import FilterEasyLogo from '@assets/logos/filtereasy-logo-2x.png'
import { Box, Container, Image } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const AuthenticationLayout = () => {
  return (
    <Container pt={16}>
      <Box display="flex" justifyContent="center">
        <Image src={FilterEasyLogo} width={282} />
      </Box>
      <Outlet />
    </Container>
  )
}
