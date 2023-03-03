import { describe, it, expect } from 'vitest'
import { OMDbJSONClient, OMDbError } from '@services/omdb'
import titleSearchWithoutRouteParamResponse from '@services/omdb/data/titlesearch/empty-route-param.json'
import titleSearchWithTooManyResultsResponse from '@services/omdb/data/titlesearch/too-many-results.json'
import invalidApiKeyResponse from '@services/omdb/data/invalid-api-key.json'
import noApiKeyResponse from '@services/omdb/data/no-api-key.json'

describe('OMDbJSONClient', () => {
  it('should be defined', () => {
    expect(OMDbJSONClient).toBeDefined()
  })

  it('Method "titleSearch" should return an error if provides an empty title as input parameter', async () => {
    // Given
    const instance = new OMDbJSONClient('apikey')
    const title = ''
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
    const instance = new OMDbJSONClient('apikey')
    const title = '   '
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
    const instance = new OMDbJSONClient('1234')
    const title = 'title'
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
    const instance = new OMDbJSONClient(' ')
    const title = 'title'
    // When
    const methodSupplier = () => instance.titleSearch({ title })
    // Then
    await expect(methodSupplier).rejects.to.throw(
      OMDbError,
      noApiKeyResponse.Error
    )
  })

  it('Method "titleSearch" should return paged results if search params matches', async () => {
    // Given
    const instance = new OMDbJSONClient('apikey')
    const title = 'xxx'
    // When
    const { results, count } = await instance.titleSearch({ title })
    // Then
    expect(count).to.be.eq(9)
    expect(results).to.have.lengthOf.within(1, 10) // page size is 10
  })

  it('Method "titleSearch" should return empty results if search params dont match', async () => {
    // Given
    const instance = new OMDbJSONClient('apikey')
    const title = 'one title that does not exist'
    // When
    const { results, count } = await instance.titleSearch({ title })
    // Then
    expect(count).to.be.eq(0)
    expect(results).to.have.lengthOf(0)
  })

  it('Method "titleSearch" should return an error if the API response could not be parsed', async () => {
    // Given
    const instance = new OMDbJSONClient('apikey2')
    const title = 'x'.repeat(256)

    // When
    const methodSupplier = () => instance.titleSearch({ title })
    // Then
    await expect(methodSupplier).rejects.to.throw(
      OMDbError,
      /Failed to parse JSON file, invalid JSON syntax found at line \d+/i
    )
  })
})
