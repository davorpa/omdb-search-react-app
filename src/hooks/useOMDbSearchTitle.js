import { titleSearchResultMapper } from '@services/omdb'
import okResponse from '@services/omdb/data/titlesearch/ok-page-results.json'

/**
 * React Hook to interact with the results returned by
 * the OMDb API `searchTitle` endpoint invocation.
 *
 * @see https://www.omdbapi.com
 */
export const useOMDbSearchTitle = () => {
  /** @type {Array<import('../services/omdb').OMDbMoviesDTO>} */
  const results = Array.from(okResponse?.Search, titleSearchResultMapper)

  return {
    results
  }
}
