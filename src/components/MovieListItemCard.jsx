import clsx from 'clsx'
import corePropTypes from './prop-types'
import moviesPropTypes from './movies-prop-types'
import missingIMDbPosterImage from '../assets/missing-imdb-poster.png'

/**
 * MovieListItemCard referenced components render a movie as a card
 *
 * @function MovieListItemCard
 * @memberof module:components
 * @param {Object} props -
 *      An object containing the following properties:
 * @param {import('../services/omdb').OMDbMoviesDTO} props.data -
 * @param {(string|string[])=} props.className -
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
          loading="lazy"
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
