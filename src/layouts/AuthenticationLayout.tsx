import { Box, Container, Image } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import FilterEasyLogo from '../assets/logos/filtereasy-logo-2x.png'

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
