import React, { useEffect, useState } from 'react'
import { Footer, LoggedInHeader } from '@/presentation/components/layout'
import { Calendar, Loading } from '@/presentation/components/utils'
import Styles from './surveyResult.styles.scss'
import { ILoadSurveyResult } from '@/domain/useCases'
import { Error } from '@/presentation/components/utils'

type Props = {
    loadSurveyResult: ILoadSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
    const [state] = useState({
        isLoading: false,
        error: '',
        surveyResult: null as ILoadSurveyResult.Model
    })

    useEffect(() => {
        loadSurveyResult.load().then(() => {

        }).catch(() => { })
    },[])

    return (
        <div className={Styles.surveyResultWrapper}>
            <LoggedInHeader />
            <div data-testid="survey-result" className={Styles.contentWrapper}>
                {state.surveyResult &&
                    <>
                        <hgroup>
                            <Calendar date={new Date()} className={Styles.calendarWrapper} />
                            <h2>Qual é seu framework web favorito</h2>
                        </hgroup>
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
                    </>
                }

                {state.isLoading && <Loading />}
                {state.error && <Error error={state.error} reload={() => { }} />}

            </div>
            <Footer />
        </div>
    )
}
