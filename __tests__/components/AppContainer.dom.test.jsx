import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { AppContainer } from '@components/AppContainer'
import { withinOMDbClientContextProvider } from '@context/omdb/client'

describe('AppContainer component', () => {
  it('should render without problems within OMDbClientContext', () => {
    // Given
    const TestedComponent = withinOMDbClientContextProvider(AppContainer)
    // When
    render(<TestedComponent />)
    // Then
    expect(true).toBeTruthy()
  })

  it('should crash without provide a OMDbClientContext', () => {
    // Given
    const renderSupplier = () => render(<AppContainer />)
    // When
    // Then
    expect(renderSupplier).to.throw(
      'useOMDbClient custom hook must be used within a OMDbClientContextProvider'
    )
  })
})
