import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (fieldName: string, validationError = ''): void => {
  const fieldWrapper = screen.getByTestId(`${fieldName}-wrapper`)
  const field = screen.getByTestId(fieldName)
  const fieldLabel = screen.getByTestId(`${fieldName}-label`)
  expect(fieldWrapper.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field).toHaveProperty('title', validationError)
  expect(fieldLabel).toHaveProperty('title', validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
