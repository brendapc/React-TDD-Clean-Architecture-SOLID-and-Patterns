import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult } from '@testing-library/react'
import { Signup } from './Signup'

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

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Everything ok')
  expect(fieldStatus.textContent).toBe(validationError ? '❗' : '✔️')
}

describe('Singup compoenent', () => {
  test('should mount components with inital state', () => {
    const validationError = 'Campo Obrigatório'
    const { sut } = makeSystemUnderTest()
    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit-button', true)
    testStatusForField(sut, 'username', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
