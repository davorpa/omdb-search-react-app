// eslint-disable-next-line no-unused-vars
import OMDbResultType from './OMDbResultType'

/**
 * Represents the OMDb API client interface
 *
 * @interface OMDbAbstractClient
 * @memberof module:services/omdb
 * @see http://www.omdbapi.com/swagger.json
 */
export default class OMDbAbstractClient {
  #apiUrl = 'https://www.omdbapi.com/'
  #apiKey = ''

  /**
   * Creates a new instance of the OMDb Client class.
   *
   * @param {string} apiKey - The API key to use to access the OMDb API.
   * @constructs OMDbAbstractClient
   */
  constructor(apiKey) {
    this.#apiKey = apiKey
  }

  /**
   * Property to return the API url used to access the OMDb API.
   *
   * @return {string}
   * @readonly
   * @type {string}
   * @memberof OMDbAbstractClient
   * @instance
   * @protected
   */
  get apiUrl() {
    return this.#apiUrl
  }

  /**
   * Property to return the API key used to access the OMDb API.
   *
   * @return {string}
   * @readonly
   * @type {string}
   * @memberof OMDbAbstractClient
   * @instance
   * @protected
   */
  get apiKey() {
    return this.#apiKey
  }

  /**
   * Returns an array of results for a given title.
   *
   * To be implemented by the concrete implementation.
   *
   * @param {Object} searchParams - The params used to look for a result:
   * @param {string} searchParams.title - The param that represents the title of movie or series to search in.
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return
   *      (movie, series, episode, game...).
   * @param {string=} searchParams.year - The param that represents the year of release to search in.
   * @param {number=} [searchParams.page=1] - The page to fetch. Each page contains 10 items at most.
   *      Defaults to 1. A value between 1 and 100 is expected.
   * @returns {Promise<{results : import(".").OMDbMoviesDTO[], count: number}>} -
   *      A Promise resolved with the paged results and the total count of results.
   * @throws {import(".").OMDbError} - If the API returns an error.
   * @abstract
   * @memberof OMDbAbstractClient
   * @instance
   */
  titleSearch({ title, resultType, year, page = 1 } = {}) {
    throw new Error(
      'Not implemented. Please implement this abstract method in the concrete implementation'
    )
  }

  /**
   * Returns the details of a result for a given title.
   *
   * To be implemented by the concrete implementation.
   *
   * @param {Object} searchParams - The params used to look for a result:
   * @param {string} searchParams.title - The param that represents the title of movie or series to fetch details for.
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return (movie, series, episode, game...).
   * @param {string=} searchParams.year - The param that represents the year of release to fetch.
   * @param {boolean=} [searchParams.withFullPlot=false] - The param that represents if the full or short plot should be returned.
   * @returns {Promise<import(".").OMDbMovieDTO>}
   * @throws {import(".").OMDbError} - If the API returns an error.
   * @abstract
   * @memberof OMDbAbstractClient
   * @instance
   */
  getTitle({ title, resultType, year, withFullPlot = false } = {}) {
    throw new Error(
      'Not implemented. Please implement this abstract method in the concrete implementation'
    )
  }

  /**
   * Returns the details of a result for a given IMDB ID.
   *
   * To be implemented by the concrete implementation.
   *
   * @param {Object} searchParams - The params used to look for a result.
   * @param {string} searchParams.imdbID - The param that represents the IMDB ID to fetch details for.
   * @param {OMDbResultType=} searchParams.resultType - The param that represents the type of result to return (movie, series, episode, game...).
   * @param {string=} searchParams.year - The param that represents the year of release to fetch.
   * @param {boolean=} [searchParams.withFullPlot=false] - The param that represents if the full or short plot should be returned.
   * @returns {Promise<import(".").OMDbMovieDTO>}
   * @throws {import(".").OMDbError} - If the API returns an error.
   * @abstract
   * @memberof OMDbAbstractClient
   * @instance
   */
  getId({ imdbID, resultType, year, withFullPlot = false } = {}) {
    throw new Error(
      'Not implemented. Please implement this abstract method in the concrete implementation'
    )
  }
}
