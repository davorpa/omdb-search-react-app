import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useActionMessages } from '@hooks/useActionMessages'
import { GLOBAL_ACTION_MESSAGES_KEY } from '@services/action-messages/constants'

describe('useActionMessages', () => {
  it('should be defined', () => {
    expect(useActionMessages).toBeDefined()
  })

  it('should return an object', () => {
    // When
    const { result } = renderHook(() => useActionMessages())
    // Then
    expect(result.current).to.be.an('object')
  })

  it('should return an object with a "messages" property', () => {
    // When
    const { result } = renderHook(() => useActionMessages())
    // Then
    expect(result.current).to.have.ownProperty('messages')
    expect(result.current.messages).to.be.an('object')
  })

  it('should return an object with a "addFieldActionMessage" property', () => {
    // When
    const { result } = renderHook(() => useActionMessages())
    // Then
    expect(result.current).to.have.ownProperty('addFieldActionMessage')
    expect(result.current.addFieldActionMessage).to.be.a('function')
  })

  it('should return an object with a "addGlobalActionMessage" property', () => {
    // When
    const { result } = renderHook(() => useActionMessages())
    // Then
    expect(result.current).to.have.ownProperty('addGlobalActionMessage')
    expect(result.current.addGlobalActionMessage).to.be.a('function')
  })

  it('should return an object with a "removeFieldActionMessages" property', () => {
    // When
    const { result } = renderHook(() => useActionMessages())
    // Then
    expect(result.current).to.have.ownProperty('removeFieldActionMessages')
    expect(result.current.removeFieldActionMessages).to.be.a('function')
  })

  it('should return an object with a "removeGlobalActionMessages" property', () => {
    // When
    const { result } = renderHook(() => useActionMessages())
    // Then
    expect(result.current).to.have.ownProperty('removeGlobalActionMessages')
    expect(result.current.removeGlobalActionMessages).to.be.a('function')
  })

  it('should return an object with a "clearActionMessages" property', () => {
    // When
    const { result } = renderHook(() => useActionMessages())
    // Then
    expect(result.current).to.have.ownProperty('clearActionMessages')
    expect(result.current.clearActionMessages).to.be.a('function')
  })

  it('should fill the "messages" property with values accordingly if a field message is added/removed', () => {
    // Given
    const { result } = renderHook(() => useActionMessages())
    // When adding a field message...
    act(() => {
      result.current.addFieldActionMessage('field1', 'message1')
    })
    // Then... added as MultiValuedMap key
    expect(result.current.messages).toHaveProperty('field1', ['message1'])

    // When adding another field message...
    act(() => {
      result.current.addFieldActionMessage('field1', 'message2')
    })
    // Then... added as MultiValuedMap value too
    expect(result.current.messages).toHaveProperty('field1', [
      'message1',
      'message2'
    ])

    // When adding a different field message...
    act(() => {
      result.current.addFieldActionMessage('field2', 'message3')
    })
    // Then... added as MultiValuedMap key
    expect(result.current.messages).toHaveProperty('field2', ['message3'])

    // When removing one field messages...
    act(() => {
      result.current.removeFieldActionMessages('field1')
    })
    // Then... removed as MultiValuedMap key
    expect(result.current.messages).not.toHaveProperty('field1')

    // When clear all messages...
    act(() => {
      result.current.clearActionMessages()
    })
    // Then... removed as MultiValuedMap key
    expect(result.current.messages).to.deep.equal({})
  })

  it('should fill the "messages" property with values accordingly if a global message is added/removed', () => {
    // Given
    const { result } = renderHook(() => useActionMessages())
    // When adding a global message...
    act(() => {
      result.current.addGlobalActionMessage('message1')
    })
    // Then... added as MultiValuedMap key
    expect(result.current.messages).toHaveProperty(GLOBAL_ACTION_MESSAGES_KEY, [
      'message1'
    ])

    // When adding another global message...
    act(() => {
      result.current.addGlobalActionMessage('message2')
    })
    // Then... added as MultiValuedMap value too
    expect(result.current.messages).toHaveProperty(GLOBAL_ACTION_MESSAGES_KEY, [
      'message1',
      'message2'
    ])

    // When removing one global messages...
    act(() => {
      result.current.removeGlobalActionMessages()
    })
    // Then... removed as MultiValuedMap key
    expect(result.current.messages).not.toHaveProperty(
      GLOBAL_ACTION_MESSAGES_KEY
    )

    // When clear all messages...
    act(() => {
      result.current.clearActionMessages()
    })
    // Then... removed as MultiValuedMap key
    expect(result.current.messages).to.deep.equal({})
  })
})
