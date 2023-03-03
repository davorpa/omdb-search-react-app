import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { YearSearchFormInput } from '@components/inputs/YearSearchFormInput'

describe('YearSearchFormInput component', () => {
  it('should render without problems', () => {
    render(<YearSearchFormInput />)
    expect(true).toBeTruthy()
  })

  it('should render with default options if no props are provided', () => {
    // Given
    const inputIdMatcher = expect.stringMatching(/-search-year$/)
    // When
    const { container } = render(<YearSearchFormInput />)
    // Then
    const wrapper = container.querySelector('fieldset')
    const input = findInputInside(container)
    const label = findLabelInside(container)
    expect(container.firstChild).to.equal(wrapper)
    expect(wrapper).toHaveClass('form-input')
    expect(wrapper).not.toHaveClass('required')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', inputIdMatcher)
    expect(label).toHaveTextContent(/Year/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', inputIdMatcher)
    expect(input).toHaveAttribute('name', 'year')
    expect(input).not.toHaveAttribute('required')
    expect(input).toHaveAttribute('readonly')
    expect(input).toHaveAttribute(
      'placeholder',
      String(new Date().getFullYear())
    )
    expect(input).not.toHaveValue()
  })

  it('should render with a value equal to the value attribute', () => {
    // Given
    const value = 2020
    // When
    const { container } = render(<YearSearchFormInput value={value} />)
    // Then
    const input = findInputInside(container)
    expect(input).toHaveValue(value)
  })

  it('should render as writable if valueSetter handler is provided', () => {
    // Given
    const value = new Date().getFullYear()
    const valueSetter = vi.fn()
    // When
    const { container } = render(
      <YearSearchFormInput value={value} valueSetter={valueSetter} />
    )
    // Then
    const input = findInputInside(container)
    expect(input).toHaveValue(value)
    expect(input).not.toHaveAttribute('readonly')
  })

  it('should render with a CSS class equal to the className attribute', () => {
    // Given
    const className = 'my-class'
    // When
    const { container } = render(<YearSearchFormInput className={className} />)
    // Then
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render with required attribute', () => {
    // Given
    // When
    const { container } = render(<YearSearchFormInput required />)
    // Then
    const wrapper = container.firstChild
    const input = findInputInside(container)
    expect(wrapper).toHaveClass('required')
    expect(input).toHaveAttribute('required')
  })

  it('should render with custom name attribute', () => {
    // Given
    const name = 'my-name'
    // When
    const { container } = render(<YearSearchFormInput name={name} />)
    // Then
    const input = findInputInside(container)
    expect(input).toHaveAttribute('name', name)
  })

  it('should render with a custom formId attribute', () => {
    // Given
    const formId = 'my-form'
    // When
    const { container } = render(<YearSearchFormInput formId={formId} />)
    // Then
    const input = findInputInside(container)
    expect(input).toHaveAttribute('form', formId)
  })

  it('should render with a custom label attribute', () => {
    // Given
    const labelText = 'My label'
    // When
    const { container } = render(<YearSearchFormInput labelText={labelText} />)
    // Then
    const label = findLabelInside(container)
    expect(label).toHaveTextContent(labelText)
  })

  it('should handle onValueChange event when a handler is provided', () => {
    // Given
    const value = new Date().getFullYear()
    const onValueChange = vi.fn()
    // When
    const { container } = render(
      <YearSearchFormInput onValueChange={onValueChange} />
    )
    const input = findInputInside(container)
    fireEvent.change(input, { target: { value } })
    // Then
    expect(onValueChange).toHaveBeenCalledOnce()
  })

  it('should handle valueSetter when a handler is provided as function', () => {
    // Given
    const name = 'my-name'
    const value = String(new Date().getFullYear())
    const valueSetter = vi.fn()
    // When
    const { container } = render(
      <YearSearchFormInput name={name} valueSetter={valueSetter} />
    )
    const input = findInputInside(container)
    fireEvent.change(input, { target: { value } })
    // Then
    expect(valueSetter).toHaveBeenCalledOnce()
    expect(valueSetter).toHaveBeenCalledWith(value, name)
  })

  it('should handle valueSetter when a handler is provided as function and pass it validation', () => {
    // Given
    const name = 'my-name'
    const value = String(new Date().getFullYear())
    const valueSetter = vi.fn((/* value */ _, /* name */ __) => true)
    // When
    const { container } = render(
      <YearSearchFormInput name={name} valueSetter={valueSetter} />
    )
    const input = findInputInside(container)
    fireEvent.change(input, { target: { value } })
    // Then
    expect(valueSetter).toHaveBeenCalledOnce()
    expect(valueSetter).toHaveBeenCalledWith(value, name)
  })

  it('should handle valueSetter when a handler is provided as function and fails it validation', () => {
    // Given
    const name = 'my-name'
    const value = String(new Date().getFullYear())
    const valueSetter = vi.fn((/* value */ _, /* name */ __) => false)
    // When
    const { container } = render(
      <YearSearchFormInput name={name} valueSetter={valueSetter} />
    )
    const input = findInputInside(container)
    fireEvent.change(input, { target: { value } })
    // Then
    expect(valueSetter).toHaveBeenCalledOnce()
    expect(valueSetter).toHaveBeenCalledWith(value, name)
  })

  it('should handle valueSetter when a handler is provided as Promise and pass it validation', () => {
    // Given
    const name = 'my-name'
    const value = String(new Date().getFullYear())
    const valueSetter = vi.fn().mockResolvedValue(true)
    // When
    const { container } = render(
      <YearSearchFormInput name={name} valueSetter={valueSetter} />
    )
    const input = findInputInside(container)
    fireEvent.change(input, { target: { value } })
    // Then
    expect(valueSetter).toHaveBeenCalledOnce()
    expect(valueSetter).toHaveBeenCalledWith(value, name)
  })

  it('should handle valueSetter when a handler is provided as Promise and fails it validation', () => {
    // Given
    const name = 'my-name'
    const value = String(new Date().getFullYear())
    const valueSetter = vi.fn().mockResolvedValue(false)
    // When
    const { container } = render(
      <YearSearchFormInput name={name} valueSetter={valueSetter} />
    )
    const input = findInputInside(container)
    fireEvent.change(input, { target: { value } })
    // Then
    expect(valueSetter).toHaveBeenCalledOnce()
    expect(valueSetter).toHaveBeenCalledWith(value, name)
  })

  it('should handle valueSetter when a handler is provided as Promise and throws it validation', () => {
    // Given
    const name = 'my-name'
    const value = String(new Date().getFullYear())
    const valueSetter = vi.fn().mockRejectedValue(new Error('my-error'))
    // When
    const { container } = render(
      <YearSearchFormInput name={name} valueSetter={valueSetter} />
    )
    const input = findInputInside(container)
    fireEvent.change(input, { target: { value } })
    // Then
    expect(valueSetter).toHaveBeenCalledOnce()
    expect(valueSetter).toHaveBeenCalledWith(value, name)
  })
})

function findInputInside(/** @type HTMLElement */ container) {
  return container.querySelector('input[type="number"]')
}

function findLabelInside(/** @type HTMLElement */ container) {
  return container.querySelector('label')
}
