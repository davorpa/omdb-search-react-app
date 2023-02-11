import { forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import { GoSearch } from 'react-icons/go'
import corePropTypes from '../prop-types'

/**
 *
 */
export const SearchSubmitButton = forwardRef(
  /**
   *
   * @param {Object} props -
   * @param {string|string[]=} props.className -
   * @param {boolean=} [props.loading=false] -
   * @param {import('react').ForwardedRef<*>=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {JSX.Element} -
   */ ({ className, loading = false }, ref) => {
    return (
      <button
        ref={ref}
        type="submit"
        className={clsx(loading && 'busy', className)}
      >
        <GoSearch className={clsx(loading && 'animation-spin')} />
        Search
      </button>
    )
  }
)

SearchSubmitButton.propTypes = {
  className: corePropTypes.clsxClassName,
  loading: reactPropTypes.bool
}
