import {
  extendTheme,
  withDefaultColorScheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import { mode } from '@chakra-ui/theme-tools'
import { alertTheme } from './alertTheme'
import { buttonTheme } from './buttonTheme'
import { formTheme } from './formTheme'
import { linkTheme } from './linkTheme'
import { tableTheme } from './tableTheme'

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
    200: '#b7c2de',
    300: '#8a9dce',
    400: '#5d78bd',
    500: '#3053ad',
    600: '#244094',
    700: '#182e7c',
    800: '#14244b',
    900: '#0c162c',
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
  Button: buttonTheme,
  Form: formTheme,
  Link: linkTheme,
  Table: tableTheme,
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
