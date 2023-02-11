import PropTypes from 'prop-types'
import clsx from 'clsx'
import { GoSearch } from 'react-icons/go'

/**
 *
 * @param {Object} props
 * @param {string|string[]=} props.className
 * @param {boolean=} [props.loading=false]
 * @returns {JSX.Element}
 */
export function SearchSubmitButton({ className, loading = false }) {
  return (
    <button type="submit" className={clsx(loading && 'busy', className)}>
      <GoSearch className={clsx(loading && 'animation-spin')} />
      Search
    </button>
  )
}

SearchSubmitButton.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool
}
