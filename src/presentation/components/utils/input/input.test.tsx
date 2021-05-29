import React from 'react'
import { Input } from './Input'
import { render } from '@testing-library/react'
import FormContext from '@/presentation/contexts/form/FormContext'

describe('Input Component', () => {
  test('should begin with readonly', () => {
    const { getByTestId } = render(
      <FormContext.Provider value={{ formState: {} }}>

        <Input name="field" />
      </FormContext.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
