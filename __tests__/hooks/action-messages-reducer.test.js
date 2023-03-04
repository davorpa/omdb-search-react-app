import { describe, it, expect } from 'vitest'
import {
  DispatcherActions,
  initialState,
  reducer
} from '@services/action-messages/reducer'

describe('action-messages::reducer -> ADD', () => {
  it('should create a new key with a single message as value of multimap', () => {
    // Given
    const state = initialState
    const action = { type: DispatcherActions.ADD, payload: ['key', 'message'] }
    // When
    const newState = reducer(state, action)
    // Then
    expect(newState).to.not.equal(state) // ensure immutability
    expect(newState).to.deep.equal({ key: ['message'] })
  })

  it('should append a message to an existing key', () => {
    // Given
    const state = { key: ['message'] }
    const action = { type: DispatcherActions.ADD, payload: ['key', 'message2'] }
    // When
    const newState = reducer(state, action)
    // Then
    expect(newState).to.not.equal(state) // ensure immutability
    expect(newState).to.deep.equal({ key: ['message', 'message2'] })
  })
})

describe('action-messages::reducer -> REMOVE', () => {
  it('should remove an existing key', () => {
    // Given
    const state = { key: ['message'] }
    const action = { type: DispatcherActions.REMOVE, payload: 'key' }
    // When
    const newState = reducer(state, action)
    // Then
    expect(newState).to.not.equal(state) // ensure immutability
    expect(newState).to.deep.equal({})
  })

  it('should do nothing if key does not exist', () => {
    // Given
    const state = { key: ['message'] }
    const action = { type: DispatcherActions.REMOVE, payload: 'key2' }
    // When
    const newState = reducer(state, action)
    // Then
    expect(newState).to.not.equal(state) // ensure immutability
    expect(newState).to.deep.equal(state)
  })
})

describe('action-messages::reducer -> CLEAR', () => {
  it('should clear all keys', () => {
    // Given
    const state = { key: ['message'] }
    const action = { type: DispatcherActions.CLEAR }
    // When
    const newState = reducer(state, action)
    // Then
    expect(newState).to.not.equal(state) // ensure immutability
    expect(newState).to.equal(initialState)
  })
})
