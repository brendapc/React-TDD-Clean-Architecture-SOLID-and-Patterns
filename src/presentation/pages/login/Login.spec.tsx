import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { AuthenticationSpy, ValidationStub , Helper } from '@/presentation/mocks'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from './Login'
import { SaveAccessTokenMock } from '@/presentation/mocks/'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}
type SutParams = {
  validationError: string
}
const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSystemUnderTest = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock}/>
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const form = sut.getByTestId('login-form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

describe('Login compoenent', () => {
  afterEach(cleanup)

  test('should mount components with inital state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    Helper.testChildCount(sut, 'error-wrap',0)
    Helper.testButtonIsDisabled(sut,'submit-button', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    populatePasswordField(sut)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('should show valid status if email validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email')
  })

  test('should show valid status if password validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    populatePasswordField(sut)
    Helper.testStatusForField(sut, 'password')
  })

  test('should enable submit button if form values are valid', () => {
    const { sut } = makeSystemUnderTest()
    populateEmailField(sut)
    populatePasswordField(sut)
    Helper.testButtonIsDisabled(sut,'submit-button', false)
  })

  test('should show spinner on submit', async () => {
    const { sut } = makeSystemUnderTest()
    await simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSystemUnderTest()
    const fakePassword = faker.internet.password()
    const fakeEmail = faker.internet.email()
    await simulateValidSubmit(sut, fakeEmail, fakePassword)
    expect(authenticationSpy.params).toEqual({
      email: fakeEmail,
      password: fakePassword
    })
  })

  test('should not allow authentication to be called multiple times', async () => {
    const { sut, authenticationSpy } = makeSystemUnderTest()
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form values are invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSystemUnderTest({ validationError })
    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('login-form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if submit fails', async () => {
    const { sut, authenticationSpy } = makeSystemUnderTest()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSystemUnderTest()
    await simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('login-form'))
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.fakeAccount.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSystemUnderTest()
    const error = new InvalidCredentialsError() // could be any error, just to ensure it will have one
    jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('should send user to signup page', () => {
    const { sut } = makeSystemUnderTest()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
