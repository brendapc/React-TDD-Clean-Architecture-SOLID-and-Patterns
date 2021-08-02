import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from './SurveyList'
import { ILoadSurveyList } from '@/domain/useCases'
import { mockAccountModel, mockSurveyListModel } from '@/domain/mocks'
import { UnexpectedError } from '@/domain/errors'
import { createMemoryHistory, MemoryHistory } from 'history'
import { ApiContext } from '@/presentation/contexts'
import { IAccountModel } from '@/domain/models'
import { AccessDeniedError } from '@/domain/errors/AccessDeniedError'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: IAccountModel) => void
}

class LoadSurveyListSpy implements ILoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()
  async loadAll (): Promise<ILoadSurveyList.Model[]> {
    this.callsCount++
    return this.surveys
  }
}

const makeSystemUnderTest = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', async () => {
    makeSystemUnderTest()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  test('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSystemUnderTest()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('should render SurveyItems on success', async () => {
    makeSystemUnderTest()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap').length).toBe(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })
  test('should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSystemUnderTest(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('reload-button'))
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
  test('should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = makeSystemUnderTest(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
