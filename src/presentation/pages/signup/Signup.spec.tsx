import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, cleanup } from '@testing-library/react'
import { Signup } from './Signup'
import { Helper, ValidationStub } from '@/presentation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSystemUnderTest = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
        <Router history={history}>
            <Signup validation={validationStub} />
        </Router>
  )
  return {
    sut
  }
}

describe('Singup compoenent', () => {
  afterEach(cleanup)

  test('should mount components with inital state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit-button', true)
    Helper.testStatusForField(sut, 'username', validationError)
    Helper.testStatusForField(sut, 'email', 'Campo Obrigatório')
    Helper.testStatusForField(sut, 'password', 'Campo Obrigatório')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo Obrigatório')
  })

  test('should show username error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSystemUnderTest({ validationError })
    Helper.populateField(sut, 'username')
    Helper.testStatusForField(sut, 'username', validationError)
  })
})
