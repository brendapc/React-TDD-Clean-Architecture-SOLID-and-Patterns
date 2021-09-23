import React from 'react'
import { ILoadSurveyList } from '@/domain/useCases'
import { SurveyItem, SurveyItemEmpty } from '..'
import Styles from './listSurveys.styles.scss'

type Props = {
  surveys: ILoadSurveyList.Model[]
}

export const ListSurveys: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {surveys.length
        ? (
          surveys.map((survey: ILoadSurveyList.Model) =>
            <SurveyItem key={survey.id} survey={survey} />
          )
        )
        : (
          <SurveyItemEmpty />
        )}
    </ul>
  )
}
