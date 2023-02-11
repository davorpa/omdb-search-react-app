import { useId, useState } from 'react'
import { SearchSubmitButton } from './inputs/SearchSubmitButton'
import { TitleSearchFormInput } from './inputs/TitleSearchFormInput'

/**
 * @returns {JSX.Element}
 */
export function AppContainer() {
  const containerId = useId()
  const [loading, setLoading] = useState(false)

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
        The search results are placed here
      </main>
    </>
  )
}
