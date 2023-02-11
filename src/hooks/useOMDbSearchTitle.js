import okResponse from '@services/omdb/data/titlesearch/ok-page-results.json'

/**
 * React Hook to interact with the results returned by
 * the OMDb API `searchTitle` endpoint invocation.
 *
 * @see https://www.omdbapi.com
 */
export const useOMDbSearchTitle = () => {
  const results = Array.from(okResponse?.Search, titleSearchResultMapper)

  return {
    results
  }
}

/**
 * @enum {string}
 * @readonly
 */
export const OMDbResultType = Object.freeze({
  MOVIE: 'movie',
  SERIES: 'series',
  EPISODE: 'episode'
})

/**
 * @typedef OMDbMoviesApiDTO
 * @type {Object}
 * @property {string} imdbID - The ID on https://www.imdb.com/
 * @property {string} Title - The title of movie or series
 * @property {string} Year - The year of release
 * @property {OMDbResultType} Type - The type of result (movie, series, episode...)
 * @property {string} Poster - The url of the poster
 */

/**
 * @typedef OMDbMoviesDTO
 * @type {Object}
 * @property {string} imdbID - The ID on https://www.imdb.com/
 * @property {string} title - The title of movie or series
 * @property {string} year - The year of release
 * @property {OMDbResultType} type - The type of result (movie, series, episode...)
 * @property {OMDbMoviePostersDTO?} posterUrls - The urls of the movie poster for diverse resolutions
 */

const titleSearchResultMapper = (/** @type {OMDbMoviesApiDTO} */ dto) =>
  /** @type {OMDbMoviesDTO} */ ({
    imdbID: dto.imdbID,
    title: dto.Title,
    year: dto.Year,
    type: dto.Type,
    posterUrls: posterUrlsExtractor(dto.Poster)
  })

/**
 * @typedef OMDbMoviePostersDTO
 * @type {Object}
 * @property {string} sx150 - Resolution: 150px
 * @property {string} sx300 - Resolution: 300px
 * @property {string} sx600 - Resolution: 600px
 * @property {string} sx1200 - Resolution: 1200px
 * @property {string} full - Resolution up to 2000x3000
 */

const rePosterUrlSize = /_SX\d+/gm

const posterUrlsExtractor = (/** @type {string} */ posterUrl) =>
  /** @type {OMDbMoviePostersDTO} */ (
    posterUrl === 'N/A'
      ? null
      : {
          sx150: posterUrl.replace(rePosterUrlSize, '_SX150'),
          sx300: posterUrl.replace(rePosterUrlSize, '_SX300'),
          sx600: posterUrl.replace(rePosterUrlSize, '_SX600'),
          sx1200: posterUrl.replace(rePosterUrlSize, '_SX1200'),
          fullsize: posterUrl.replace(rePosterUrlSize, '')
        }
  )
