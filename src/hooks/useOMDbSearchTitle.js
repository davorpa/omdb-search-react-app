import { useCallback, useRef, useState } from 'react'
import { useOMDbClient } from '@hooks/useOMDbClient'

/**
 * React Hook to interact with the results returned by
 * the OMDb API `searchTitle` endpoint invocation.
 *
 * @param {Object} initialSearchParams -
 * @param {string=} initialSearchParams.title -
 * @param {number=} initialSearchParams.year -
 *
 * @see https://www.omdbapi.com
 */
export const useOMDbSearchTitle = (
  initialSearchParams = {
    title: '',
    year: undefined
  }
) => {
  const [searchParams, setSearchParams] = useState(initialSearchParams)
  const [messages, setMessages] = useState({}) // no error messages
  const [results, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
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
     */
    (searchParams) => {
      if (previousSearchParamsRef.current === searchParams) return
      setLoading(true)
      setMessages({}) // clearMessages

      previousSearchParamsRef.current = searchParams
      omdbClient
        .titleSearch({
          title: searchParams.title,
          year: searchParams.year
        })
        .then((data) => {
          setSearchResults(data)
        })
        .catch((e) => {
          addMessage('*', e.message)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [omdbClient, addMessage]
  )

  return {
    searchParams,
    updateSearchParam,
    loading,
    results,
    executeSearch,
    messages
  }
}
