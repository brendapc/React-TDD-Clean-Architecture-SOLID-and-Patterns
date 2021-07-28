import React from 'react'
import Styles from './surveyItem.styles.scss'
import { IconName, ThumbsIcons } from '@/presentation/components/utils'
import { ISurveyModel } from '@/domain/models'

type Props = {
  survey: ISurveyModel
}
export const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <ThumbsIcons
          className={Styles.iconWrapper}
          iconName={IconName.thumbsUp}
        />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate()}
          </span>
          <span data-testid="month" className={Styles.month}>
            {survey.date.toLocaleString('pt-BR', { month: 'short' })}
          </span>
          <span data-testid="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}
