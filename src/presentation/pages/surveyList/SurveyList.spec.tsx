import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from './SurveyList'
import { ISurveyModel } from '@/domain/models'
import { ILoadSurveyList } from '@/domain/useCases'
import { mockSurveyListModel } from '@/domain/mocks'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

class LoadSurveyListSpy implements ILoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()
  async loadAll (): Promise<ISurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}

const makeSystemUnderTest = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return {
    loadSurveyListSpy
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
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSystemUnderTest(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })
})
