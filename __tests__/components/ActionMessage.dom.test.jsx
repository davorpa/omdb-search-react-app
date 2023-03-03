import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { ActionMessage } from '@components/action-messages'

describe('ActionMessage component', () => {
  let message

  beforeEach(() => {
    // Given
    message = {
      text: 'This is a message'
    }
  })

  it('should throws TypeError if no message data is provided', () => {
    // When
    const renderSupplier = () => render(<ActionMessage />)
    // Then
    expect(renderSupplier).to.throw(TypeError)
  })

  it('should render with a CSS class equal to the className attribute', () => {
    // Given
    const className = 'my-class'
    // When
    const { container } = render(
      <ActionMessage data={message} className={className} />
    )
    // Then
    assertCommonBehaviourForSuccess(container, message)
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render a message with type "error" when no type is provided', () => {
    // Given
    message.type = null
    // When
    const { container } = render(<ActionMessage data={message} />)
    // Then
    assertCommonBehaviourForSuccess(container, message)
    expect(container.firstChild).toHaveClass('danger')
  })

  it('should render a message with type "error" when type is "error"', () => {
    // Given
    message.type = 'error'
    // When
    const { container } = render(<ActionMessage data={message} />)
    // Then
    assertCommonBehaviourForSuccess(container, message)
    expect(container.firstChild).toHaveClass('danger')
  })

  it('should render a message with type "error" when message data is a string', () => {
    // Given
    message = 'This is a message'
    // When
    const { container } = render(<ActionMessage data={message} />)
    // Then
    assertCommonBehaviourForSuccess(container, message)
    expect(container.firstChild).toHaveClass('danger')
  })

  it('should render a message with type "success" when type is "success"', () => {
    // Given
    message.type = 'success'
    // When
    const { container } = render(<ActionMessage data={message} />)
    // Then
    assertCommonBehaviourForSuccess(container, message)
    expect(container.firstChild).toHaveClass('success')
  })

  it('should render a message with type "info" when type is "info"', () => {
    // Given
    message.type = 'info'
    // When
    const { container } = render(<ActionMessage data={message} />)
    // Then
    assertCommonBehaviourForSuccess(container, message)
    expect(container.firstChild).toHaveClass('info')
  })

  it('should render a message with type "warning" when type is "warning"', () => {
    // Given
    message.type = 'warning'
    // When
    const { container } = render(<ActionMessage data={message} />)
    // Then
    assertCommonBehaviourForSuccess(container, message)
    expect(container.firstChild).toHaveClass('warning')
  })
})

function assertCommonBehaviourForSuccess(container, message) {
  expect(container.firstChild).toHaveClass('message')
  expect(container.firstChild).toHaveTextContent(message?.text ?? message)
}
