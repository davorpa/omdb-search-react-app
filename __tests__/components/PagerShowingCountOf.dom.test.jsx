import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PagerShowingCountOf } from '@components/PagerShowingCountOf'

describe('PagerShowingCountOf component', () => {
  it('should render without problems', () => {
    render(<PagerShowingCountOf />)
    expect(true).toBeTruthy()
  })

  it('should render with a default CSS class', () => {
    // Given
    const className = 'pager'
    // When
    const { container } = render(<PagerShowingCountOf className={className} />)
    // Then
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render with DOM elements for page count and total', () => {
    // Given
    const total = Math.floor(Math.random() * 1000)
    const count = Math.floor(Math.random() * total)
    // When
    const { container } = render(
      <PagerShowingCountOf count={count} total={total} />
    )
    // Then
    expect(container.querySelector('.pager-count')).toHaveTextContent(count)
    expect(container.querySelector('.pager-total')).toHaveTextContent(total)
  })

  it('should render with a custom CSS class', () => {
    // Given
    const className = 'my-class'
    // When
    const { container } = render(<PagerShowingCountOf className={className} />)
    // Then
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render in singular mode when total pages is one', () => {
    // Given
    const total = 1
    const count = 1
    // When
    render(<PagerShowingCountOf count={count} total={total} />)
    // Then
    expect(screen.getByText(/item$/)).toBeInTheDocument()
  })

  it('should render in plural mode when total pages is zero', () => {
    // Given
    const total = 0
    const count = 0
    // When
    render(<PagerShowingCountOf count={count} total={total} />)
    // Then
    expect(screen.getByText(/items$/)).toBeInTheDocument()
  })

  it('should render in plural mode when total pages is more than one', () => {
    // Given
    const total = 2 + Math.floor(Math.random() * 1000)
    const count = Math.floor(Math.random() * total)
    // When
    render(<PagerShowingCountOf count={count} total={total} />)
    // Then
    expect(screen.getByText(/items$/)).toBeInTheDocument()
  })
})
