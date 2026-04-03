import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { system } from '@/theme'
import './index.css'
import { App } from './App.tsx'

const Router = import.meta.env.PROD && import.meta.env.BASE_URL !== '/' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </Router>
  </StrictMode>,
)
