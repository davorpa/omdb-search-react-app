import { describe, it, expect } from 'vitest'
import {
  titleSearchResultMapper,
  posterUrlsExtractor
} from '@services/omdb/data-mappers'

describe('posterUrlsExtractor', () => {
  it('should return null when the argument is undefined', () => {
    // Given
    const poster = undefined
    // When
    const result = posterUrlsExtractor(poster)
    // Then
    expect(result).toBeNull()
  })

  it('should return null when the argument is null', () => {
    // Given
    const poster = null
    // When
    const result = posterUrlsExtractor(poster)
    // Then
    expect(result).toBeNull()
  })

  it('should return null when the argument is empty string', () => {
    // Given
    const poster = ''
    // When
    const result = posterUrlsExtractor(poster)
    // Then
    expect(result).toBeNull()
  })

  it('should return null when the argument is falsy', () => {
    // Given
    const poster = false
    // When
    const result = posterUrlsExtractor(poster)
    // Then
    expect(result).toBeNull()
  })

  it('should return null when the argument is N/A', () => {
    // Given
    const poster = 'N/A'
    // When
    const result = posterUrlsExtractor(poster)
    // Then
    expect(result).toBeNull()
  })

  it('should extract the poster urls DTO from the argument', () => {
    // Given
    const poster =
      'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
    // When
    const result = posterUrlsExtractor(poster)
    // Then
    expect(result).toEqual({
      sx150:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX150.jpg',
      sx300:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      sx600:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX600.jpg',
      sx1200:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX1200.jpg',
      fullsize:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1.jpg'
    })
  })
})

describe('titleSearchResultMapper', () => {
  it('should return mapped DTO in depth when we provide a valid input DTO as argument', () => {
    // Given
    const apiDTO = {
      Title: 'The Matrix',
      Year: '1999',
      imdbID: 'tt0133093',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
    }
    // When
    const dto = titleSearchResultMapper(apiDTO)
    // Then
    expect(dto).toHaveProperty('title', 'The Matrix')
    expect(dto).toHaveProperty('year', '1999')
    expect(dto).toHaveProperty('imdbID', 'tt0133093')
    expect(dto).toHaveProperty('type', 'movie')
    expect(dto).toHaveProperty('posterUrls', {
      sx150:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX150.jpg',
      sx300:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      sx600:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX600.jpg',
      sx1200:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX1200.jpg',
      fullsize:
        'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1.jpg'
    })
  })

  it('should return a valid DTO when we provide a valid input DTO as argument but without posters', () => {
    // Given
    const apiDTO = {
      Title: 'The Matrix',
      Year: '1999',
      imdbID: 'tt0133093',
      Type: 'movie',
      Poster: 'N/A'
    }
    // When
    const dto = titleSearchResultMapper(apiDTO)
    // Then
    expect(dto).toHaveProperty('title', 'The Matrix')
    expect(dto).toHaveProperty('year', '1999')
    expect(dto).toHaveProperty('imdbID', 'tt0133093')
    expect(dto).toHaveProperty('type', 'movie')
    expect(dto).toHaveProperty('posterUrls', null)
  })
})
