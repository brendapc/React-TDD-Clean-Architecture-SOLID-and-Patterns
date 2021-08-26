import React from 'react'
import Styles from './calendar.styles.scss'

type Props = {
  date: Date
  className?: string
}

export const Calendar: React.FC<Props> = ({ date, className }: Props) => {
  return (
    <time className={[Styles.calendarWrapper, className].join(' ')}>
      <span data-testid="day" className={Styles.day}>
        {date.getDate().toString().padStart(2, '0')}
      </span>
      <span data-testid="month" className={Styles.month}>
        {date.toLocaleString('pt-BR', { month: 'short' })}
      </span>
      <span data-testid="year" className={Styles.year}>
        {date.getFullYear()}
      </span>
    </time>
  )
}
