import { useId, useState, useRef, useEffect } from 'react'
import { SearchSubmitButton } from '@components/inputs/SearchSubmitButton'
import { TitleSearchFormInput } from '@components/inputs/TitleSearchFormInput'
import { MovieList } from '@components/movies'
import { useOMDbSearchTitle } from '@hooks/useOMDbSearchTitle'

/**
 * @returns {JSX.Element}
 */
export function AppContainer() {
  const containerId = useId()
  const {
    searchParams,
    updateSearchParam,
    loading,
    results: movies,
    executeSearch,
    messages
  } = useOMDbSearchTitle()
  const searchResultsLayerRef = useRef(null)
  const titleSearchFormInputRef = useRef(null)

  const searchEffectMonitorRef = useRef(true)
  useEffect(() => {
    if (searchEffectMonitorRef.current) {
      searchEffectMonitorRef.current = false
      return
    }
    if (movies.length) {
      searchResultsLayerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    } else {
      titleSearchFormInputRef.current.focus()
    }
  }, [movies])

  const handleSearchFormSubmit = (
    /** @type {import('react').SyntheticEvent} */ event
  ) => {
    event.preventDefault()
    executeSearch()
  }

  return (
    <>
      {messages['*'] /** Print global messages */ && (
        <div className="message danger">{messages['*']}</div>
      )}
      <form
        action={'#' + containerId + '-results'}
        className="form-input-container omdb-search-form"
        onSubmit={handleSearchFormSubmit}
      >
        <TitleSearchFormInput
          name="title"
          value={searchParams.title}
          valueSetter={updateSearchParam}
          errors={messages.title}
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
