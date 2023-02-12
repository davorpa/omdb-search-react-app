import { useCallback, useState } from 'react'
import { titleSearchResultMapper } from '@services/omdb'
import okResponse from '@services/omdb/data/titlesearch/ok-page-results.json'

/**
 * React Hook to interact with the results returned by
 * the OMDb API `searchTitle` endpoint invocation.
 *
 * @see https://www.omdbapi.com
 * @param {Object} initialSearchParams
 * @param {string=} initialSearchParams.title
 */
export const useOMDbSearchTitle = (
  initialSearchParams = {
    title: ''
  }
) => {
  const [searchParams, setSearchParams] = useState(initialSearchParams)
  const updateSearchParam = useCallback(
    (value, key) => {
      const newParams = { ...searchParams }
      newParams[key] = value
      setSearchParams(newParams)
    },
    [searchParams]
  )

  // TODO: Replace mocks by an API fetch
  /** @type {Array<import('../services/omdb').OMDbMoviesDTO>} */
  const results = Array.from(okResponse?.Search, titleSearchResultMapper)

  return {
    searchParams,
    updateSearchParam,
    results
  }
}
