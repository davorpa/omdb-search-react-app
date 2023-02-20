import { useCallback, useMemo, useRef, useState } from 'react'
import getProperty from 'just-safe-get'
import { useOMDbClient } from '@hooks/useOMDbClient'
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
  const [messages, setMessages] = useState({}) // no error messages
  const [results, setSearchResults] = useState([])
  const [totalResults, setTotalResults] = useState(results.length)
  const [loading, setLoading] = useState(false)
  /** @type {import('../services/omdb').OMDbAbstractClient} */
  const omdbClient = useOMDbClient()

  const addMessage = useCallback(
    (key, messageText) => {
      const newMessages = { ...messages }
      newMessages[key] = messageText
      setMessages(newMessages)
    },
    [messages]
  )

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
  const executeSearch = useCallback(
    /**
     * @param {Object} searchParams
     * @param {string=} searchParams.title -
     * @param {number=} searchParams.year -
     * @param {string=} searchParams.type -
     */
    (searchParams) => {
      if (previousSearchParamsRef.current === searchParams) {
        return
      }
      setLoading(true)
      setMessages({}) // clearMessages

      previousSearchParamsRef.current = searchParams
      omdbClient
        .titleSearch({
          title: searchParams.title,
          year: searchParams.year,
          resultType: searchParams.type,
          page: 1
        })
        .then(({ results: data, count }) => {
          setSearchResults(data)
          setTotalResults(count)
        })
        .catch((e) => {
          addMessage('*', e.message) // assume all errors are global
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [omdbClient, addMessage]
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
    loading,
    results: processedResults,
    totalResults,
    executeSearch,
    messages
  }
}
