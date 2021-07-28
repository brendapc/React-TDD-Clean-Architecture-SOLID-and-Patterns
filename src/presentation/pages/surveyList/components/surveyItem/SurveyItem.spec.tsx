import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyItem } from '..'
import { mockSurveyModel } from '@/domain/mocks'
import { IconName } from '@/presentation/components/utils'

describe('SurveyItem Component', () => {
  test('should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2021-07-28T00:00:00')
    render(<SurveyItem survey={survey} />)
    expect(screen.getByTestId('thumbs-icon')).toHaveProperty(
      'src',
      IconName.thumbsUp
    )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('28')
    expect(screen.getByTestId('month')).toHaveTextContent('jul.')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
  // 7:49 min
})
