// eslint-disable-next-line no-unused-vars
import OMDbResultType from './OMDbResultType'
import OMDbAbstractClient from './OMDbAbstractClient'
import OMDbError from './OMDbError'
import { titleSearchResultMapper } from './data-mappers'
import titleSearchWithoutResultsResponse from './data/titlesearch/no-results.json'
import { stringCaseInsensitiveEquals, stringIsFalse } from '@shared/utils'

/**
 * The OMDb Format Type enum.
 * @enum {string}
 * @readonly
 * @memberof module:services/omdb
 */
const OMDbFormatType = Object.freeze({
  /**
   * The "JSON" enum value.
   * @memberof OMDbFormatType
   */
  JSON: 'json',
  /**
   * The "XML" enum value.
   * @memberof OMDbFormatType
   */
  XML: 'xml'
})

/**
 * Represents a simple OMDb API client implementation
 *
 * @memberof module:services/omdb
 * @extends {OMDbAbstractClient}
 * @see https://www.omdbapi.com
 */
class OMDbClient extends OMDbAbstractClient {
  /**
   * Returns an array of results for a given title.
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
   * @override
   */
  async titleSearch({ title, resultType, year, page = 1 } = {}) {
    const requestUrl = new URL(this.apiUrl)
    const requestHeaders = new Headers()
    // configure request
    this.#setupRequest(requestUrl, requestHeaders)
    title && requestUrl.searchParams.append('s', title)
    resultType && requestUrl.searchParams.append('type', resultType)
    year && requestUrl.searchParams.append('y', year)
    page && requestUrl.searchParams.append('page', page)
    // execute request
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: requestHeaders
    })
    // parse and make the response DTO mapping
    const data = await this.#processResponseJSON(response)
    return {
      results: Array.from(data?.Search ?? [], titleSearchResultMapper),
      count: Number(data?.totalResults ?? 0)
    }
  }

  /**
   * Sets up the request URL and headers.
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
   * Parses the HTTP response and returns the JSON data.
   * @protected
   * @param {Response} response -
   * @throws {import(".").OMDbError}
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
