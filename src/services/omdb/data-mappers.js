export const titleSearchResultMapper = (
  /** @type {import(".").OMDbMoviesApiDTO} */ dto
) =>
  /** @type {import(".").OMDbMoviesDTO} */ ({
    imdbID: dto.imdbID,
    title: dto.Title,
    year: dto.Year,
    type: dto.Type,
    posterUrls: posterUrlsExtractor(dto.Poster)
  })

const rePosterUrlSize = /_SX\d+/gm

export const posterUrlsExtractor = (/** @type {string} */ posterUrl) =>
  /** @type {import(".").OMDbMoviePostersDTO} */ (
    !posterUrl || posterUrl === 'N/A'
      ? null
      : {
          sx150: posterUrl.replace(rePosterUrlSize, '_SX150'),
          sx300: posterUrl.replace(rePosterUrlSize, '_SX300'),
          sx600: posterUrl.replace(rePosterUrlSize, '_SX600'),
          sx1200: posterUrl.replace(rePosterUrlSize, '_SX1200'),
          fullsize: posterUrl.replace(rePosterUrlSize, '')
        }
  )
