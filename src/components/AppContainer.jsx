import { useId, useState } from 'react'
import { GlobalActionMessages } from '@components/action-messages'
import { SearchSubmitButton } from '@components/inputs/SearchSubmitButton'
import { TitleSearchFormInput } from '@components/inputs/TitleSearchFormInput'
import { YearSearchFormInput } from '@components/inputs/YearSearchFormInput'
import { TypeSearchFormSelectInput } from '@components/inputs/TypeSearchFormSelectInput'
import { SortByMovieFieldsRadioGroup } from '@components/inputs/SortByMovieFieldsRadioGroup'
import { SortDirectionSelectInput } from '@components/inputs/SortDirectionSelectInput'
import { MovieList } from '@components/MovieList'
import { LoaderMoreButton } from '@components/LoaderMoreButton'
import { PagerShowingCountOf } from '@components/PagerShowingCountOf'
import { useFocuserEffect } from '@hooks/useFocuserEffect'
import { useInViewClickerRef } from '@hooks/useInViewClickerRef'
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
  const [sortDir, setSortDir] = useState('asc') // asc|desc
  const {
    searchParams,
    updateSearchParam,
    loadedPage,
    hasMorePages,
    loading,
    results: movies,
    totalResults: totalMovies = movies?.length ?? 0,
    executeSearch,
    messages
  } = useOMDbSearchTitle(null, sortBy, sortDir)

  const loaderMoreButtonRef = useInViewClickerRef(null, hasMorePages)

  const [searchResultsLayerRef, titleSearchFormInputRef] =
    useFocuserEffect(movies)

  const handleSearchFormSubmit = (
    /** @type {import('react').SyntheticEvent} */ event
  ) => {
    event.preventDefault()
    executeSearch(searchParams, 1) // resetting page
  }

  const handleLoadMoreClick = (
    /** @type {import('react').SyntheticEvent} */ event
  ) => {
    event.preventDefault()
    executeSearch(searchParams, loadedPage + 1) // next page
  }

  return (
    <>
      <GlobalActionMessages messages={messages} />
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
          <div className="search-results-bar">
            <PagerShowingCountOf count={movies.length} total={totalMovies} />
            <div className="controls">
              <SortByMovieFieldsRadioGroup
                formId={containerId}
                className="sort-by"
                value={sortBy}
                valueSetter={setSortBy}
              />
              <SortDirectionSelectInput
                formId={containerId}
                className="sort-dir"
                value={sortDir}
                valueSetter={setSortDir}
              />
            </div>
          </div>
        )}
        <MovieList items={movies} className="grid fluid-cols no-bullets" />
        {hasMorePages && (
          <LoaderMoreButton
            ref={loaderMoreButtonRef}
            onClick={handleLoadMoreClick}
            busy={loading}
          />
        )}
        {!!movies?.length && (
          <div className="search-results-bar">
            <PagerShowingCountOf count={movies.length} total={totalMovies} />
            <div className="controls">
              <SortByMovieFieldsRadioGroup
                formId={containerId}
                className="sort-by"
                value={sortBy}
                valueSetter={setSortBy}
              />
              <SortDirectionSelectInput
                formId={containerId}
                className="sort-dir"
                value={sortDir}
                valueSetter={setSortDir}
              />
            </div>
          </div>
        )}
      </main>
    </>
  )
}
