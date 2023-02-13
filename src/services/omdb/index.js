import { OMDbError } from './OMDbError'
import titleSearchWithoutResultsResponse from './data/titlesearch/no-results.json'
import {
  stringCaseInsensitiveContains,
  stringCaseInsensitiveEquals,
  stringIsFalse
} from '../utils'

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
 * Represents the OMDb API client interface
 *
 * @see http://www.omdbapi.com/swagger.json
 * @interface
 */
class OMDbAbstractClient {
  #apiUrl = 'https://www.omdbapi.com/'
  #apiKey = ''

  /**
   * @param {string} apiKey -
   * @constructor
   */
  constructor(apiKey) {
    this.#apiKey = apiKey
  }

  get apiUrl() {
    return this.#apiUrl
  }

  get apiKey() {
    return this.#apiKey
  }

  /**
   * Returns an array of results for a given title.
   *
   * To be implemented by the concrete implementation.
   *
   * @param {Object} searchParams - The params used to look for a result
   * @param {string} searchParams.title - The param that represents the title of movie or series to search in
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return (movie, series, episode, game...)
   * @param {string=} searchParams.year - The param that represents the year of release to search in
   * @param {number=} [searchParams.page=1] - The page to fetch. Each page contains 10 items at most. Defaults to 1
   * @returns {Promise<Array<OMDbMoviesDTO>>}
   * @throws {OMDbError} - If the API returns an error
   * @abstract
   */
  titleSearch({
    /** @type {string} */ title,
    /** @type {OMDbResultType=} */ resultType,
    /** @type {string=} */ year,
    /** @type {number=} */ page = 1
  } = {}) {
    throw new Error(
      'Not implemented. Please implement this abstract method in the concrete implementation'
    )
  }

  /**
   * Returns the details of a result for a given title.
   *
   * To be implemented by the concrete implementation.
   *
   * @param {Object} searchParams - The params used to look for a result
   * @param {string} searchParams.title - The param that represents the title of movie or series to fetch details for
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return (movie, series, episode, game...)
   * @param {string=} searchParams.year - The param that represents the year of release to fetch
   * @param {boolean=} [searchParams.withFullPlot=false] - The param that represents if the full or short plot should be returned
   * @returns {Promise<OMDbMovieDTO>}
   * @throws {OMDbError} - If the API returns an error
   * @abstract
   */
  getTitle({
    /** @type {string} */ title,
    /** @type {OMDbResultType=} */ resultType,
    /** @type {string=} */ year,
    /** @type {boolean=} */ withFullPlot = false
  } = {}) {
    throw new Error(
      'Not implemented. Please implement this abstract method in the concrete implementation'
    )
  }

  /**
   * Returns the details of a result for a given IMDB ID.
   *
   * To be implemented by the concrete implementation.
   *
   * @param {Object} searchParams - The params used to look for a result
   * @param {string} searchParams.imdbID - The param that represents the IMDB ID to fetch details for
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return (movie, series, episode, game...)
   * @param {string=} searchParams.year - The param that represents the year of release to fetch
   * @param {boolean=} [searchParams.withFullPlot=false] - The param that represents if the full or short plot should be returned
   * @returns {Promise<OMDbMovieDTO>}
   * @throws {OMDbError} - If the API returns an error
   * @abstract
   */
  getId({
    /** @type {string} */ imdbID,
    /** @type {OMDbResultType=} */ resultType,
    /** @type {string=} */ year,
    /** @type {boolean=} */ withFullPlot = false
  } = {}) {
    throw new Error(
      'Not implemented. Please implement this abstract method in the concrete implementation'
    )
  }
}

/**
 * Represents a simple OMDb client implementation that takes some JSON static files as datasource.
 *
 * Ideal for mocking purposes.
 */
export class OMDbJSONClient extends OMDbAbstractClient {
  /**
   * Returns an array of results for a given title.
   *
   * @param {Object} searchParams - The params used to look for a result
   * @param {string} searchParams.title - The param that represents the title of movie or series to search in
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return (movie, series, episode, game...)
   * @param {string=} searchParams.year - The param that represents the year of release to search in
   * @param {number=} [searchParams.page=1] - The page to fetch. Each page contains 10 items at most. Defaults to 1
   * @returns {Promise<Array<OMDbMoviesDTO>>}
   * @throws {OMDbError} - If the API returns an error
   * @override
   */
  titleSearch({
    /** @type {string} */ title,
    /** @type {OMDbResultType=} */ resultType,
    /** @type {string=} */ year,
    /** @type {number=} */ page = 1
  } = {}) {
    let filepath = Math.random() * 100 > 85 ? 'ok-page-results' : 'no-results'
    if (/\s+/.test(this.apiKey)) {
      filepath = '../no-api-key'
    } else if (/\s+/.test(this.apiKey) || this.apiKey === '1234') {
      filepath = '../invalid-api-key'
    } else if (title === '') {
      filepath = 'empty-route-param'
    } else if (/\s+/.test(title)) {
      filepath = 'too-many-results'
    }

    return import(`./data/titlesearch/${filepath}.json`)
      .then(({ default: data }) => {
        /** @type {Array<OMDbMoviesDTO>} */
        const results = Array.from(
          /** @type {Array<OMDbMoviesApiDTO>} */
          data?.Search ?? [],
          titleSearchResultMapper
        ).filter((item) => stringCaseInsensitiveContains(item.title, title))
        if (filepath !== 'no-results' && stringIsFalse(data.Response)) {
          throw new OMDbError(data.Error)
        }
        return results
      })
      .catch((e) => {
        throw new OMDbError(e.message)
      })
  }
}

/**
 * Represents a simple OMDb API client implementation
 *
 * @see https://www.omdbapi.com
 */
export class OMDbClient extends OMDbAbstractClient {
  /**
   * Returns an array of results for a given title
   *
   * @param {Object} searchParams - The params used to look for a result
   * @param {string} searchParams.title - The param that represents the title of movie or series to search in
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return (movie, series, episode, game...)
   * @param {string=} searchParams.year - The param that represents the year of release to search in
   * @param {number=} [searchParams.page=1] - The page to fetch. Each page contains 10 items at most. Defaults to 1
   * @returns {Promise<Array<OMDbMoviesDTO>>}
   * @throws {OMDbError} - If the API returns an error
   * @override
   */
  async titleSearch({
    /** @type {string} */ title,
    /** @type {OMDbResultType=} */ resultType,
    /** @type {string=} */ year,
    /** @type {number=} */ page = 1
  } = {}) {
    const requestUrl = new URL(this.apiUrl)
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
    url.searchParams.set('apikey', this.apiKey || '')
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
    if (stringIsFalse(data.Response) || data.Error) {
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
