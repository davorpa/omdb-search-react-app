import { describe, it, expect, vi } from 'vitest'
import { OMDbError } from '@services/omdb'

describe('OMDbError', () => {
  it('should be defined', () => {
    expect(OMDbError).toBeDefined()
  })

  it('should be an instance of Error', () => {
    // Given
    const error = new OMDbError()
    // When
    // Then
    expect(error).toBeInstanceOf(OMDbError)
  })

  it('should have a name property', () => {
    // Given
    const error = new OMDbError()
    // When
    // Then
    expect(error).toHaveProperty('name')
  })

  it('should have a name property with value OMDbError', () => {
    // Given
    const error = new OMDbError()
    // When
    // Then
    expect(error.name).to.equal('OMDbError')
  })

  it('should have a message property', () => {
    // Given
    const error = new OMDbError()
    // When
    // Then
    expect(error).toHaveProperty('message')
  })

  it('should have a stack property', () => {
    // Given
    const error = new OMDbError()
    // When
    // Then
    expect(error).toHaveProperty('stack')
  })

  it('should have a toJSON method', () => {
    // Given
    const error = new OMDbError()
    // When
    // Then
    expect(error).toHaveProperty('toJSON')
  })

  it('should have a custom toJSON method called when we make a JSON.stringify', () => {
    // Given
    const error = new OMDbError()
    const spy = vi.spyOn(error, 'toJSON')
    // When
    JSON.stringify(error)
    // Then
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('method "toJSON" should return an object with error,name,message properties', () => {
    // Given
    const error = new OMDbError()
    // When
    const json = error.toJSON()
    // Then
    expect(json).to.have.property('error').equal(true)
    expect(json).to.have.property('name').equal('OMDbError')
    expect(json).to.have.property('message').equal('')
  })

  it('method "toJSON" should return an object with error,name,message properties with custom message', () => {
    // Given
    const error = new OMDbError('Custom message')
    // When
    const json = error.toJSON()
    // Then
    expect(json).to.have.property('error').equal(true)
    expect(json).to.have.property('name').equal('OMDbError')
    expect(json).to.have.property('message').equal('Custom message')
  })
})
