import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from './prop-types'

/**
 * `PagerShowingCountOf` is a React component that renders the pager information
 * for the current page of results.
 *
 * @function PagerShowingCountOf
 * @memberof module:components
 * @param {Object} props -
 *      An object with the following properties:
 * @param {(string|string[])=} props.className -
 * @param {number} props.count - Number of items in the current page
 * @param {number} props.total - Total number of items
 * @returns {import('react').FunctionComponent}
 */
export function PagerShowingCountOf({ className, count, total }) {
  return (
    <div className={clsx('pager', className)}>
      {'Showing '}
      <span className="pager-count">{count}</span>
      {' of '}
      <span className="pager-total">{total}</span>
      {total === 1 ? ' item ' : ' items'}
    </div>
  )
}

PagerShowingCountOf.displayName = 'PagerShowingCountOf'

PagerShowingCountOf.propTypes = {
  className: corePropTypes.clsxClassName,
  count: reactPropTypes.number.isRequired,
  total: reactPropTypes.number.isRequired
}
