import { useCallback, useReducer } from 'react'
import { GLOBAL_ACTION_MESSAGES_KEY } from '@services/action-messages/constants'
import {
  DispatcherActions,
  reducer,
  initialState
} from '@services/action-messages/reducer'

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
   * @param {string|{text: string, type: string=}} message - the message to register
   *    for the field.
   *    If it is a string, it will be rendered with type `error`.
   *    If it is an object, it must have a `text` property and a `type` property.
   *    This optional `type` property accepts one of the following values:
   *      - `error`: the message will be rendered as an error message (default).
   *      - `warning`: the message will be rendered as a warning message.
   *      - `info`: the message will be rendered as an info message.
   *      - `success`: the message will be rendered as a success message.
   */
  const addFieldActionMessage = useCallback(
    /**
     * @param {string} key
     * @param {string|{text: string, type: string=}} message
     */
    (key, message) =>
      dispatch({ type: DispatcherActions.ADD, payload: [key, message] }),
    [dispatch]
  )

  /**
   * Register a new message as a global action message.
   * @param {string|{text: string, type: string=}} message - the message to register.
   *    If it is a string, it will be rendered with type `error`.
   *    If it is an object, it must have a `text` property and a `type` property.
   *    This optional `type` property accepts one of the following values:
   *      - `error`: the message will be rendered as an error message (default).
   *      - `warning`: the message will be rendered as a warning message.
   *      - `info`: the message will be rendered as an info message.
   *      - `success`: the message will be rendered as a success message.
   */
  const addGlobalActionMessage = useCallback(
    /**
     * @param {string|{text: string, type: string=}} message
     */
    (message) =>
      dispatch({
        type: DispatcherActions.ADD,
        payload: [GLOBAL_ACTION_MESSAGES_KEY, message]
      }),
    [dispatch]
  )

  /**
   * Unregister all action messages related with a field given by its key.
   * @param {string} key - the field key to remove the messages from
   */
  const removeFieldActionMessages = useCallback(
    /**
     * @param {string} key
     */
    (key) => dispatch({ type: DispatcherActions.REMOVE, payload: key }),
    [dispatch]
  )

  /**
   * Clears all global action messages.
   */
  const removeGlobalActionMessages = useCallback(
    () =>
      dispatch({
        type: DispatcherActions.REMOVE,
        payload: GLOBAL_ACTION_MESSAGES_KEY
      }),
    [dispatch]
  )

  /**
   * Clear all action messages.
   */
  const clearActionMessages = useCallback(
    () => dispatch({ type: DispatcherActions.CLEAR }),
    [dispatch]
  )

  return {
    messages,
    addFieldActionMessage,
    addGlobalActionMessage,
    removeFieldActionMessages,
    removeGlobalActionMessages,
    clearActionMessages
  }
}
