import { Footer, LoggedInHeader } from '@/presentation/components/layout'
import { IconName, ThumbsIcons } from '@/presentation/components/utils'
import React from 'react'
import Styles from './surveyList-styles.scss'

export const SurveyList: React.FC = () => {
  return (
        <div className={Styles.surveyListWrapper}>
            <LoggedInHeader />
            <div className={Styles.contentWrapper}>
                <h2>Enquetes</h2>
                <ul>
                    <li>
                        <div className={Styles.surveyContent}>
                            <ThumbsIcons className={Styles.iconWrapper} iconName={IconName.thumbsDown} />
                            <time>
                                <span className={Styles.day}>05</span>
                                <span className={Styles.month}>07</span>
                                <span className={Styles.year}>2021</span>
                            </time>
                            <p>
                                Qual é seu framework preferido?
                            </p>
                        </div>
                        <footer>Ver resultado</footer>
                    </li>

                </ul>
            </div>
            <Footer />
        </div>
  )
}
