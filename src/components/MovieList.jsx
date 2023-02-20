import { forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from './prop-types'
import moviesPropTypes from './movies-prop-types'
import { MovieListItemCard } from '@components/MovieListItemCard'

/**
 * The `MovieList` referenced React component renders a list of movie cards
 * or a message if no movies are provided.
 *
 * @function MovieList
 * @memberof module:components
 * @param {Object} props -
 *      An object containing the following properties:
 * @param {import('../services/omdb').OMDbMoviesDTO[]} props.items -
 * @param {(string|string[])=} props.className -
 * @param {(string|string[])=} [props.classNameOnEmpty="no-results"] -
 * @returns {import('react').FunctionComponent}
 * @see module:components.MovieListItemCard
 */
export const MovieList = forwardRef(
  /**
   * @param {Object} props -
   *      An object containing the following properties:
   * @param {import('../services/omdb').OMDbMoviesDTO[]} props.items -
   * @param {(string|string[])=} props.className -
   * @param {(string|string[])=} [props.classNameOnEmpty="no-results"] -
   * @param {import('react').ForwardedRef=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {import('react').FunctionComponent}
   */ ({ items, className, classNameOnEmpty = 'no-results' }, ref) => {
    const itemsLength = items?.length ?? 0
    const hasItems = itemsLength > 0

    if (!hasItems) {
      return (
        <div
          ref={ref}
          className={clsx('message', 'info', 'text-center', classNameOnEmpty)}
        >
          No results
        </div>
      )
    }
    return (
      <ul ref={ref} className={clsx(className)}>
        {items.map((movie) => (
          <MovieListItemCard key={movie.imdbID} data={movie} />
        ))}
      </ul>
    )
  }
)

MovieList.displayName = 'MovieList'

MovieList.propTypes = {
  items: reactPropTypes.arrayOf(moviesPropTypes.movie),
  className: corePropTypes.clsxClassName,
  classNameOnEmpty: corePropTypes.clsxClassName
}
