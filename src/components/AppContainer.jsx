import { useId, useState } from 'react'
import { SearchSubmitButton } from '@components/inputs/SearchSubmitButton'
import { TitleSearchFormInput } from '@components/inputs/TitleSearchFormInput'
import { useOMDbSearchTitle } from '@hooks/useOMDbSearchTitle'
import missingIMDbPosterImage from '../assets/missing-imdb-poster.png'

/**
 * @returns {JSX.Element}
 */
export function AppContainer() {
  const containerId = useId()
  const [loading, setLoading] = useState(false)
  const { results: movies } = useOMDbSearchTitle()

  const handleSearchFormSubmit = (
    /** @type {import('react').SyntheticEvent} */ event
  ) => {
    event.preventDefault()
    setLoading(true)
    // TODO: Implement handleSearchFormSubmit and remove this mock
    setTimeout(() => setLoading(false), Math.random() * 2000)
  }

  return (
    <>
      <form
        action={'#' + containerId + '-results'}
        className="form-input-container omdb-search-form"
        onSubmit={handleSearchFormSubmit}
      >
        <TitleSearchFormInput className="omdb-search-title col-1/1" required />

        <SearchSubmitButton className="col-1/1" loading={loading} />
      </form>
      <main id={containerId + '-results'} className="omdb-search-results">
        {movies?.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                {movie.posterUrls ? (
                  <img
                    src={movie.posterUrls.sx300}
                    alt={`"${movie.title}"'s poster`}
                  />
                ) : (
                  <img src={missingIMDbPosterImage} alt="Missing IMDb poster" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          'No results'
        )}
      </main>
    </>
  )
}
