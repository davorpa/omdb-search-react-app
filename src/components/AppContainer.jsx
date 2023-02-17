import { useId, useRef, useEffect, useState } from 'react'
import { SearchSubmitButton } from '@components/inputs/SearchSubmitButton'
import { TitleSearchFormInput } from '@components/inputs/TitleSearchFormInput'
import { YearSearchFormInput } from '@components/inputs/YearSearchFormInput'
import { TypeSearchFormSelectInput } from '@components/inputs/TypeSearchFormSelectInput'
import { SortByMovieFieldsRadioGroup } from '@components/inputs/SortByMovieFieldsRadioGroup'
import { MovieList } from '@components/movies'
import { useOMDbSearchTitle } from '@hooks/useOMDbSearchTitle'

/**
 * Component that renders the application container and its contents
 * (search form and it results).
 *
 * @function AppContainer
 * @memberof module:components
 * @returns {import('react').FunctionComponent}
 */
export function AppContainer() {
  const containerId = useId()
  const [sortBy, setSortBy] = useState('') // None
  const {
    searchParams,
    updateSearchParam,
    loading,
    results: movies,
    executeSearch,
    messages
  } = useOMDbSearchTitle(null, sortBy)
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
    executeSearch(searchParams, sortBy)
  }

  return (
    <>
      {messages['*'] /** Print global messages */ && (
        <div className="message danger">{messages['*']}</div>
      )}
      <form
        id={containerId}
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
          requestSubmitOnValueChange="debounce"
        />

        <YearSearchFormInput
          name="year"
          labelText="Release Year"
          value={searchParams.year}
          valueSetter={updateSearchParam}
          errors={messages.year}
          className="omdb-search-year col-1/2"
        />

        <TypeSearchFormSelectInput
          name="type"
          labelText="Type"
          value={searchParams.type}
          valueSetter={updateSearchParam}
          errors={messages.type}
          className="omdb-search-type col-1/2"
        />

        <SearchSubmitButton className="col-1/1" loading={loading} />
      </form>
      <main
        ref={searchResultsLayerRef}
        id={containerId + '-results'}
        className="omdb-search-results"
      >
        {!!movies?.length && (
          <SortByMovieFieldsRadioGroup
            formId={containerId}
            className="omdb-sort-by"
            value={sortBy}
            valueSetter={setSortBy}
          />
        )}
        <MovieList items={movies} className="grid fluid-cols no-bullets" />
        {!!movies?.length && (
          <SortByMovieFieldsRadioGroup
            formId={containerId}
            className="omdb-sort-by"
            value={sortBy}
            valueSetter={setSortBy}
          />
        )}
      </main>
    </>
  )
}
