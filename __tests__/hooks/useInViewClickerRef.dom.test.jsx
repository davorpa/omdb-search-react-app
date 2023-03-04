import { describe, it, expect, vi } from 'vitest'
import { act, render, renderHook } from '@testing-library/react'
import { useInViewClickerRef } from '@hooks/useInViewClickerRef'

describe('useInViewClickerRef', () => {
  it('should be defined', () => {
    expect(useInViewClickerRef).toBeDefined()
  })

  it('should return a React ref', () => {
    // Given
    // When
    const { result } = renderHook(() => useInViewClickerRef(null, true))
    const measureRef = result.current
    // Then is a React ref not handled by React yet
    expect(measureRef).toBeDefined()
    expect(measureRef).to.be.a('function') // ref is a function wrapped in a React.useCallback
  })

  it('should click on the measured element when is visible on the screen', () => {
    // Given
    const mockedObserver = mockIntersectionObserver() // Not available on jsdom/happy-dom, so we mock it
    const onClick = vi.fn()

    // When
    const { result } = renderHook(() => useInViewClickerRef(null, true))
    const measureRef = result.current
    act(() => {
      // render measured element
      render(<button ref={measureRef} onClick={onClick} />)
    })
    // Then
    expect(mockedObserver.observe).toHaveBeenCalledTimes(1)
    // TODO: check if the element is really observed
    // expect(onClick).toHaveBeenCalledTimes(1)
    // expect(mockedObserver.unobserve).toHaveBeenCalledTimes(1)
  })
})

function mockIntersectionObserver() {
  const observeFn = vi.fn()
  const unobserveFn = vi.fn()
  const disconnectFn = vi.fn()

  const mockedClass = class {
    observe = observeFn
    unobserve = unobserveFn
    disconnect = disconnectFn
  }
  window.IntersectionObserver = mockedClass

  return {
    observe: observeFn,
    unobserve: unobserveFn,
    disconnect: disconnectFn
  }
}
