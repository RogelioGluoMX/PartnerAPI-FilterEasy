import { formAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(formAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    label: {
      fontFamily: 'heading',
      fontSize: '1rem',
      lineHeight: '1.375rem',
    },
  },
})

export const formTheme = defineMultiStyleConfig({ baseStyle })
