import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const solid = defineStyle({
  _hover: {
    bg: 'primary.400',
  },
  _active: {
    bg: 'primary.600',
  },
})

const ghost = defineStyle({
  color: 'text',

  _hover: {
    color: 'primary.600',
    _disabled: {
      color: 'shading.300',
    },
  },
  _active: {
    color: 'primary.500',
  },
  _disabled: {
    color: 'shading.300',
    opacity: 1,
  },
})

export const buttonTheme = defineStyleConfig({
  variants: { solid, ghost },
})
