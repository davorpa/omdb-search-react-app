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
 * The type definition for an OMDb result item returned by
 * the {@linkcode OMDbClient#titleSearch} API operation.
 *
 * @typedef OMDbMoviesApiDTO
 * @type {Object}
 * @property {string} imdbID - The ID on https://www.imdb.com/
 * @property {string} Title - The title of movie or series
 * @property {string} Year - The year of release
 * @property {OMDbResultType} Type - The type of result (movie, series, episode...)
 * @property {string} Poster - The url of the poster
 */

/**
 * The type definition for one OMDb result item returned by
 * the {@linkcode OMDbClient#titleSearch} method.
 *
 * @typedef OMDbMoviesDTO
 * @type {Object}
 * @property {string} imdbID - The ID on https://www.imdb.com/
 * @property {string} title - The title of movie or series
 * @property {string} year - The year of release
 * @property {OMDbResultType} type - The type of result (movie, series, episode...)
 * @property {OMDbMoviePostersDTO?} posterUrls - The urls of the movie poster for diverse resolutions
 */

/**
 * The type definition for one OMDb poster URL entity
 *
 * @typedef OMDbMoviePostersDTO
 * @type {Object}
 * @property {string} sx150 - Resolution: 150px
 * @property {string} sx300 - Resolution: 300px
 * @property {string} sx600 - Resolution: 600px
 * @property {string} sx1200 - Resolution: 1200px
 * @property {string} full - Resolution up to 2000x3000
 */

export const titleSearchResultMapper = (/** @type {OMDbMoviesApiDTO} */ dto) =>
  /** @type {OMDbMoviesDTO} */ ({
    imdbID: dto.imdbID,
    title: dto.Title,
    year: dto.Year,
    type: dto.Type,
    posterUrls: posterUrlsExtractor(dto.Poster)
  })

const rePosterUrlSize = /_SX\d+/gm

export const posterUrlsExtractor = (/** @type {string} */ posterUrl) =>
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
