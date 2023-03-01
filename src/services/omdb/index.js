/**
 * @file The OMDb API client artifacts.
 * @module services/omdb
 */
import OMDbResultType from './OMDbResultType'
import OMDbAbstractClient from './OMDbAbstractClient'

//
// type definitions
//

/**
 * The type definition for an OMDb result item returned by
 * the {@linkcode OMDbAbstractClient#titleSearch} API operation.
 *
 * @typedef OMDbMoviesApiDTO
 * @type {Object}
 * @property {string} imdbID - The ID on https://www.imdb.com/
 * @property {string} Title - The title of movie or series
 * @property {string} Year - The year of release
 * @property {OMDbResultType} Type - The type of result (movie, series, episode, game...)
 * @property {string} Poster - The url of the poster
 */

/**
 * The type definition for one OMDb result item returned by
 * the {@linkcode OMDbAbstractClient#titleSearch} method.
 *
 * @typedef OMDbMoviesDTO
 * @type {Object}
 * @property {string} imdbID - The ID on https://www.imdb.com/
 * @property {string} title - The title of movie or series
 * @property {string} year - The year of release
 * @property {OMDbResultType} type - The type of result (movie, series, episode, game...)
 * @property {(import(".").OMDbMoviePostersDTO)?} posterUrls - The urls of the movie poster for diverse resolutions
 */

/**
 * The type definition for one OMDb poster URL entity
 *
 * @typedef OMDbMoviePostersDTO
 * @type {Object}
 * @property {string} sx150 - Resolution: 150px
 * @property {string} sx300 - Resolution: 300px
 * @property {string} sx600 - Resolution: 600px
 * @property {string} sx1200 - Resolution: 1200px
 * @property {string} fullsize - Resolution up to 2000x3000
 */

//
// barrel exports
//
export { OMDbResultType, OMDbAbstractClient }
export { default as OMDbError } from './OMDbError'
export { default as OMDbClient } from './OMDbClient'
export { default as OMDbJSONClient } from './OMDbJSONClient'
