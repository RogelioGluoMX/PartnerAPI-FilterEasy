import { Heading } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <>
      <Heading>Admin Layout</Heading>
      <Outlet />
    </>
  )
}
