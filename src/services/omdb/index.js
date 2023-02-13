import { OMDbError } from './OMDbError'
import titleSearchWithoutResultsResponse from './data/titlesearch/no-results.json'

/**
 * @enum {string}
 * @readonly
 */
export const OMDbFormatType = Object.freeze({
  JSON: 'json',
  XML: 'xml'
})

/**
 * @enum {string}
 * @readonly
 */
export const OMDbResultType = Object.freeze({
  MOVIE: 'movie',
  SERIES: 'series',
  EPISODE: 'episode',
  GAME: 'game'
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
 * @property {OMDbResultType} Type - The type of result (movie, series, episode, game...)
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
 * @property {OMDbResultType} type - The type of result (movie, series, episode, game...)
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
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return (movie, series, episode, game...)
   * @param {string=} searchParams.year - The param that represents the year of release to search in
   * @param {number=} [searchParams.page=1] - The page to fetch. Each page contains 10 items at most. Defaults to 1
   * @returns {Promise<OMDbMoviesDTO>}
   */
  async titleSearch({
    /** @type {string} */ title,
    /** @type {OMDbResultType=} */ resultType,
    /** @type {string=} */ year,
    /** @type {number=} */ page = 1
  } = {}) {
    const requestUrl = new URL(this.#apiUrl)
    const requestHeaders = new Headers()
    // configure request
    this.#setupRequest(requestUrl, requestHeaders)
    title && requestUrl.searchParams.append('s', title)
    resultType && requestUrl.searchParams.append('type', resultType)
    year && requestUrl.searchParams.append('y', year)
    // execute request
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: requestHeaders
    })
    // parse and make the response DTO mapping
    const data = await this.#processResponseJSON(response)
    return Array.from(data?.Search ?? [], titleSearchResultMapper)
  }

  /**
   *
   * @protected
   * @param {URL} url -
   * @param {Headers} headers -
   */
  #setupRequest(/** @type {URL} */ url, /** @type {Headers} */ headers) {
    url.searchParams.set('apikey', this.#apiKey || '')
    url.searchParams.set('r', OMDbFormatType.JSON)
    headers.append('Accept', 'application/json')
  }

  /**
   *
   * @protected
   * @param {Response} response -
   * @throws {OMDbError}
   * @returns {Object}
   */
  async #processResponseJSON(/** @type {Response} */ response) {
    // parse response
    let data = {}
    let error = null
    try {
      data = await response.json()
    } catch (e) {
      error = e
    }
    // customize error extracted from parsed response
    if (data.Error || data.Response === 'False') {
      if (
        !stringCaseInsensitiveEquals(
          data.Error,
          titleSearchWithoutResultsResponse.Error
        )
      ) {
        throw new OMDbError(
          `E${response.status}: ${data.Error || response.statusText}`
        )
      }
    }
    if (!response.ok) {
      throw new OMDbError(`E${response.status}: ${response.statusText}`)
    }
    if (error !== null) throw new OMDbError(error)
    // return valid response JSON data
    return data
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
