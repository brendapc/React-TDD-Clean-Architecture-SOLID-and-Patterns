import React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import { Login } from './Login'
import { MockValidation } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  mockValidation: MockValidation
}

const makeSystemUnderTest = (): SutTypes => {
  const mockValidation = new MockValidation()
  const sut = render(<Login validation={mockValidation} />)
  return {
    sut,
    mockValidation
  }
}

describe('Login compoenent', () => {
  afterEach(cleanup)

  test('should mount components with inital state', () => {
    const { sut } = makeSystemUnderTest()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo Obrigatório')
    expect(emailStatus.textContent).toBe('❗')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo Obrigatório')
    expect(passwordStatus.textContent).toBe('❗')
  })

  test('should call Validation with correct email value', () => {
    const { sut, mockValidation } = makeSystemUnderTest()
    const emailInput = sut.getByTestId('email')
    const fakeEmail = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: fakeEmail } })
    expect(mockValidation.fieldName).toBe('email')
    expect(mockValidation.fieldValue).toBe(fakeEmail)
  })
  test('should call validation with correct password value', () => {
    const { sut, mockValidation } = makeSystemUnderTest()
    const passwordInput = sut.getByTestId('password')
    const fakePassword = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: fakePassword } })
    expect(mockValidation.fieldName).toBe('password')
    expect(mockValidation.fieldValue).toBe(fakePassword)
  })
})
