import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult } from '@testing-library/react'
import { Signup } from './Signup'
import { Helper } from '@/presentation/mocks'

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSystemUnderTest = (): SutTypes => {
  const sut = render(
        <Router history={history}>
            <Signup/>
        </Router>
  )
  return {
    sut
  }
}

describe('Singup compoenent', () => {
  test('should mount components with inital state', () => {
    const validationError = 'Campo Obrigatório'
    const { sut } = makeSystemUnderTest()
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit-button', true)
    Helper.testStatusForField(sut, 'username', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
