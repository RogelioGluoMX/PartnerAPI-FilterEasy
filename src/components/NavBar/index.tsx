import FilterEasyLogo from '@assets/logos/filtereasy-logo-2x.png'
import { Button, Flex, HStack, Image } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { CustomIcon } from '../CustomIcon'

const menuItems = [
  { label: 'Waves', url: '/waves' },
  { label: 'Logs', url: '/logs' },
]

export type NavBarProps = {
  onSignOut: () => void
}

export const NavBar = ({ onSignOut }: NavBarProps) => {
  return (
    <Flex justify="space-between" align="center" py={3}>
      <HStack as="nav" spacing={{ base: 4, md: 12 }}>
        <Image
          src={FilterEasyLogo}
          width={{ base: 100, md: 154 }}
          mr={{ base: 0, md: 4 }}
        />
        {menuItems.map(({ label, url }, index) => (
          <NavLink
            key={index}
            to={url}
            className={({ isActive }) =>
              isActive ? 'menu-button active' : 'menu-button'
            }
          >
            {label}
          </NavLink>
        ))}
      </HStack>
      <Button
        type="submit"
        rightIcon={<CustomIcon.LogOut boxSize={4} color="secondary.500" />}
        variant="ghost"
        fontSize={16}
        textDecoration="none"
        onClick={onSignOut}
      >
        Log Out
      </Button>
    </Flex>
  )
}
