/**
 * The OMDb Result Type enum.
 * @enum {string}
 * @readonly
 * @memberof module:services/omdb
 * @see https://www.omdbapi.com/#parameters
 */
const OMDbResultType = Object.freeze({
  /**
   * The "Movie" enum value.
   * @memberof OMDbResultType
   */
  MOVIE: 'movie',
  /**
   * The "Series" enum value.
   * @memberof OMDbResultType
   */
  SERIES: 'series',
  /**
   * The "Episode" enum value.
   * @memberof OMDbResultType
   */
  EPISODE: 'episode',
  /**
   * The "Game" enum value.
   * @memberof OMDbResultType
   */
  GAME: 'game'
})

export default OMDbResultType
