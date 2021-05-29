import React from 'react'
import { Input } from './Input'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import FormContext from '@/presentation/contexts/form/FormContext'
import faker from 'faker'

const makeSystemUnderTest = (fieldname: string): RenderResult => {
  return render(
    <FormContext.Provider value={{ formState: {} }}>

      <Input name={fieldname} />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readonly', () => {
    const field = faker.database.column()
    const sut = makeSystemUnderTest(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
  test('should remove readonly on focus', () => {
    const field = faker.database.column()
    const sut = makeSystemUnderTest(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
