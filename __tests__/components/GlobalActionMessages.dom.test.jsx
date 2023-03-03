import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { GlobalActionMessages } from '@components/action-messages'
import { GLOBAL_ACTION_MESSAGES_KEY } from '@services/action-messages/constants'

describe('GlobalActionMessages component', () => {
  let messages

  beforeEach(() => {
    // Given
    messages = {
      [GLOBAL_ACTION_MESSAGES_KEY]: [
        {
          text: 'Error message',
          type: 'error'
        },
        {
          text: 'Success message',
          type: 'success'
        }
      ]
    }
  })

  it('should render without problems', () => {
    render(<GlobalActionMessages />)
    expect(true).toBeTruthy()
  })

  it('should render nothing when no messages are provided', () => {
    // Given
    // When
    const { container } = render(<GlobalActionMessages />)
    // Then
    expect(container).toBeEmptyDOMElement()
  })

  it('should render nothing when no messages are a empty object', () => {
    // Given
    messages = {}
    // When
    const { container } = render(<GlobalActionMessages messages={messages} />)
    // Then
    expect(container).toBeEmptyDOMElement()
  })

  it('should render nothing when global messages are not present', () => {
    // Given
    messages = {
      'field.path': [
        {
          text: 'Error message',
          type: 'error'
        }
      ]
    }
    // When
    const { container } = render(<GlobalActionMessages messages={messages} />)
    // Then
    expect(container).toBeEmptyDOMElement()
  })

  it('should render nothing when global messages are an empty list', () => {
    // Given
    messages = {
      [GLOBAL_ACTION_MESSAGES_KEY]: []
    }
    // When
    const { container } = render(<GlobalActionMessages messages={messages} />)
    // Then
    expect(container).toBeEmptyDOMElement()
  })

  it('should render same number of messages when global messages are a fullfilled list', () => {
    // Given
    // When
    const { container } = render(<GlobalActionMessages messages={messages} />)
    // Then
    expect(container.firstChild).toHaveClass('messages-container', 'is-global')
    expect(container.querySelectorAll('.message')).to.have.lengthOf(
      messages[GLOBAL_ACTION_MESSAGES_KEY].length
    )
  })
})
