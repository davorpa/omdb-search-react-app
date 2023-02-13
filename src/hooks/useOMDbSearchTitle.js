import { useCallback, useState } from 'react'
import { useOMDbClient } from '@hooks/useOMDbClient'

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

  const executeSearch = useCallback(() => {
    setLoading(true)
    setMessages({}) // clearMessages

    omdbClient
      .titleSearch({
        title: searchParams.title
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
  }, [omdbClient, searchParams, addMessage])

  return {
    searchParams,
    updateSearchParam,
    loading,
    results,
    executeSearch,
    messages
  }
}
