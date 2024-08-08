import {
  extendTheme,
  withDefaultColorScheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'
import { alertTheme } from './alertTheme'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  blue: {
    50: '#e7efff',
    100: '#c1cff4',
    200: '#9ab0e7',
    300: '#7290da',
    400: '#4b70ce',
    500: '#3157b4',
    600: '#24448d',
    700: '#183066',
    800: '#0b1d40',
    900: '#000a1c',
  },
  red: {
    50: '#ffe7e7',
    100: '#f6bfbf',
    200: '#ea9495',
    300: '#e16b6b',
    400: '#d74242',
    500: '#bd2828',
    600: '#941e1e',
    700: '#6b1515',
    800: '#410a0b',
    900: '#1c0000',
  },
  primary: {
    500: '#df6363',
  },
  secondary: {
    500: '#2f53ac',
  },
}

const fonts = {
  body: `'myriad-pro', sans-serif`,
  heading: `'urbana', sans-serif`,
}

const components = {
  Alert: alertTheme,
}

export const theme = extendTheme(
  {
    config,
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          bg: mode('#f4f4f4', 'green')(props),
        },
      }),
    },
    colors,
    fonts,
    components,
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
  })
)
