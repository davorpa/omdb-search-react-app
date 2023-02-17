import { useContext } from 'react'
import { OMDbClientContext } from '@context/omdb/client'

/**
 * A React Hook to gain access over the OMDbClientContext
 * which provides a configured OMDb API Client ready to use.
 *
 * @function useOMDbSearchTitle
 * @returns {import('../services/omdb').OMDbAbstractClient}
 * @memberof module:hooks
 * @see module:services/omdb.OMDbAbstractClient
 */
export const useOMDbClient = () => {
  /** @type {import('../services/omdb').OMDbAbstractClient} */
  const client = useContext(OMDbClientContext)
  if (client === undefined) {
    throw new Error(
      'useOMDbClient custom hook must be used within a OMDbClientContextProvider'
    )
  }
  return client
}
