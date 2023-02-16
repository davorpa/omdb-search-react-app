import { forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import { GoSearch } from 'react-icons/go'
import corePropTypes from '../prop-types'

/**
 * A SearchSubmitButton React component
 * @returns {import('react').FunctionComponent}
 */
export const SearchSubmitButton = forwardRef(
  /**
   *
   * @param {Object} props -
   * @param {string=} props.formId -
   *      The html id of the form that this input is a part of
   * @param {string|string[]=} props.className -
   * @param {boolean=} [props.loading=false] -
   * @param {import('react').ForwardedRef<*>=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {import('react').FunctionComponent}
   */ ({ formId, className, loading = false }, ref) => {
    return (
      <button
        ref={ref}
        form={formId}
        type="submit"
        className={clsx(loading && 'busy', className)}
      >
        <GoSearch className={clsx(loading && 'animation-spin')} />
        Search
      </button>
    )
  }
)

SearchSubmitButton.displayName = 'SearchSubmitButton'

SearchSubmitButton.propTypes = {
  formId: reactPropTypes.string,
  className: corePropTypes.clsxClassName,
  loading: reactPropTypes.bool
}
