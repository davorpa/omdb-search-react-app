import { describe, it, expect, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useOMDbSearchTitle } from '@hooks/useOMDbSearchTitle'
import { OMDbJSONClient } from '@services/omdb'
import { GLOBAL_ACTION_MESSAGES_KEY } from '@services/action-messages/constants'

// bypass the useOMDbClient hook implementation that throws an error if client instance is not provided by context
vi.mock('@hooks/useOMDbClient', () => ({
  useOMDbClient: () => new OMDbJSONClient('test-api-key')
}))

function mockOMDbClientForTitleSearch(result) {
  const fn = vi.spyOn(OMDbJSONClient.prototype, 'titleSearch')
  if (result instanceof Error) {
    fn.mockRejectedValue(result)
  } else {
    fn.mockResolvedValue(result ?? { results: [], count: 0 })
  }
  return fn
}

describe('useOMDbSearchTitle', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should be defined', () => {
    expect(useOMDbSearchTitle).toBeDefined()
  })

  it('should return an object', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    expect(result.current).to.be.an('object')
  })

  it('should return an object with a "searchParams" property', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    expect(result.current)
      .to.have.property('searchParams')
      .been.an('object')
      .that.satisfies((searchParams) => {
        expect(searchParams).to.have.property('title').that.is.a('string')
        expect(searchParams).to.have.property('year').that.is.a('string')
        expect(searchParams).to.have.property('type').that.is.a('string')
        return true
      })
  })

  it('should return an object with a "updateSearchParam" property', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    expect(result.current)
      .to.have.property('updateSearchParam')
      .been.a('function')
  })

  it('should return an object with a "executeSearch" property', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    expect(result.current).to.have.property('executeSearch').been.a('function')
  })

  it('should return an object with a "results" property', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    // eslint-disable-next-line no-unused-expressions
    expect(result.current).to.have.property('results').been.an('array').that.is
      .empty
  })

  it('should return an object with a "loadedPage" property', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    expect(result.current).to.have.property('loadedPage').been.a('number')
  })

  it('should return an object with a "hasMorePages" property', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    expect(result.current).to.have.property('hasMorePages').been.a('boolean')
  })

  it('should return an object with a "totalResults" property', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    expect(result.current).to.have.property('totalResults').been.a('number')
  })

  it('should return an object with a "loading" property', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    expect(result.current).to.have.property('loading').been.a('boolean')
  })

  it('should return an object with a "messages" property', () => {
    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    // Then
    // eslint-disable-next-line no-unused-expressions
    expect(result.current).to.have.property('messages').been.an('object').that
      .is.empty
  })

  it('should register a search param when "updateSearchParam" is called', () => {
    // Given
    const { result } = renderHook(() => useOMDbSearchTitle())
    // When
    act(() => {
      result.current.updateSearchParam('test', 'title')
    })
    // Then
    expect(result.current)
      .to.have.property('searchParams')
      .which.property('title')
      .is.equal('test')
  })

  it('should execute a search when "executeSearch" is called with searchParams/page changed', async () => {
    // Given
    const titleSearchSpier = mockOMDbClientForTitleSearch({
      results: [{ title: 'xXx' }, { title: 'xXx 2' }],
      count: 4
    })
    const searchParams = {
      title: 'xxx'
    }
    const { result } = renderHook(() => useOMDbSearchTitle())

    // When first call
    await act(async () => {
      await result.current.executeSearch(searchParams, 1)
    })
    // Then.. client called
    expect(titleSearchSpier).toHaveBeenCalledTimes(1)
    expect(result.current).to.have.property('results').that.have.lengthOf(2)
    expect(result.current).to.have.property('totalResults').that.is.equal(4)
    expect(result.current).to.have.property('loadedPage').that.is.equal(1)
    // eslint-disable-next-line no-unused-expressions
    expect(result.current).to.have.property('hasMorePages').that.is.true

    // When... duplicated call
    await act(async () => {
      await result.current.executeSearch(searchParams, 1)
    })
    // Then... no more calls to client and mantain internal state
    expect(titleSearchSpier).toHaveBeenCalledTimes(1)
    expect(result.current).to.have.property('results').that.have.lengthOf(2)
    expect(result.current).to.have.property('totalResults').that.is.equal(4)
    expect(result.current).to.have.property('loadedPage').that.is.equal(1)
    // eslint-disable-next-line no-unused-expressions
    expect(result.current).to.have.property('hasMorePages').that.is.true

    // When... different page params
    await act(async () => {
      await result.current.executeSearch(searchParams, 2)
    })
    // Then... client called again append paged results
    expect(titleSearchSpier).toHaveBeenCalledTimes(2)
    expect(result.current).to.have.property('results').that.have.lengthOf(4)
    expect(result.current).to.have.property('totalResults').that.is.equal(4)
    expect(result.current).to.have.property('loadedPage').that.is.equal(2)
    // eslint-disable-next-line no-unused-expressions
    expect(result.current).to.have.property('hasMorePages').that.is.false

    // When... different search params
    await act(async () => {
      await result.current.executeSearch({ title: 'xxx2' }, 1)
    })
    // Then... client called again and reset results
    expect(titleSearchSpier).toHaveBeenCalledTimes(3)
    expect(result.current).to.have.property('results').that.have.lengthOf(2)
    expect(result.current).to.have.property('totalResults').that.is.equal(4)
    expect(result.current).to.have.property('loadedPage').that.is.equal(1)
    // eslint-disable-next-line no-unused-expressions
    expect(result.current).to.have.property('hasMorePages').that.is.true
  })

  it('should execute a failed search when "executeSearch" throws an error', async () => {
    // Given
    const titleSearchSpier = mockOMDbClientForTitleSearch(
      new Error('test error')
    )
    const searchParams = {
      title: 'xxx'.repeat(100)
    }

    // When
    const { result } = renderHook(() => useOMDbSearchTitle())
    await act(async () => {
      await result.current.executeSearch(searchParams, 1)
    })

    // Then
    expect(titleSearchSpier).toHaveBeenCalledTimes(1)
    // eslint-disable-next-line no-unused-expressions
    expect(result.current).to.have.property('results').that.is.empty
    expect(result.current).to.have.property('totalResults').that.is.equal(0)
    expect(result.current).to.have.property('loadedPage').that.is.equal(1)
    // eslint-disable-next-line no-unused-expressions
    expect(result.current).to.have.property('hasMorePages').that.is.false
    // fetch error is added to messages as global action message
    expect(result.current)
      .to.have.property('messages')
      .that.have.property(GLOBAL_ACTION_MESSAGES_KEY)
      .is.an('array')
      .with.lengthOf(1)
  })

  it('should sort results by some field when "sortBy"/"sortOrder" is provided', async () => {
    // Given
    const titleSearchSpier = mockOMDbClientForTitleSearch({
      results: [
        { title: 'xXx', year: '2002' },
        { title: 'xXx 2', year: '2005' }
      ],
      count: 2
    })
    const searchParams = {
      title: 'xxx'
    }

    // When
    const { result } = renderHook(() =>
      useOMDbSearchTitle(null, 'year', 'desc')
    )
    await act(async () => {
      await result.current.executeSearch(searchParams, 1)
    })

    // Then
    expect(titleSearchSpier).toHaveBeenCalledTimes(1)
    expect(result.current).to.have.property('results').that.have.lengthOf(2)
    expect(result.current).to.have.property('totalResults').that.is.equal(2)
    expect(result.current).to.have.property('loadedPage').that.is.equal(1)
    // eslint-disable-next-line no-unused-expressions
    expect(result.current).to.have.property('hasMorePages').that.is.false
    expect(result.current)
      .to.have.property('results')
      .that.deep.equals([
        { title: 'xXx 2', year: '2005' },
        { title: 'xXx', year: '2002' }
      ])
  })
})
