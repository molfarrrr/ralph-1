import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@/theme'
import { App } from '@/App'

function renderApp(initialPath = '/'): void {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </MemoryRouter>
  )
}

describe('App', () => {
  it('renders without crashing and mounts the root element', () => {
    renderApp()
    expect(document.body.firstChild).toBeTruthy()
  })

  it('displays the home page h1 heading at the root route', () => {
    renderApp('/')
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
