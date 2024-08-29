import FilterEasyLogo from '@assets/logos/filtereasy-logo-2x.png'
import { Button, Flex, HStack, Image, useTheme } from '@chakra-ui/react'
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
  const theme = useTheme()

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
            style={({ isActive }) => ({
              fontSize: 18,
              fontWeight: isActive ? '700' : '400',
              color: isActive ? theme.colors.primary['600'] : 'black',
            })}
          >
            {label}
          </NavLink>
        ))}
      </HStack>
      <Button
        type="submit"
        rightIcon={<CustomIcon.LogOut boxSize={6} color="secondary.500" />}
        variant="ghost"
        fontFamily="urbana"
        fontSize={16}
        color="text"
        _hover={{
          color: 'primary.500',
        }}
        onClick={onSignOut}
      >
        Log Out
      </Button>
    </Flex>
  )
}
