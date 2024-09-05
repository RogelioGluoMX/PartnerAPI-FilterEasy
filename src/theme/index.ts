import {
  extendTheme,
  withDefaultColorScheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import { alertTheme } from './alertTheme'
import { buttonTheme } from './buttonTheme'
import { colors } from './colors'
import { fonts } from './fonts'
import { formTheme } from './formTheme'
import { linkTheme } from './linkTheme'
import { styles } from './styles'
import { tableTheme } from './tableTheme'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
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
    styles,
    colors,
    fonts,
    components,
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
  })
)
