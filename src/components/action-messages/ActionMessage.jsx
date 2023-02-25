import clsx from 'clsx'
import corePropTypes from '../prop-types'
import propTypes from './prop-types'

/**
 * A component that renders a single action message.
 * @function ActionMessage
 * @memberof module:components/action-messages
 * @param {Object} props - An object with the following properties:
 * @param {(string|string[])=} props.className -
 * @param {string|{text: string, type: string=}} props.data -
 *    Messages data can be either a string (rendered as type `error`) or an object
 *    with the following properties:
 *     - text: string
 *     - type: string. Optional. One of `error` (default), `info`, `success`, `warning`.
 */
export function ActionMessage({ data, className }) {
  /* support type (string | {text:string, type:string?}) */
  const messageText = typeof data === 'string' ? data : data?.text ?? data
  /* support type (string | {text:string, type:string?}). By default 'error' */
  const hasTypeProp =
    typeof data !== 'string' &&
    Object.prototype.hasOwnProperty.call(data, 'type')
  const messageType = typeof data === 'string' ? 'error' : data?.type ?? 'error'

  return (
    <div
      className={clsx('message', className, {
        danger: !hasTypeProp || messageType === 'error',
        info: messageType === 'info',
        success: messageType === 'success',
        warning: messageType === 'warning'
      })}
    >
      {messageText}
    </div>
  )
}

ActionMessage.displayName = 'ActionMessage'

ActionMessage.propTypes = {
  className: corePropTypes.clsxClassName,
  data: propTypes.actionMessage.isRequired
}
