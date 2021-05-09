import React from 'react'
import { render } from '@testing-library/react'
import { Login } from './Login'

describe('Login compoenent', () => {
  test('should mount components with inital state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
