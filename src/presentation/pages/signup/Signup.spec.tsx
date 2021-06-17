import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, cleanup, waitFor, fireEvent } from '@testing-library/react'
import { Signup } from './Signup'
import { Helper, ValidationStub , AddAccountSpy, SaveAccessTokenMock } from '@/presentation/mocks'
import faker from 'faker'
import { EmailInUseError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock

}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSystemUnderTest = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  const sut = render(
        <Router history={history}>
            <Signup validation={validationStub} addAccount={addAccountSpy} saveAccessToken={saveAccessTokenMock}/>
        </Router>
  )
  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock
  }
}
export const simulateValidSubmit = async (sut: RenderResult, username = faker.internet.userName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'username', username)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut,'password', password)
  Helper.populateField(sut,'passwordConfirmation', password)
  const form = sut.getByTestId('login-form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Singup compoenent', () => {
  afterEach(cleanup)

  test('should mount components with inital state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit-button', true)
    Helper.testStatusForField(sut, 'username', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('should show username error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    Helper.populateField(sut, 'username')
    Helper.testStatusForField(sut, 'username', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })
  test('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })
  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
  test('should show valid username if validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    Helper.populateField(sut, 'username')
    Helper.testStatusForField(sut, 'username')
  })
  test('should show valid email if validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })
  test('should show valid password if validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })
  test('should show valid passwordConfirmation if validation succeeds', () => {
    const { sut } = makeSystemUnderTest()
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSystemUnderTest()
    Helper.populateField(sut, 'username')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, 'submit-button',false)
  })

  test('should show spinner f form is valid', async () => {
    const { sut } = makeSystemUnderTest()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSystemUnderTest()
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, username, email, password)
    expect(addAccountSpy.params).toEqual({
      username, email, password, passwordConfirmation: password
    })
  })

  test('should call AddAccount just once', async () => {
    const { sut, addAccountSpy } = makeSystemUnderTest()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form values are invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSystemUnderTest({ validationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSystemUnderTest()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSystemUnderTest()
    await simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('login-form'))
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.fakeAccount.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSystemUnderTest()
    const error = new EmailInUseError() // could be any error, just to ensure it will have one
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })
})
