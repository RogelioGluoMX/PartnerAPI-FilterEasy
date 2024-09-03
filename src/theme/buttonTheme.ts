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
  textDecoration: 'underline',

  _hover: {
    color: 'primary.600',
    _disabled: {
      color: 'shading.300',
      opacity: 1,
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

const ghostBlue = defineStyle({
  color: 'secondary.500',
  textDecoration: 'underline',

  _hover: {
    color: 'secondary.700',
    _disabled: {
      color: 'shading.300',
      opacity: 1,
    },
  },
  _active: {
    color: 'secondary.600',
  },
  _disabled: {
    color: 'shading.300',
    opacity: 1,
  },
})

const ghostBlueAlt = defineStyle({
  ...ghostBlue,
  fontFamily: 'heading',
})

export const buttonTheme = defineStyleConfig({
  variants: { solid, ghost, ghostBlue, ghostBlueAlt },
})
