import { OMDbError } from './OMDbError'

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
 * Represents a simple OMDb API client definition
 *
 * @see https://www.omdbapi.com
 */
export class OMDbClient {
  #apiUrl = 'https://www.omdbapi.com/'
  #apiKey = ''

  /**
   * @param {string} apiKey -
   * @constructor
   */
  constructor(apiKey) {
    this.#apiKey = apiKey
  }

  /**
   * Returns an array of results for a given title
   * @param {Object} searchParams - The params used to look for a result
   * @param {string} searchParams.title - The param that represents the title of movie or series to search in
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return (movie, series, episode...)
   * @param {string=} searchParams.year - The param that represents the year of release to search in
   * @param {number=} [searchParams.page=1] - The page to fetch. Each page contains 10 items at most. Defaults to 1
   * @returns {Promise<OMDbMoviesDTO>}
   */
  titleSearch({
    /** @type {string} */ title,
    /** @type {OMDbResultType=} */ resultType,
    /** @type {string=} */ year,
    /** @type {number=} */ page = 1
  } = {}) {
    let fileName = Math.random() * 100 > 75 ? 'ok-page-results' : 'no-results'
    if (title === '') {
      fileName = 'empty-route-param'
    } else if (/\s+/.test(title)) {
      fileName = 'too-many-results'
    }

    return import(`./data/titlesearch/${fileName}.json`)
      .then(({ default: data }) => {
        /** @type {Array<OMDbMoviesDTO>} */
        const results = Array.from(
          /** @type {Array<OMDbMoviesApiDTO>} */
          data?.Search ?? [],
          titleSearchResultMapper
        ).filter((item) => stringCaseInsensitiveContains(item.title, title))
        if (fileName !== 'no-results' && data.Response === 'False') {
          throw new OMDbError(data.Error)
        }
        return results
      })
      .catch((e) => {
        throw new OMDbError(e.message)
      })
  }
}

export default OMDbClient

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

function stringCaseInsensitiveEquals(a, b) {
  return typeof a === 'string' && typeof b === 'string'
    ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
    : a === b
}

function stringCaseInsensitiveContains(a, b) {
  return typeof a === 'string' && typeof b === 'string'
    ? a.toLocaleLowerCase().includes(b.toLocaleLowerCase())
    : a === b
}
