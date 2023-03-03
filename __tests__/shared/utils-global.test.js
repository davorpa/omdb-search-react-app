import { describe, it, expect } from 'vitest'
import * as utils from '@shared/utils'

describe('isNullish', () => {
  it.each([
    [null, true],
    [undefined, true],
    [0, false],
    [1, false],
    ['', false],
    ['a', false],
    [false, false],
    [true, false],
    [[], false],
    [[1], false],
    [{}, false],
    [{ a: 1 }, false]
  ])('withArgs(%s) should return: %s', (a, expected) => {
    expect(utils.isNullish(a)).to.equal(expected)
  })
})

describe('stringCaseInsensitiveEquals', () => {
  it.each([
    ['a', 'a', true],
    ['a', 'A', true],
    ['a', 'b', false],
    ['a', 'B', false],
    ['a', 'a ', false],
    ['a', 'A ', false],
    ['a', 'á', false],
    ['a', 'Á', false],
    ['a', 'aá', false],
    [1, 1, true],
    [1, 2, false],
    [1, '1', false]
  ])('withArgs(%s, %s) should return: %s', (a, b, expected) => {
    expect(utils.stringCaseInsensitiveEquals(a, b)).to.equal(expected)
  })
})

describe('stringCaseInsensitiveCompare', () => {
  it.each([
    ['a', 'a', 0],
    ['a', 'A', 0],
    ['a', 'b', -1],
    ['a', 'B', -1],
    ['a', 'a ', -1],
    ['a', 'A ', -1],
    ['a', 'á', 0],
    ['a', 'Á', 0],
    ['a', 'aá', -1],
    [1, 1, 0],
    [1, 2, -1],
    [1, '1', 0]
  ])('withArgs(%s, %s) should return: %s', (a, b, expected) => {
    expect(utils.stringCaseInsensitiveCompare(a, b)).to.equal(expected)
  })
})

describe('stringCaseInsensitiveContains', () => {
  it.each([
    ['a', 'a', true],
    ['a', 'A', true],
    ['a', 'b', false],
    ['a', 'B', false],
    ['a ', 'a', true],
    ['aA', 'A', true],
    ['a', 'Aa', false],
    ['a', 'á', false],
    ['a', 'Á', false],
    ['aá', 'á', true],
    [1, 1, true],
    [1, 2, false],
    [1, '1', false]
  ])('withArgs(%s, %s) should return: %s', (a, b, expected) => {
    expect(utils.stringCaseInsensitiveContains(a, b)).to.equal(expected)
  })
})

describe('stringIsFalse', () => {
  it.each([
    ['false', true],
    ['False', true],
    ['FALSE', true],
    ['true', false],
    ['True', false],
    ['TRUE', false],
    [false, true],
    [true, false],
    [1, false],
    [0, false]
  ])('withArgs(%s) should return: %s', (a, expected) => {
    expect(utils.stringIsFalse(a)).to.equal(expected)
  })
})

describe('stringIsTrue', () => {
  it.each([
    ['false', false],
    ['False', false],
    ['FALSE', false],
    ['true', true],
    ['True', true],
    ['TRUE', true],
    [false, false],
    [true, true],
    [1, false],
    [0, false]
  ])('withArgs(%s) should return: %s', (a, expected) => {
    expect(utils.stringIsTrue(a)).to.equal(expected)
  })
})

describe('stringIsEmpty', () => {
  it.each([
    [null, true],
    [undefined, true],
    ['', true],
    [' ', false],
    ['a', false],
    [' a ', false],
    [1, false],
    [0, false],
    [false, false],
    [true, false],
    [[], false],
    [[1], false],
    [{}, false],
    [{ a: 1 }, false]
  ])('withArgs(%s) should return: %s', (a, expected) => {
    expect(utils.stringIsEmpty(a)).to.equal(expected)
  })
})

describe('stringIsBlank', () => {
  it.each([
    [null, true],
    [undefined, true],
    ['', true],
    [' ', true],
    ['a', false],
    [' a ', false],
    [1, false],
    [0, false],
    [false, false],
    [true, false],
    [[], false],
    [[1], false],
    [{}, false],
    [{ a: 1 }, false]
  ])('withArgs(%s) should return: %s', (a, expected) => {
    expect(utils.stringIsBlank(a)).to.equal(expected)
  })
})

describe('stringToTitleCase', () => {
  it.each([
    ['a', 'A'],
    ['aBcDE', 'Abcde'],
    [1, 1]
  ])('withArgs(%s) should return: %s', (a, expected) => {
    expect(utils.stringToTitleCase(a)).to.equal(expected)
  })
})
