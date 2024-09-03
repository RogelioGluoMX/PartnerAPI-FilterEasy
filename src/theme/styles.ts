import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'

export const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('#f4f4f4', '#333333')(props),
    },
    '.menu-button': {
      fontSize: 18,
      color: 'text',

      _hover: {
        color: 'primary.600',
      },

      '&.active': {
        color: 'primary.600',
        fontWeight: 700,
      },
    },
  }),
}
