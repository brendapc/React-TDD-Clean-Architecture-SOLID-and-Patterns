import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { ApiContext } from '@/presentation/contexts'
import { LoggedInHeader } from '..'

describe('Header when user is logged in', () => {
  test('should ', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
          <Router history={history}>
            <LoggedInHeader />
          </Router>
        </ApiContext.Provider>

    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
