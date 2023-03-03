import { describe, it, expect } from 'vitest'
import { OMDbAbstractClient } from '@services/omdb'

describe('OMDbAbstractClient', () => {
  it('should be defined', () => {
    expect(OMDbAbstractClient).toBeDefined()
  })

  it('should retrieve the same apiKey passed as constructor argument when its getter is called', () => {
    // Given
    const apiKey = '123456789'
    const instance = new OMDbAbstractClient(apiKey)
    // When
    // Then
    expect(instance.apiKey).to.equal(apiKey)
  })

  it('should retrieve the apiUrl when its getter is called', () => {
    // Given
    const instance = new OMDbAbstractClient()
    // When
    // Then
    expect(instance.apiUrl).toMatch(/https?:\/\/www.omdbapi.com\//)
  })

  it('should throw a NotImplementedError when calling the method "titleSearch"', () => {
    // Given
    const instance = new OMDbAbstractClient()
    // When
    const methodSupplier = () => instance.titleSearch()
    // Then
    expect(methodSupplier).toThrow(/Not implemented/i)
  })

  it('should throw a NotImplementedError when calling the method "getTitle"', () => {
    // Given
    const instance = new OMDbAbstractClient()
    // When
    const methodSupplier = () => instance.getTitle()
    // Then
    expect(methodSupplier).toThrow(/Not implemented/i)
  })

  it('should throw a NotImplementedError when calling the method "getId"', () => {
    // Given
    const instance = new OMDbAbstractClient()
    // When
    const methodSupplier = () => instance.getId()
    // Then
    expect(methodSupplier).toThrow(/Not implemented/i)
  })
})
