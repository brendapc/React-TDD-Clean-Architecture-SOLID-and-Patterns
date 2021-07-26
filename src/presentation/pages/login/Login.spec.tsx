import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import faker from 'faker'
import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react'
import { AuthenticationSpy, ValidationStub , Helper } from '@/presentation/mocks'
import { InvalidCredentialsError } from '@/domain/errors'

import { Login } from './Login'
import { ApiContext } from '@/presentation/contexts'

type SutTypes = {
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
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>

    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('login-form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login compoenent', () => {
  afterEach(cleanup)

  test('should mount components with inital state', () => {
    const validationError = faker.random.words()
    makeSystemUnderTest({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit-button')).toBeDisabled()
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    makeSystemUnderTest({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSystemUnderTest({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('should show valid status if email validation succeeds', () => {
    makeSystemUnderTest()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('should show valid status if password validation succeeds', () => {
    makeSystemUnderTest()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('should enable submit button if form values are valid', () => {
    makeSystemUnderTest()
    Helper.populateField('email')
    Helper.populateField('password')
    expect(screen.getByTestId('submit-button')).toBeEnabled()
  })

  test('should show spinner on submit', async () => {
    makeSystemUnderTest()
    await simulateValidSubmit()
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSystemUnderTest()
    const fakePassword = faker.internet.password()
    const fakeEmail = faker.internet.email()
    await simulateValidSubmit(fakeEmail, fakePassword)
    expect(authenticationSpy.params).toEqual({
      email: fakeEmail,
      password: fakePassword
    })
  })

  test('should not allow authentication to be called multiple times', async () => {
    const { authenticationSpy } = makeSystemUnderTest()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form values are invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSystemUnderTest({ validationError })
    Helper.populateField('email')
    fireEvent.submit(screen.getByTestId('login-form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if submit fails', async () => {
    const { authenticationSpy } = makeSystemUnderTest()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('should call  setCurrentAccount with correct value', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSystemUnderTest()
    await simulateValidSubmit()
    await waitFor(() => screen.getByTestId('login-form'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.fakeAccount)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should send user to signup page', () => {
    makeSystemUnderTest()
    const signup = screen.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
