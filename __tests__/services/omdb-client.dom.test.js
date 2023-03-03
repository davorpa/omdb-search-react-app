import { describe, it, expect, vi, beforeEach } from 'vitest'
import { OMDbClient, OMDbError, OMDbResultType } from '@services/omdb'
import {
  createJsonResponseResolvedWith,
  createJsonResponseRejectedWith
} from '../test-utils'
import titleSearchWithoutRouteParamResponse from '@services/omdb/data/titlesearch/empty-route-param.json'
import titleSearchWithTooManyResultsResponse from '@services/omdb/data/titlesearch/too-many-results.json'
import titleSearchWithPageResultsResponse from '@services/omdb/data/titlesearch/ok-page-results.json'
import titleSearchWithoutResultsResponse from '@services/omdb/data/titlesearch/no-results.json'
import invalidApiKeyResponse from '@services/omdb/data/invalid-api-key.json'
import noApiKeyResponse from '@services/omdb/data/no-api-key.json'
import requestLimitReached from '@services/omdb/data/401-limit-reached.json'

global.fetch = vi.fn()

describe('OMDbClient', () => {
  beforeEach(() => {
    global.fetch.mockReset()
  })

  it('should be defined', () => {
    expect(OMDbClient).toBeDefined()
  })

  it('Method "titleSearch" should return an error if provides an empty title as input parameter', async () => {
    // Given
    const instance = new OMDbClient('apikey')
    const title = ''

    fetch.mockResolvedValue(
      createJsonResponseResolvedWith(titleSearchWithoutRouteParamResponse)
    )
    // When
    const methodSupplier = () => instance.titleSearch({ title })
    // Then
    await expect(methodSupplier).rejects.to.throw(
      OMDbError,
      titleSearchWithoutRouteParamResponse.Error
    )
  })

  it('Method "titleSearch" should return an error with the message too many results', async () => {
    // Given
    const instance = new OMDbClient('apikey')
    const title = 'xx'

    fetch.mockResolvedValue(
      createJsonResponseResolvedWith(titleSearchWithTooManyResultsResponse)
    )
    // When
    const methodSupplier = () => instance.titleSearch({ title })
    // Then
    await expect(methodSupplier).rejects.to.throw(
      OMDbError,
      titleSearchWithTooManyResultsResponse.Error
    )
  })

  it('Method "titleSearch" should return an error with invalid API key', async () => {
    // Given
    const instance = new OMDbClient('1234')
    const title = 'title'

    fetch.mockResolvedValue(
      createJsonResponseResolvedWith(invalidApiKeyResponse)
    )
    // When
    const methodSupplier = () => instance.titleSearch({ title })
    // Then
    await expect(methodSupplier).rejects.toThrow(
      OMDbError,
      invalidApiKeyResponse.Error
    )
  })

  it('Method "titleSearch" should return an error with missing API key', async () => {
    // Given
    const instance = new OMDbClient('')
    const title = 'title'

    fetch.mockResolvedValue(createJsonResponseResolvedWith(noApiKeyResponse))
    // When
    const methodSupplier = () => instance.titleSearch({ title })
    // Then
    await expect(methodSupplier).rejects.to.throw(
      OMDbError,
      noApiKeyResponse.Error
    )
  })

  it('Method "titleSearch" should return an error if the API request limit is reached', async () => {
    // Given
    const instance = new OMDbClient('apikey')
    const title = 'Avengers'

    fetch.mockResolvedValue(
      createJsonResponseResolvedWith(requestLimitReached, 401, 'Unauthorized')
    )
    // When
    const methodSupplier = () => instance.titleSearch({ title })
    // Then
    await expect(methodSupplier).rejects.to.throw(
      OMDbError,
      requestLimitReached.Error
    )
  })

  it('Method "titleSearch" should return paged results if search params matches', async () => {
    // Given
    const instance = new OMDbClient('apikey')
    const title = 'xxx'
    const year = 2020
    const resultType = OMDbResultType.MOVIE

    fetch.mockResolvedValue(
      createJsonResponseResolvedWith(titleSearchWithPageResultsResponse)
    )
    // When
    const { results, count } = await instance.titleSearch({
      title,
      year,
      resultType
    })
    // Then
    expect(count).to.be.eq(9)
    expect(results).to.have.lengthOf.within(1, 10) // page size is 10
  })

  it('Method "titleSearch" should return empty results if search params dont match', async () => {
    // Given
    const instance = new OMDbClient('apikey')
    const title = 'xxx'.repeat(3)

    fetch.mockResolvedValue(
      createJsonResponseResolvedWith(titleSearchWithoutResultsResponse)
    )
    // When
    const { results, count } = await instance.titleSearch({ title })
    // Then
    expect(count).to.be.eq(0)
    expect(results).to.have.lengthOf(0)
  })

  it('Method "titleSearch" should return an error if the API response could not be parsed', async () => {
    // Given
    const instance = new OMDbClient('apikey')
    const title = '*'.repeat(256)

    const errorMessage = 'parsing error'
    fetch.mockResolvedValue(createJsonResponseRejectedWith(errorMessage))
    // When
    const methodSupplier = () => instance.titleSearch({ title })
    // Then
    await expect(methodSupplier).rejects.to.throw(OMDbError, errorMessage)
  })

  it('Method "titleSearch" should return an error if the API response is not ok', async () => {
    // Given
    const instance = new OMDbClient('apikey2')
    const title = 'some title'

    const responseCode = 500
    const errorMessage = 'Internal Server Error'
    fetch.mockResolvedValue(
      createJsonResponseResolvedWith({}, responseCode, errorMessage)
    )
    // When
    const methodSupplier = () => instance.titleSearch({ title })
    // Then
    await expect(methodSupplier).rejects.to.throw(
      OMDbError,
      `E${responseCode}: ${errorMessage}`
    )
  })
})
