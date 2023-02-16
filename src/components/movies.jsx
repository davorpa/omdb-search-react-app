import { forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from './prop-types'
import moviesPropTypes from './movies-prop-types'
import missingIMDbPosterImage from '../assets/missing-imdb-poster.png'

/**
 * A MovieList referenced component to render a list of movie cards
 * @see MovieListItemCard
 * @returns {import('react').FunctionComponent}
 */
export const MovieList = forwardRef(
  /**
   *
   * @param {Object} props -
   * @param {Array<import('../services/omdb').OMDbMoviesDTO>} props.items -
   * @param {string|string[]=} props.className -
   * @param {string|string[]=} [props.classNameOnEmpty="no-results"] -
   * @param {import('react').ForwardedRef<*>=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {import('react').FunctionComponent}
   */ ({ items, className, classNameOnEmpty = 'no-results' }, ref) => {
    const itemsLength = items?.length || 0
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

/**
 *
 * @param {Object} props -
 * @param {import('../services/omdb').OMDbMoviesDTO} props.data -
 * @param {string|string[]=} props.className -
 * @returns {import('react').FunctionComponent}
 */
export function MovieListItemCard({ data, className }) {
  const { imdbID, title, year, type, posterUrls } = data
  const hasPoster = !!posterUrls /** === null */

  return (
    <li
      className={clsx('card', hasPoster && 'no-poster', className)}
      data-id={imdbID}
    >
      <h3 className="card-title movie-title">{title}</h3>
      <p className="movie-year">{year}</p>
      <p className="movie-type">{type}</p>
      {hasPoster && (
        <img
          className="card-img movie-poster"
          src={posterUrls.sx300}
          alt={`"${title}"'s poster`}
        />
      )}
      {!hasPoster && (
        <img
          className="card-img movie-poster"
          src={missingIMDbPosterImage}
          alt="Missing IMDb poster"
        />
      )}
    </li>
  )
}

MovieListItemCard.propTypes = {
  data: moviesPropTypes.movie.isRequired,
  className: corePropTypes.clsxClassName
}
