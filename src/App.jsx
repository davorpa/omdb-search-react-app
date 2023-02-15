import { OMDbClientContextProvider } from '@context/omdb/client'
import { AppContainer } from '@components/AppContainer'
import './App.css'

function App() {
  return (
    <OMDbClientContextProvider>
      <div className="App">
        <h1>OMDB Search</h1>
        <AppContainer />
      </div>
    </OMDbClientContextProvider>
  )
}

export default App
