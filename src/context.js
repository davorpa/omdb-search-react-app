import React from 'react'
import { OMDbClient, OMDbJSONClient } from '@services/omdb'

/** @type {import('./services/omdb').OMDbAbstractClient} */
let omdbClient
if (import.meta.env.VITE_OMDB_CLIENT_STRATEGY === 'json') {
  /** @type {import('./services/omdb').OMDbJSONClient} */
  omdbClient = new OMDbJSONClient(import.meta.env.VITE_OMDB_APIKEY)
} else {
  /** @type {import('./services/omdb').OMDbClient} */
  omdbClient = new OMDbClient(import.meta.env.VITE_OMDB_APIKEY)
}
export { omdbClient }
export const OMDbClientContext = React.createContext(omdbClient)
