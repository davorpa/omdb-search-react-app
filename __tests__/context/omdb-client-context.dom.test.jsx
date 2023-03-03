import { describe, it, expect } from 'vitest'
import { render, renderHook } from '@testing-library/react'
import { useContext } from 'react'
import {
  OMDbClientContext,
  OMDbClientContextProvider,
  withinOMDbClientContextProvider
} from '@context/omdb/client'
import { OMDbAbstractClient } from '@services/omdb'

describe('OMDbClientContext', () => {
  it('should be defined', () => {
    // Then
    expect(OMDbClientContext).toBeDefined()
  })

  it('should be a React Context', () => {
    // Then
    expect(OMDbClientContext).toHaveProperty('Provider')
    expect(OMDbClientContext).toHaveProperty('Consumer')
  })

  it('should hold undefined value when used outside its provider', () => {
    // When
    const { result } = renderHook(() => useContext(OMDbClientContext))
    // Then
    expect(result.current).toBeUndefined()
  })

  it('should hold defined value when used within its provider', () => {
    // Given
    const wrapper = ({ children }) => (
      <OMDbClientContextProvider>{children}</OMDbClientContextProvider>
    )
    // When
    const { result } = renderHook(() => useContext(OMDbClientContext), {
      wrapper
    })
    // Then
    expect(result.current).toBeDefined()
    expect(result.current).toBeInstanceOf(OMDbAbstractClient)
  })
})

describe('OMDbClientContextProvider', () => {
  it('should render without problems', () => {
    render(<OMDbClientContextProvider />)
    expect(true).toBeTruthy()
  })

  it('should render with children', () => {
    // Given
    const children = <div>test</div>
    const provider = (
      <OMDbClientContextProvider>{children}</OMDbClientContextProvider>
    )
    // When
    const { container } = render(provider)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveTextContent('test')
  })
})

describe('withinOMDbClientContextProvider', () => {
  it('should render without problems', () => {
    // Given
    const TestedComponent = () => null
    // When
    render(withinOMDbClientContextProvider(TestedComponent))
    // Then
    expect(true).toBeTruthy()
  })

  it('should render with children and proxied render props', () => {
    // Given
    const renderProps = {
      id: 'test-id',
      className: 'test-class',
      'data-test': 'test-data'
    }
    const TestedComponent = (props) => <section {...props} />
    // When
    const { container } = render(
      withinOMDbClientContextProvider(TestedComponent)(renderProps)
    )
    // Then
    expect(container.firstChild).toBeInTheDocument()
    for (let [key, value] of Object.entries(renderProps)) {
      // passthrough proxied props
      if (key === 'className') key = 'class'
      expect(container.firstChild).toHaveAttribute(key, value)
    }
  })

  it('should personalize the display name with the wrapped component name', () => {
    // Given
    const TestedComponent = () => null
    // When
    const WrappedComponent = withinOMDbClientContextProvider(TestedComponent)
    // Then
    expect(WrappedComponent.displayName).to.equal(
      'OMDbClientContextProvider$Wrapper(TestedComponent)'
    )
  })

  it('should personalize the display name with the custom wrapped component display name', () => {
    // Given
    const displayName = 'SomeComponentWithDisplayName'
    const TestedComponent = () => null
    TestedComponent.displayName = displayName
    // When
    const WrappedComponent = withinOMDbClientContextProvider(TestedComponent)
    // Then
    expect(WrappedComponent.displayName).to.equal(
      `OMDbClientContextProvider$Wrapper(${displayName})`
    )
  })

  it('should fallback the wrapped display name to Component when is an anonymous function', () => {
    // Given
    // When
    const WrappedComponent = withinOMDbClientContextProvider(() => null)
    // Then
    expect(WrappedComponent.displayName).to.equal(
      'OMDbClientContextProvider$Wrapper(Component)'
    )
  })
})
