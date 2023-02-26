// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'

describe('index using JSDOM environment', () => {
  it('should work', () => {
    expect(typeof window).not.toBe('undefined')
  })
})
