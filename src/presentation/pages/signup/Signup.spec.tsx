import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, cleanup, waitFor, fireEvent, screen } from '@testing-library/react'
import { Signup } from './Signup'
import { Helper, ValidationStub , AddAccountSpy } from '@/presentation/mocks'
import faker from 'faker'
import { EmailInUseError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { IAddAccount } from '@/domain/useCases'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: IAddAccount.Model) => void

}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSystemUnderTest = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
            <Signup validation={validationStub} addAccount={addAccountSpy} />
        </Router>
    </ApiContext.Provider>
  )
  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}
export const simulateValidSubmit = async (username = faker.internet.userName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('username', username)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('login-form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Signup compoenent', () => {
  afterEach(cleanup)

  test('should mount components with inital state', () => {
    const validationError = faker.random.words()
    makeSystemUnderTest({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit-button')).toBeDisabled()

    Helper.testStatusForField('username', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('should show username error if validation fails', () => {
    const validationError = faker.random.words()
    makeSystemUnderTest({ validationError })
    Helper.populateField('username')
    Helper.testStatusForField('username', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    makeSystemUnderTest({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })
  test('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    makeSystemUnderTest({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })
  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words()
    makeSystemUnderTest({ validationError })
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })
  test('should show valid username if validation succeeds', () => {
    makeSystemUnderTest()
    Helper.populateField('username')
    Helper.testStatusForField('username')
  })
  test('should show valid email if validation succeeds', () => {
    makeSystemUnderTest()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })
  test('should show valid password if validation succeeds', () => {
    makeSystemUnderTest()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })
  test('should show valid passwordConfirmation if validation succeeds', () => {
    makeSystemUnderTest()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('should enable submit button if form is valid', () => {
    makeSystemUnderTest()
    Helper.populateField('username')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    expect(screen.getByTestId('submit-button')).toBeEnabled()
  })

  test('should show spinner f form is valid', async () => {
    makeSystemUnderTest()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSystemUnderTest()
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(username, email, password)
    expect(addAccountSpy.params).toEqual({
      username, email, password, passwordConfirmation: password
    })
  })

  test('should call AddAccount just once', async () => {
    const { addAccountSpy } = makeSystemUnderTest()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form values are invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSystemUnderTest({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSystemUnderTest()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('should call setCurrentAccount with correct value', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSystemUnderTest()
    await simulateValidSubmit()
    await waitFor(() => screen.getByTestId('login-form'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.fakeAccount)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should send user to signup page', () => {
    makeSystemUnderTest()
    const login = screen.getByTestId('login-link')
    fireEvent.click(login)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
