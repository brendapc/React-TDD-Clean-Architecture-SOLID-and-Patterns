import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyItem } from '..'
import { mockSurveyModel } from '@/domain/mocks'
import { IconName } from '@/presentation/components/utils'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2021-07-28T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('thumbs-icon')).toHaveProperty(
      'src',
      IconName.thumbsUp
    )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('28')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2021-10-03T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('thumbs-icon')).toHaveProperty(
      'src',
      IconName.thumbsDown
    )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
})
