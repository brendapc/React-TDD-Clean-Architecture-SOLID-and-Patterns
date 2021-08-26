import React from 'react'
import Styles from './surveyItem.styles.scss'
import { IconName, ThumbsIcons } from '@/presentation/components/utils'
import { ILoadSurveyList } from '@/domain/useCases'
import { Calendar } from '@/presentation/components/utils/calendar/Calendar'

type Props = {
  survey: ILoadSurveyList.Model
}
export const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbsUp : IconName.thumbsDown
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <ThumbsIcons className={Styles.iconWrapper} iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendarWrapper} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>

  )
}
