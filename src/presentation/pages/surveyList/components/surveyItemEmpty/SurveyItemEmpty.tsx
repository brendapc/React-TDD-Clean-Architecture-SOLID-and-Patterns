import React from 'react'
import Styles from './surveyItemEmpty.styles.scss'

export const SurveyItemEmpty: React.FC = () => {
  return (
        <>
            <li className={Styles.surveyItemEmpty}></li>
            <li className={Styles.surveyItemEmpty}></li>
            <li className={Styles.surveyItemEmpty}></li>
        </>
  )
}
