import { useReducer } from 'react'

/**
 * @constant {string} GLOBAL_ACTION_MESSAGES_KEY -
 *      The key to use to store global action messages.
 * @memberof module:constants
 */
export const GLOBAL_ACTION_MESSAGES_KEY = '*'

const DispatcherActions = Object.freeze({
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR'
})

const initialState = {}

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case DispatcherActions.ADD: {
      const [key, message] = actionPayload
      const newState = structuredClone(state)
      newState[key] = message
      return newState
    }
    case DispatcherActions.REMOVE: {
      const key = actionPayload
      const newState = structuredClone(state)
      delete newState[key]
      return newState
    }
    case DispatcherActions.CLEAR: {
      return initialState
    }
  }
}

/**
 * React Hook to provide operations over an action messages map.
 * @function useMessages
 * @memberof module:hooks
 */
export function useActionMessages() {
  const [messages, dispatch] = useReducer(reducer, initialState)

  /**
   * Register a new action message for a field given by its key.
   * @param {string} key - the field key to add the message to
   * @param {string} message - the message text to register for the field
   */
  const addFieldActionMessage = (key, message) =>
    dispatch({ type: DispatcherActions.ADD, payload: [key, message] })

  /**
   * Register a new message as a global action message.
   * @param {string} message - the message text to add to the field
   */
  const addGlobalActionMessage = (message) =>
    dispatch({
      type: DispatcherActions.ADD,
      payload: [GLOBAL_ACTION_MESSAGES_KEY, message]
    })

  /**
   * Unregister all action messages related with a field given by its key.
   * @param {string} key - the field key to remove the messages from
   */
  const removeFieldActionMessages = (key) =>
    dispatch({ type: DispatcherActions.REMOVE, payload: key })

  /**
   * Clears all global action messages.
   */
  const removeGlobalActionMessages = () =>
    dispatch({
      type: DispatcherActions.REMOVE,
      payload: [GLOBAL_ACTION_MESSAGES_KEY]
    })

  /**
   * Clear all action messages.
   */
  const clearActionMessages = () => dispatch({ type: DispatcherActions.CLEAR })

  return {
    messages,
    addFieldActionMessage,
    addGlobalActionMessage,
    removeFieldActionMessages,
    removeGlobalActionMessages,
    clearActionMessages
  }
}
