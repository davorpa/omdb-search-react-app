import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import AppFooter from '@components/AppFooter'

describe('AppFooter component', () => {
  it('should render without problems', () => {
    render(<AppFooter />)
    expect(true).toBeTruthy()
  })
})
