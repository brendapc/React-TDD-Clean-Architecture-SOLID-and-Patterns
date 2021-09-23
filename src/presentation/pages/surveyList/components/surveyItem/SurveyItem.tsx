import React from 'react'
import Styles from './surveyItem.styles.scss'
import { IconName, ThumbsIcons } from '@/presentation/components/utils'
import { ILoadSurveyList } from '@/domain/useCases'
import { Calendar } from '@/presentation/components/utils/calendar/Calendar'
import { Link } from 'react-router-dom'

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
      <footer><Link to={`/surveys/${survey.id}`}>Ver resultado</Link></footer>
    </li>

  )
}
