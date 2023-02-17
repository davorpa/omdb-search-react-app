import { GoMarkGithub } from 'react-icons/go'

/**
 * Component that renders the application footer.
 *
 * @function AppFooter
 * @memberof module:components
 * @returns {import('react').FunctionComponent}
 */
export default function AppFooter() {
  return (
    <footer className="App-footer">
      <p>
        Made with &#x1F49D; by <strong>@davorpa</strong> |{' '}
        <a
          href="https://github.com/davorpa/omdb-search-react-app"
          target="_blank"
          rel="noreferrer noopener"
          title='GitHub "omdb-search-react-app" repository'
        >
          <GoMarkGithub alt="GitHub" />
        </a>
      </p>
    </footer>
  )
}
