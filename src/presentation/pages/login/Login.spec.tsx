import React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import { Login } from './Login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}
type SutParams = {
  validationError: string
}

const makeSystemUnderTest = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit-button')
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

describe('Login compoenent', () => {
  afterEach(cleanup)

  test('should mount components with inital state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('❗')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('❗')
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    populateEmailField(sut)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('❗')
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    populatePasswordField(sut)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('❗')
  })

  test('should show valid status if email validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    populateEmailField(sut)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Everything ok')
    expect(emailStatus.textContent).toBe('✔️')
  })

  test('should show valid status if password validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    populatePasswordField(sut)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Everything ok')
    expect(passwordStatus.textContent).toBe('✔️')
  })

  test('should enable submit button if form values are valid', () => {
    const { sut } = makeSystemUnderTest()
    const emailInput = sut.getByTestId('email')
    const fakeEmail = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: fakeEmail } })
    const passwordInput = sut.getByTestId('password')
    const fakePassword = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: fakePassword } })
    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', () => {
    const { sut } = makeSystemUnderTest()
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSystemUnderTest()
    const fakePassword = faker.internet.password()
    const fakeEmail = faker.internet.email()
    simulateValidSubmit(sut, fakeEmail, fakePassword)
    expect(authenticationSpy.params).toEqual({
      email: fakeEmail,
      password: fakePassword
    })
  })
})
