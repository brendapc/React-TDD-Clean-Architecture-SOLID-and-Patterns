import React from 'react'
import Styles from './surveyItem.styles.scss'
import { IconName, ThumbsIcons } from '@/presentation/components/utils'

export const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
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
  )
}
