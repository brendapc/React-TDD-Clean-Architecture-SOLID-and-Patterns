import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { ApiContext } from '@/presentation/contexts'
import { LoggedInHeader } from '..'
import { IAccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/mocks'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: IAccountModel) => void
}

const makeSystemUnderTest = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
        <Router history={history}>
          <LoggedInHeader />
        </Router>
      </ApiContext.Provider>

  )
  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header when user is logged in', () => {
  test('should call setCurrentAccount with null on logout', () => {
   const { history, setCurrentAccountMock} =  makeSystemUnderTest()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
  test('should render username correctly', () => {
    const account = mockAccountModel()
    makeSystemUnderTest(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
   })
})
