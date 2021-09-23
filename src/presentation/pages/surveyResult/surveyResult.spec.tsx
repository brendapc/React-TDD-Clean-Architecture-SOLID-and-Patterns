import React from 'react'
import { screen, render } from '@testing-library/react'
import { ApiContext } from "@/presentation/contexts"
import { mockAccountModel } from '@/domain/mocks'
import { SurveyResult } from './SurveyResult'

describe('Survey Result', () => {
    test('should present correct initial state', () => {
        render(
            <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
                <SurveyResult />
            </ApiContext.Provider>
        )
        const surveyResult = screen.getByTestId('survey-result')
        expect(surveyResult.childElementCount).toBe(0)
    })
})
