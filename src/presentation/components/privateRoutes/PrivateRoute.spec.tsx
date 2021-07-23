import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { PrivateRoute } from './PrivateRoute'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/mocks'

type SutTypes = {
  history: MemoryHistory
}

const makeSystemUnderTest = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
      <ApiContext.Provider value={{ getCurrentAccount: () => account }}>

    <Router history={history}>
        <PrivateRoute />
    </Router>
      </ApiContext.Provider>
  )
  return {
    history
  }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSystemUnderTest(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('should render current component if token is not empty', () => {
    const { history } = makeSystemUnderTest()
    expect(history.location.pathname).toBe('/')
  })
})