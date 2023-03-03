import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { LoaderMoreButton } from '@components/LoaderMoreButton'

describe('LoaderMoreButton component', () => {
  it('should render without problems', () => {
    render(<LoaderMoreButton />)
    expect(true).toBeTruthy()
  })

  it('should render a normal button', () => {
    // Given
    // When
    const { container } = render(<LoaderMoreButton />)
    // Then
    expect(container.querySelector('button')).to.equal(container.firstChild)
    expect(container.firstChild).not.toHaveAttribute('type')
  })

  it('should render with a ".load-more" CSS class', () => {
    // Given
    // When
    const { container } = render(<LoaderMoreButton />)
    // Then
    expect(container.firstChild).toHaveClass('load-more')
  })

  it('should render with a CSS class equal to the className attribute', () => {
    // Given
    const className = 'my-class'
    // When
    const { container } = render(<LoaderMoreButton className={className} />)
    // Then
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render with a CSS class equal to the busy attribute', () => {
    // Given
    const className = 'busy'
    // When
    const { container } = render(<LoaderMoreButton busy />)
    // Then
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render with a busy state', () => {
    // Given
    // When
    const { container } = render(<LoaderMoreButton busy />)
    // Then
    expect(container.firstChild).toHaveTextContent('Loading more...')
    expect(container.firstChild).toBeDisabled()
    expect(container.querySelector('svg')).toHaveClass('animation-spin')
  })

  it('should render with a normal state', () => {
    // Given
    // When
    const { container } = render(<LoaderMoreButton busy={false} />)

    // Then
    expect(container.firstChild).toHaveTextContent('Load more...')
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('should render with a formId attribute', () => {
    // Given
    const formId = 'my-form'
    // When
    const { container } = render(<LoaderMoreButton formId={formId} />)
    // Then
    expect(container.firstChild).toHaveAttribute('form', formId)
  })

  it('should handle onclick event when a handler is provided', () => {
    // Given
    const onClick = vi.fn()
    // When
    const { container } = render(<LoaderMoreButton onClick={onClick} />)
    fireEvent.click(container.firstChild)
    // Then
    expect(onClick).toHaveBeenCalledOnce()
  })
})
