import { useId, useState, useRef } from 'react'
import { SearchSubmitButton } from '@components/inputs/SearchSubmitButton'
import { TitleSearchFormInput } from '@components/inputs/TitleSearchFormInput'
import { MovieList } from '@components/movies'
import { useOMDbSearchTitle } from '@hooks/useOMDbSearchTitle'

/**
 * @returns {JSX.Element}
 */
export function AppContainer() {
  const containerId = useId()
  const [loading, setLoading] = useState(false)
  const loadingTimer = useRef(null)
  const { results: movies } = useOMDbSearchTitle()
  const searchResultsLayerRef = useRef(null)
  const titleSearchFormInputRef = useRef(null)

  const handleSearchFormSubmit = (
    /** @type {import('react').SyntheticEvent} */ event
  ) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const formDataEntries = Object.fromEntries(formData)
    setLoading(true)
    // TODO: Implement handleSearchFormSubmit and remove this mock
    console.log(formDataEntries)
    clearTimeout(loadingTimer.current)
    loadingTimer.current = setTimeout(() => {
      // if there are search results, go to them,
      // TODO: else go to first form input
      titleSearchFormInputRef.current.focus()
      searchResultsLayerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
      setLoading(false)
    }, Math.random() * 2000)
  }

  return (
    <>
      <form
        action={'#' + containerId + '-results'}
        className="form-input-container omdb-search-form"
        onSubmit={handleSearchFormSubmit}
      >
        <TitleSearchFormInput
          ref={titleSearchFormInputRef}
          className="omdb-search-title col-1/1"
          required
        />

        <SearchSubmitButton className="col-1/1" loading={loading} />
      </form>
      <main
        ref={searchResultsLayerRef}
        id={containerId + '-results'}
        className="omdb-search-results"
      >
        <MovieList items={movies} className="grid fluid-cols no-bullets" />
      </main>
    </>
  )
}
