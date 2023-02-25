import { useCallback, useMemo, useRef, useState } from 'react'
import getProperty from 'just-safe-get'
import { useOMDbClient } from '@hooks/useOMDbClient'
import { useActionMessages } from '@hooks/useActionMessages'
import { stringCaseInsensitiveCompare } from '@services/utils'

const defaultSearchParams = {
  title: '',
  year: '',
  type: ''
}

/**
 * React Hook to interact with the results returned by
 * the OMDb API `searchTitle` endpoint invocation.
 *
 * @function useOMDbSearchTitle
 * @memberof module:hooks
 * @param {Object} initialSearchParams -
 *      The initial search parameters to use. One of..
 * @param {string=} initialSearchParams.title -
 * @param {number=} initialSearchParams.year -
 * @param {string=} initialSearchParams.type -
 * @param {string=} sortBy - The property key to sort the results by.
 * @param {string=} sortDir - The direction to sort the results by.
 * @see https://www.omdbapi.com
 */
export const useOMDbSearchTitle = (
  initialSearchParams = defaultSearchParams,
  sortBy,
  sortDir = false
) => {
  initialSearchParams = Object.assign(
    {},
    defaultSearchParams,
    initialSearchParams
  ) // Ensure each defaults are set
  const [searchParams, setSearchParams] = useState(initialSearchParams)
  const [loadedPage, setLoadedPage] = useState(1) // 1-100
  const { messages, addGlobalActionMessage, clearActionMessages } =
    useActionMessages()
  const [results, setSearchResults] = useState([])
  const [totalResults, setTotalResults] = useState(results.length)
  const [loading, setLoading] = useState(false)
  /** @type {import('../services/omdb').OMDbAbstractClient} */
  const omdbClient = useOMDbClient()

  const updateSearchParam = useCallback(
    (value, key) => {
      // TODO: make binding input validations based on the key
      const newParams = { ...searchParams }
      newParams[key] = value
      setSearchParams(newParams)
    },
    [searchParams]
  )

  const previousSearchParamsRef = useRef(searchParams)
  const previousLoadedPageRef = useRef(loadedPage)
  const executeSearch = useCallback(
    /**
     * @param {Object} searchParams
     * @param {string=} searchParams.title -
     * @param {number=} searchParams.year -
     * @param {string=} searchParams.type -
     * @param {number=} page - The page number to fetch.
     *      A value between 1 and 100 is expected.
     */
    (searchParams, page) => {
      const searchParamsChanged =
        previousSearchParamsRef.current !== searchParams
      const pageChanged = previousLoadedPageRef.current !== page
      if (!(searchParamsChanged || pageChanged)) {
        return
      }
      setLoading(true)
      // clear all messages
      clearActionMessages()
      // fix page if search params have changed
      setLoadedPage(searchParamsChanged ? 1 : page)

      previousSearchParamsRef.current = searchParams
      previousLoadedPageRef.current = page
      omdbClient
        .titleSearch({
          title: searchParams.title,
          year: searchParams.year,
          resultType: searchParams.type,
          page
        })
        .then(({ results: data, count }) => {
          setTotalResults(count)
          page <= 1 || searchParamsChanged
            ? setSearchResults(data) // reset results
            : setSearchResults((results) => results.concat(data)) // append results
        })
        .catch((e) => {
          // assuming all errors are global
          addGlobalActionMessage(e.message)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [omdbClient, addGlobalActionMessage, clearActionMessages]
  )

  const processedResults = useMemo(() => {
    const sortDirFactor = sortDir === true || sortDir === 'desc' ? -1 : 1
    if (!sortBy) {
      return sortDirFactor < 0 ? [...results].reverse() : results
    }
    return [...results].sort(
      (a, b) =>
        sortDirFactor *
        stringCaseInsensitiveCompare(
          getProperty(a, sortBy),
          getProperty(b, sortBy)
        )
    )
  }, [results, sortBy, sortDir])

  return {
    searchParams,
    updateSearchParam,
    loadedPage,
    hasMorePages: processedResults.length < totalResults,
    loading,
    results: processedResults,
    totalResults,
    executeSearch,
    messages
  }
}
