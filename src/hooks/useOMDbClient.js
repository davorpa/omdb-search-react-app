import { useContext } from 'react'
import { OMDbClientContext } from '@context/omdb/client'

/**
 * A React Hook to gain access over the OMDbClientContext
 * which provides a configured OMDb API Client ready to use.
 *
 * @returns {import('../services/omdb').OMDbClient}
 * @see OMDbClient
 */
export const useOMDbClient = () => {
  /** @type {import('../services/omdb').OMDbClient} */
  const client = useContext(OMDbClientContext)
  if (client === undefined) {
    throw new Error(
      'useOMDbClient custom hook must be used within a OMDbClientContextProvider'
    )
  }
  return client
}
