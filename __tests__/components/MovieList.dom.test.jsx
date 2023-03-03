import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MovieList } from '@components/MovieList'

describe('MovieList component', () => {
  it('should render without problems', () => {
    render(<MovieList />)
    expect(true).toBeTruthy()
  })

  it('should render no results message when no items are provided', () => {
    // Given
    // When
    const { container } = render(<MovieList />)
    // Then
    expect(container.firstChild).toHaveTextContent('No results')
    expect(container.firstChild).toHaveClass('no-results')
  })

  it('should render no results with custom CSS class when no items are provided', () => {
    // Given
    const classNameOnEmpty = 'my-class'
    // When
    const { container } = render(
      <MovieList classNameOnEmpty={classNameOnEmpty} />
    )
    // Then
    expect(container.firstChild).toHaveClass(classNameOnEmpty)
  })

  it('should render no results message when items are an empty list', () => {
    // Given
    const items = []
    // When
    const { container } = render(<MovieList items={items} />)
    // Then
    expect(container.firstChild).toHaveTextContent('No results')
    expect(container.firstChild).toHaveClass('no-results')
  })

  it('should render same number of cards when items are a fullfilled list', () => {
    // Given
    const className = 'my-class'
    const items = [
      {
        title: 'Batman Begins',
        year: '2005',
        imdbID: 'tt0372784',
        type: 'movie'
      },
      {
        title: 'Batman v Superman: Dawn of Justice',
        year: '2016',
        imdbID: 'tt2975590',
        type: 'movie',
        posterUrls: {
          sx150:
            'https://m.media-amazon.com/images/M/MV5BMTM2NjQyNjQxN15BMl5BanBnXkFtZTgwNjQ5NjQyMzE@._SX150.jpg',
          sx300:
            'https://m.media-amazon.com/images/M/MV5BMTM2NjQyNjQxN15BMl5BanBnXkFtZTgwNjQ5NjQyMzE@._SX300.jpg',
          sx600:
            'https://m.media-amazon.com/images/M/MV5BMTM2NjQyNjQxN15BMl5BanBnXkFtZTgwNjQ5NjQyMzE@._SX600.jpg',
          sx1200:
            'https://m.media-amazon.com/images/M/MV5BMTM2NjQyNjQxN15BMl5BanBnXkFtZTgwNjQ5NjQyMzE@._SX1200.jpg'
        }
      }
    ]
    // When
    const { container } = render(
      <MovieList className={className} items={items} />
    )
    // Then
    expect(container.firstChild).toHaveClass(className)
    expect(container.querySelectorAll('li.card')).to.have.lengthOf(items.length)
  })
})
