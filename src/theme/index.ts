import {
  extendTheme,
  withDefaultColorScheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'
import { alertTheme } from './alertTheme'
import { formTheme } from './formTheme'
import { tableTheme } from './tableTheme'
import { buttonTheme } from './buttonTheme'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  primary: {
    100: '#f9e1e1',
    200: '#ffebe3',
    300: '#ffd4cb',
    400: '#e5807a',
    500: '#df6363',
    600: '#b44347',
    700: '#843a3a',
    800: '#592828',
    900: '#321616',
  },
  secondary: {
    100: '#e4e7ef',
    500: '#3053ad',
    700: '#182e7c',
  },
  shading: {
    100: '#f4f4f4',
    300: '#c0c0c0',
    400: '#828282',
  },
  info: {
    700: '#184b94',
  },
  text: {
    500: '#383634',
  },
}

const fonts = {
  body: `'myriad-pro', sans-serif`,
  heading: `'urbana', sans-serif`,
}

const components = {
  Alert: alertTheme,
  Form: formTheme,
  Table: tableTheme,
  Button: buttonTheme,
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
