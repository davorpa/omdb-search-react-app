import React from 'react'
import OMDbClient from '@services/omdb'

/** @type {import('./services/omdb').OMDbClient} */
export const omdbClient = new OMDbClient(import.meta.env.VITE_OMDB_APIKEY)
export const OMDbClientContext = React.createContext(omdbClient)
