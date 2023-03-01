// eslint-disable-next-line no-unused-vars
import OMDbResultType from './OMDbResultType'
import OMDbAbstractClient from './OMDbAbstractClient'
import OMDbError from './OMDbError'
import { titleSearchResultMapper } from './data-mappers'
import { stringCaseInsensitiveContains, stringIsFalse } from '@shared/utils'

/**
 * Represents a simple OMDb client implementation that takes some JSON static files as datasource.
 *
 * Ideal for mocking purposes.
 *
 * @memberof module:services/omdb
 * @extends {OMDbAbstractClient}
 */
class OMDbJSONClient extends OMDbAbstractClient {
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
  titleSearch({ title, resultType, year, page = 1 } = {}) {
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
        /** @type {OMDbMoviesDTO[]} */
        const results = Array.from(
          /** @type {OMDbMoviesApiDTO[]} */
          data?.Search ?? [],
          titleSearchResultMapper
        ).filter((item) => stringCaseInsensitiveContains(item.title, title))
        if (filepath !== 'no-results' && stringIsFalse(data.Response)) {
          throw new OMDbError(data.Error)
        }
        return {
          results: results.slice((page - 1) * 10, page * 10),
          count: Number(data?.totalResults ?? 0)
        }
      })
      .catch((e) => {
        throw new OMDbError(e.message)
      })
  }
}

export default OMDbJSONClient
