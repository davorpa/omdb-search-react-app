import { forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from './prop-types'
import { OMDbResultType } from '@services/omdb'
import missingIMDbPosterImage from '../assets/missing-imdb-poster.png'

const movieTypePropType = reactPropTypes.oneOf(Object.values(OMDbResultType))

const postersPropType = reactPropTypes.exact({
  sx150: reactPropTypes.string,
  sx300: reactPropTypes.string,
  sx600: reactPropTypes.string,
  sx1200: reactPropTypes.string,
  fullsize: reactPropTypes.string
})

const moviePropType = reactPropTypes.exact({
  imdbID: reactPropTypes.string.isRequired,
  title: reactPropTypes.string.isRequired,
  type: movieTypePropType.isRequired,
  year: reactPropTypes.string.isRequired,
  posterUrls: postersPropType
})

export const PropTypes = {
  movieType: movieTypePropType,
  moviePosters: postersPropType,
  movie: moviePropType
}

/**
 * A MovieList referenced component to render a list of movie cards
 * @see MovieListItemCard
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
   * @returns {JSX.Element}
   */ ({ items, className, classNameOnEmpty = 'no-results' }, ref) => {
    const itemsLength = items?.length || 0
    const hasItems = itemsLength > 0

    if (!hasItems) {
      return (
        <div ref={ref} className={clsx('message', 'info', classNameOnEmpty)}>
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

MovieList.propTypes = {
  items: reactPropTypes.arrayOf(PropTypes.movie),
  className: corePropTypes.clsxClassName,
  classNameOnEmpty: corePropTypes.clsxClassName
}

/**
 *
 * @param {Object} props -
 * @param {import('../services/omdb').OMDbMoviesDTO} props.data -
 * @param {string|string[]=} props.className -
 * @returns {JSX.Element}
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
  data: PropTypes.movie.isRequired,
  className: corePropTypes.clsxClassName
}
