import { OMDbClientContextProvider } from '@context/omdb/client'
import { AppContainer } from '@components/AppContainer'
import AppFooter from '@components/AppFooter'
import './App.css'
import logo from './assets/logo.svg'

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
        <h1>
          <span className="ws-nowrap">
            <img className="logo" src={logo} alt="O" />
            MDb
          </span>{' '}
          Search
        </h1>
        <AppContainer />
      </div>
      <AppFooter />
    </OMDbClientContextProvider>
  )
}

export default App
