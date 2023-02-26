// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'

describe('index using Happy-DOM environment', () => {
  it('should work', () => {
    expect(typeof window).not.toBe('undefined')
  })
})
