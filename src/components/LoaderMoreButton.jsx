import { forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import { ImSpinner6 } from 'react-icons/im'
import corePropTypes from './prop-types'

/**
 * `LoaderMoreButton` is a React component that renders a button
 * which can accept a click event to load more results.
 *
 * @function LoadMoreButton
 * @memberof module:components
 * @param {Object} props -
 * @param {string=} props.formId -
 *      The html id of the form that this input is a part of
 * @param {(string|string[])=} props.className -
 * @param {boolean=} [props.loading=false] -
 * @param {function=} props.onClick -
 *      A event listener to execute when the button is clicked
 * @param {import('react').ForwardedRef=} ref -
 *      A `React.useRef` reference to hook this wrapped input
 * @returns {import('react').FunctionComponent}
 */
export const LoaderMoreButton = forwardRef(
  /**
   * @param {Object} props -
   *      An object with the following properties:
   * @param {string=} props.formId -
   *      The html id of the form that this input is a part of.
   * @param {(string|string[])=} props.className -
   * @param {boolean=} [props.busy=false] -
   *      A boolean flag to indicate if the button is busy.
   * @param {function=} props.onClick -
   *      A callback function to execute when the button is clicked
   * @param {import('react').ForwardedRef=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {import('react').FunctionComponent}
   */ ({ formId, className, onClick, busy = false }, ref) => {
    return (
      <button
        ref={ref}
        form={formId}
        className={clsx('load-more', busy && 'busy', className)}
        disabled={busy}
        onClick={onClick}
      >
        {busy && <ImSpinner6 className="animation-spin" />}
        {busy ? 'Loading more...' : 'Load more...'}
      </button>
    )
  }
)

LoaderMoreButton.displayName = 'LoaderMoreButton'

LoaderMoreButton.propTypes = {
  formId: reactPropTypes.string,
  className: corePropTypes.clsxClassName,
  busy: reactPropTypes.bool,
  onClick: reactPropTypes.func
}
