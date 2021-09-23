import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import { ApiContext } from "@/presentation/contexts"
import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/mocks'
import { SurveyResult } from './SurveyResult'

type SutTypes = {
    loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSystemUnderTest = (): SutTypes => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    render(
        <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
            <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
        </ApiContext.Provider>
    )
    return { loadSurveyResultSpy }
}

describe('Survey Result', () => {
    test('should present correct initial state', () => {
        makeSystemUnderTest()
        const surveyResult = screen.getByTestId('survey-result')
        expect(surveyResult.childElementCount).toBe(0)
    })

    test('should call LoadSurveyResult once', async () => {
        const { loadSurveyResultSpy } = makeSystemUnderTest()
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(loadSurveyResultSpy.callsCount).toBe(1)
    })
})
