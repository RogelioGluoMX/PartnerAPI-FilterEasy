import { Authenticator } from '@aws-amplify/ui-react'
import { ChakraProvider } from '@chakra-ui/react'
import { Amplify } from 'aws-amplify'
import React from 'react'
import ReactDOM from 'react-dom/client'
import outputs from '../amplify_outputs.json'
import App from './App'
import './main.css'
import { theme } from './theme'

Amplify.configure(outputs)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Authenticator.Provider>
  </React.StrictMode>
)
