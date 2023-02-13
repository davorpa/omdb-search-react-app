import { OMDbClientContext, omdbClient } from '@/context'
import { AppContainer } from '@components/AppContainer'
import './App.css'

function App() {
  return (
    <OMDbClientContext.Provider value={omdbClient}>
      <div className="App">
        <h1>OMDB Search</h1>
        <AppContainer />
      </div>
    </OMDbClientContext.Provider>
  )
}

export default App
