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
 *
 * @param {Object} props
 * @param {Array<import('../services/omdb').OMDbMoviesDTO>} props.items
 * @param {string|string[]=} props.className
 * @param {string|string[]=} [props.classNameOnEmpty="no-results"]
 * @returns {JSX.Element}
 */
export function MovieList({
  items,
  className,
  classNameOnEmpty = 'no-results'
}) {
  const itemsLength = items?.length || 0
  const hasItems = itemsLength > 0

  if (!hasItems) return <p className={clsx(classNameOnEmpty)}>No results</p>
  return (
    <ul className={clsx(className)}>
      {items.map((movie) => (
        <MovieListItemCard key={movie.imdbID} data={movie} />
      ))}
    </ul>
  )
}

MovieList.propTypes = {
  items: reactPropTypes.arrayOf(PropTypes.movie),
  className: corePropTypes.clsxClassName,
  classNameOnEmpty: corePropTypes.clsxClassName
}

/**
 *
 * @param {Object} props
 * @param {import('../services/omdb').OMDbMoviesDTO} props.data
 * @param {string|string[]=} props.className
 * @returns {JSX.Element}
 */
export function MovieListItemCard({ data, className }) {
  const { imdbID, title, year, type, posterUrls } = data
  const hasPoster = !!posterUrls /** === null */

  return (
    <li className={clsx(className)} data-id={imdbID}>
      <h3>{title}</h3>
      <p>{year}</p>
      <p>{type}</p>
      {hasPoster && <img src={posterUrls.sx300} alt={`"${title}"'s poster`} />}
      {!hasPoster && (
        <img src={missingIMDbPosterImage} alt="Missing IMDb poster" />
      )}
    </li>
  )
}

MovieListItemCard.propTypes = {
  data: moviePropType.isRequired,
  className: corePropTypes.clsxClassName
}
