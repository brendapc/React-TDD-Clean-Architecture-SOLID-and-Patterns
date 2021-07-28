import React, { useContext } from 'react'
import { SurveyItem, SurveyItemEmpty } from '..'
import { ISurveyModel } from '@/domain/models'
import SurveyContext from '../../context/SurveyContext'
import Styles from './listSurveys.styles.scss'

export const ListSurveys: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
    {state.surveys.length
      ? (
          state.surveys.map((survey: ISurveyModel) =>
                <SurveyItem key={survey.id} survey={survey} />
          )
        )
      : (
          <SurveyItemEmpty />
        )}
      </ul>
  )
}
