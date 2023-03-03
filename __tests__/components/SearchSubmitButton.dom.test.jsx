import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { SearchSubmitButton } from '@components/inputs/SearchSubmitButton'

describe('SearchSubmitButton component', () => {
  it('should render without problems', () => {
    render(<SearchSubmitButton />)
    expect(true).toBeTruthy()
  })

  it('should render a submit button', () => {
    // Given
    // When
    const { container } = render(<SearchSubmitButton />)
    // Then
    expect(container.querySelector('button')).to.equal(container.firstChild)
    expect(container.firstChild).toHaveAttribute('type', 'submit')
    expect(container.firstChild).toHaveTextContent('Search')
  })

  it('should render with a CSS class equal to the className attribute', () => {
    // Given
    const className = 'my-class'
    // When
    const { container } = render(<SearchSubmitButton className={className} />)
    // Then
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render with a CSS class equal to the loading attribute', () => {
    // Given
    const className = 'busy'
    // When
    const { container } = render(<SearchSubmitButton loading />)
    // Then
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render with a loading state', () => {
    // Given
    // When
    const { container } = render(<SearchSubmitButton loading />)
    // Then
    expect(container.querySelector('svg')).toHaveClass('animation-spin')
  })

  it('should render with a normal state', () => {
    // Given
    // When
    const { container } = render(<SearchSubmitButton loading={false} />)
    // Then
    expect(container.querySelector('svg')).not.toHaveClass('animation-spin')
  })

  it('should render with a formId attribute', () => {
    // Given
    const formId = 'my-form'
    // When
    const { container } = render(<SearchSubmitButton formId={formId} />)
    // Then
    expect(container.firstChild).toHaveAttribute('form', formId)
  })
})
