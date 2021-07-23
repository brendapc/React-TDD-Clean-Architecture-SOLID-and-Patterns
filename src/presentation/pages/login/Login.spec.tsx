import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import faker from 'faker'
import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { AuthenticationSpy, ValidationStub , Helper } from '@/presentation/mocks'
import { InvalidCredentialsError } from '@/domain/errors'

import { Login } from './Login'
import { ApiContext } from '@/presentation/contexts'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account) => void
}
type SutParams = {
  validationError: string
}
const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSystemUnderTest = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const setCurrentAccountMock = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>

    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
    </ApiContext.Provider>
  )
  return {
    sut,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut,'password', password)
  const form = sut.getByTestId('login-form')
  fireEvent.submit(form)
  await waitFor(() => form)
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
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('should show valid status if email validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('should show valid status if password validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('should enable submit button if form values are valid', () => {
    const { sut } = makeSystemUnderTest()
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
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
    Helper.populateField(sut, 'email')
    fireEvent.submit(sut.getByTestId('login-form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if submit fails', async () => {
    const { sut, authenticationSpy } = makeSystemUnderTest()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('should call  setCurrentAccount with correct value', async () => {
    const { sut, authenticationSpy, setCurrentAccountMock } = makeSystemUnderTest()
    await simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('login-form'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.fakeAccount)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should send user to signup page', () => {
    const { sut } = makeSystemUnderTest()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
