import propTypes from 'prop-types'
import { OMDbResultType } from '@services/omdb'
import missingIMDbPosterImage from '../assets/missing-imdb-poster.png'

const movieTypePropType = propTypes.oneOf(Object.values(OMDbResultType))

const postersPropType = propTypes.exact({
  sx150: propTypes.string,
  sx300: propTypes.string,
  sx600: propTypes.string,
  sx1200: propTypes.string,
  fullsize: propTypes.string
})

const moviePropType = propTypes.exact({
  imdbID: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  type: movieTypePropType.isRequired,
  year: propTypes.string.isRequired,
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
 * @returns {JSX.Element}
 */
export function MovieList({ items }) {
  const itemsLength = items?.length || 0
  const hasItems = itemsLength > 0

  if (!hasItems) return <p>No results</p>
  return (
    <ul>
      {items.map((movie) => (
        <MovieListItemCard key={movie.imdbID} data={movie} />
      ))}
    </ul>
  )
}

MovieList.propTypes = {
  items: propTypes.arrayOf(PropTypes.movie)
}

/**
 *
 * @param {Object} props
 * @param {import('../services/omdb').OMDbMoviesDTO} props.data
 * @returns {JSX.Element}
 */
export function MovieListItemCard({ data }) {
  const { imdbID, title, year, type, posterUrls } = data
  const hasPoster = !!posterUrls
  return (
    <li data-id={imdbID}>
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
  data: moviePropType.isRequired
}
