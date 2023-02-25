import clsx from 'clsx'
import corePropTypes from '../prop-types'
import propTypes from './prop-types'
import { GLOBAL_ACTION_MESSAGES_KEY } from '@services/action-messages/constants'
import { ActionMessage } from './ActionMessage'

/**
 * A component that renders global action messages.
 * Global action messages are messages that are not associated with a specific
 * field, but with the whole form.
 * They are rendered in a container that is placed at the top of the form.
 *
 * @function GlobalActionMessages
 * @memberof module:components/action-messages
 * @param {Object} props - An object with the following properties:
 * @param {(string|string[])=} props.className -
 * @param {Object} props.messages -
 *    An object mapping action messages, where the key is the field path and
 *    the value is an array of messages.
 *    Messages can be either a string (rendered as type `error`) or an object
 *    with the following properties:
 *     - text: string
 *     - type: string. Optional. One of `error` (default), `info`, `success`, `warning`.
 * @returns {import('react').FunctionComponent}
 */
export function GlobalActionMessages({ messages, className }) {
  messages = messages ?? {}
  const globalMessages = messages[GLOBAL_ACTION_MESSAGES_KEY] ?? []

  if (globalMessages.length === 0) {
    return null
  }

  return (
    <div
      className={clsx('messages-container', 'is-global', className)}
      aria-live="polite"
      aria-atomic="true"
    >
      {globalMessages.map((message, index) => (
        <ActionMessage key={index} data={message} />
      ))}
    </div>
  )
}

GlobalActionMessages.displayName = 'GlobalActionMessages'

GlobalActionMessages.propTypes = {
  className: corePropTypes.clsxClassName,
  messages: propTypes.actionMessagesMap.isRequired
}
