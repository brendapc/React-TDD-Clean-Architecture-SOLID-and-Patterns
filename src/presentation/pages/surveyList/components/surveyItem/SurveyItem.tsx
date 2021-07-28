import React from 'react'
import Styles from './surveyItem.styles.scss'
import { IconName, ThumbsIcons } from '@/presentation/components/utils'
import { ISurveyModel } from '@/domain/models'

type Props = {
  survey: ISurveyModel
}
export const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbsUp : IconName.thumbsDown
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <ThumbsIcons className={Styles.iconWrapper} iconName={iconName} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
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
