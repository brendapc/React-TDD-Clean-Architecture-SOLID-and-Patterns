import React from 'react'
import { render } from '@testing-library/react'
import { Login } from './Login'

describe('Login compoenent', () => {
  test('should not render spinner', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
