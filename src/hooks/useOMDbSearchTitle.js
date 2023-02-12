import { useCallback, useState } from 'react'
import { titleSearchResultMapper } from '@services/omdb'

/**
 * React Hook to interact with the results returned by
 * the OMDb API `searchTitle` endpoint invocation.
 *
 * @param {Object} initialSearchParams -
 * @param {string=} initialSearchParams.title -
 *
 * @see https://www.omdbapi.com
 */
export const useOMDbSearchTitle = (
  initialSearchParams = {
    title: ''
  }
) => {
  const [searchParams, setSearchParams] = useState(initialSearchParams)
  const [results, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const updateSearchParam = useCallback(
    (value, key) => {
      // TODO: make binding input validations based on the key
      const newParams = { ...searchParams }
      newParams[key] = value
      setSearchParams(newParams)
    },
    [searchParams]
  )

  // TODO: Replace mocked parts by an API fetch call
  const executeSearch = useCallback(() => {
    setLoading(true)
    let fileName = Math.random() * 100 > 75 ? 'ok-page-results' : 'no-results'
    if (
      !Object.prototype.hasOwnProperty.call(searchParams, 'title') ||
      searchParams.title === ''
    ) {
      fileName = 'empty-route-param'
    } else if (/\s+/.test(searchParams.title)) {
      fileName = 'too-many-results'
    }

    import(`../services/omdb/data/titlesearch/${fileName}.json`)
      .then((data) => {
        /** @type {Array<import('../services/omdb').OMDbMoviesDTO>} */
        const results = Array.from(
          /** @type {Array<import('../services/omdb').OMDbMoviesApiDTO>} */
          data?.Search ?? [],
          titleSearchResultMapper
        ).filter((item) =>
          stringCaseInsensitiveContains(item.title, searchParams.title)
        )
        setSearchResults(results)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [searchParams])

  return {
    searchParams,
    updateSearchParam,
    loading,
    results,
    executeSearch
  }
}

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
