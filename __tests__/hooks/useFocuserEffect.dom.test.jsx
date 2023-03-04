/* eslint-disable react/prop-types */
import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, within } from '@testing-library/react'
import { useFocuserEffect } from '@hooks/useFocuserEffect'

describe('useFocuserEffect', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should be defined', () => {
    expect(useFocuserEffect).toBeDefined()
  })

  it('should return an array with two React refs', () => {
    // Given
    const list = []
    // When
    const { result } = renderHook(() => useFocuserEffect(list))
    const [scrollerRef, focusedRef] = result.current
    // Then are React refs not handled by React yet (ref.current === null)
    expect(scrollerRef).toBeDefined()
    expect(focusedRef).toBeDefined()
    expect(scrollerRef).to.have.property('current', null)
    expect(focusedRef).to.have.property('current', null)
  })

  it('should be executed only on rerender', () => {
    // Given
    const scrollIntoViewMock = mockScrollIntoView() // Not available on jsdom/happy-dom, so we mock it

    let list = []
    // When first render
    const { container, rerender } = render(<TestedComponent list={list} />)
    const input = within(container).getByTestId('focused-input')
    const section = within(container).getByTestId('scroller-section')
    // Then nothing happens
    expect(input).toBeInstanceOf(HTMLElement)
    expect(section).toBeInstanceOf(HTMLElement)
    expect(input).not.toHaveFocus()
    expect(scrollIntoViewMock).not.toHaveBeenCalled()

    // When rerendered without data...
    list = []
    rerender(<TestedComponent list={list} />)
    // Then ... should focus into the input
    expect(input).toHaveFocus()

    // When rerendered with data...
    list = ['test']
    rerender(<TestedComponent list={list} />)
    // Then ... should scroll to the section
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
  })
})

function mockScrollIntoView() {
  const fn = vi.fn()
  window.Element.prototype.scrollIntoView = fn
  return fn
}

function TestedComponent({ list }) {
  const [scrollerRef, focusedRef] = useFocuserEffect(list)
  return (
    <main>
      <input ref={focusedRef} data-testid="focused-input" />
      <section ref={scrollerRef} data-testid="scroller-section">
        {list.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </section>
    </main>
  )
}
