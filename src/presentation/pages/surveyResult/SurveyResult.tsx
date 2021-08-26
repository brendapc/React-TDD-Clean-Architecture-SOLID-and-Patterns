import React from 'react'
import { Footer, LoggedInHeader } from '@/presentation/components/layout'
import { Loading } from '@/presentation/components/utils'
import Styles from './surveyResult.styles.scss'

export const SurveyResult: React.FC = () => {
    return (
        <div className={Styles.surveyResultWrapper}>
            <LoggedInHeader />
            <div className={Styles.contentWrapper}>
                <h2>Qual é seu framework web favorito</h2>
                <ul>
                    <li>
                        <img src="https://styles.redditmedia.com/t5_2su6s/styles/communityIcon_4g1uo0kd87c61.png?width=256&s=3f7493995143d3cf40b1fedc582607cea194b579" alt="" />
                        <span className={Styles.answer} > React JS</span>
                        <span className={Styles.percent} > 50%</span>
                    </li>
                    <li className={Styles.active}>
                        <img src="https://styles.redditmedia.com/t5_2su6s/styles/communityIcon_4g1uo0kd87c61.png?width=256&s=3f7493995143d3cf40b1fedc582607cea194b579" alt="" />
                        <span className={Styles.answer} > React JS</span>
                        <span className={Styles.percent} > 50%</span>
                    </li>
                    <li>
                        <img src="https://styles.redditmedia.com/t5_2su6s/styles/communityIcon_4g1uo0kd87c61.png?width=256&s=3f7493995143d3cf40b1fedc582607cea194b579" alt="" />
                        <span className={Styles.answer} > React JS</span>
                        <span className={Styles.percent} > 50%</span>
                    </li>
                </ul>
                <button>Voltar</button>
                <Loading />
            </div>
            <Footer />
        </div>
    )
}
