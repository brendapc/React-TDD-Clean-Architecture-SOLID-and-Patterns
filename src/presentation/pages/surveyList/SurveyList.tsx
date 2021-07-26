import { Footer, LoggedInHeader } from '@/presentation/components/layout'
import React from 'react'
import Styles from './surveyList.styles.scss'

export const SurveyList: React.FC = () => {
  return (
        <div className={Styles.surveyListWrapper}>
            <LoggedInHeader />
            <div className={Styles.contentWrapper}>
                <h2>Enquetes</h2>
                <ul>
                    <li>

                    </li>
                </ul>
            </div>
            <Footer />
        </div>
  )
}
