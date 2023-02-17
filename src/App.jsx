import { OMDbClientContextProvider } from '@context/omdb/client'
import { AppContainer } from '@components/AppContainer'
import AppFooter from '@components/AppFooter'
import './App.css'

/**
 * Component that acts as entrypoint rendering the entire application.
 *
 * @returns {import('react').FunctionComponent}
 * @memberof module:components
 */
function App() {
  return (
    <OMDbClientContextProvider>
      <div className="App">
        <h1>OMDB Search</h1>
        <AppContainer />
      </div>
      <AppFooter />
    </OMDbClientContextProvider>
  )
}

export default App
