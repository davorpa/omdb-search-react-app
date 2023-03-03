import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MovieListItemCard } from '@components/MovieListItemCard'

describe('MovieListItemCard component', () => {
  let movie

  beforeEach(() => {
    // Given
    movie = {
      imdbID: 'tt0111161',
      title: 'The Shawshank Redemption',
      year: '1994',
      type: 'movie'
    }
  })

  it('should throws TypeError if no movie data is provided', () => {
    // When
    const renderSupplier = () => render(<MovieListItemCard />)
    // Then
    expect(renderSupplier).to.throw(TypeError)
  })

  it('should render with a CSS class equal to the className attribute', () => {
    // Given
    const className = 'my-class'
    // When
    const { container } = render(
      <MovieListItemCard data={movie} className={className} />
    )
    // Then
    expect(container.firstChild).toHaveClass(className)
  })

  it('should render a poster placeholder when no URLs are provided', () => {
    // Given
    movie.posterUrls = null
    // When
    const { container } = render(<MovieListItemCard data={movie} />)
    // screen.debug()
    // Then
    assertCommonBehaviourForSuccess(container, movie)
    // when the movie has no poster, the component should render a placeholder
    expect(container.firstChild).toHaveClass('no-poster')
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/missing-imdb-poster.png$/)
    )
    expect(container.querySelector('img')).toHaveAttribute(
      'alt',
      expect.stringMatching(/Missing IMDb poster/i)
    )
  })

  it('should render the poster when URLs are provided', () => {
    // Given
    movie.posterUrls = {
      sx300:
        'https://m.media-amazon.com/images/M/MV5BMTI1MzU3NTYyNl5BMl5BanBnXkFtZTgwNjQxNjQzNzE@._V1_SX300.jpg'
    }
    // When
    const { container } = render(<MovieListItemCard data={movie} />)
    // screen.debug()
    // Then
    assertCommonBehaviourForSuccess(container, movie)
    // when the movie has a poster, the component should render it
    expect(container.firstChild).not.toHaveClass('no-poster')
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      movie.posterUrls.sx300
    )
    expect(container.querySelector('img')).toHaveAttribute(
      'alt',
      expect.stringMatching(/poster/i)
    )
  })
})

function assertCommonBehaviourForSuccess(container, movie) {
  expect(container.firstChild).toHaveClass('card')
  expect(container.firstChild).toHaveAttribute('data-id', movie.imdbID)
  expect(screen.getByText(movie.title)).toBeInTheDocument()
  expect(screen.getByText(movie.year)).toBeInTheDocument()
  expect(screen.getByText(movie.type)).toBeInTheDocument()
}
