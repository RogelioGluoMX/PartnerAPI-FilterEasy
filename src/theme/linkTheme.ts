import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const blue = defineStyle({
  color: 'secondary.500',
  fontWeight: 700,
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

const blueAlt = defineStyle({
  ...blue,
  fontFamily: 'heading',
  textDecoration: 'none',
})

const file = defineStyle({
  color: 'primary.500',

  _hover: {
    color: 'primary.400',
    _disabled: {
      color: 'shading.300',
      opacity: 1,
    },
  },
  _active: {
    color: 'primary.600',
  },
  _disabled: {
    color: 'shading.300',
    opacity: 1,
  },
})

export const linkTheme = defineStyleConfig({
  variants: { blue, blueAlt, file },
})
