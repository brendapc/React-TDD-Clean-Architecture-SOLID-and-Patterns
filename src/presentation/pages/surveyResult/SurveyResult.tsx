import React, { useEffect, useState } from 'react'
import { Footer, LoggedInHeader } from '@/presentation/components/layout'
import { Calendar, Loading } from '@/presentation/components/utils'
import Styles from './surveyResult.styles.scss'
import { ILoadSurveyResult } from '@/domain/useCases'
import { Error } from '@/presentation/components/utils'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
    loadSurveyResult: ILoadSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        error: '',
        surveyResult: null as ILoadSurveyResult.Model,
        reload: false
    })

    const handleError = useErrorHandler((error: Error) => {
        setState(old => ({ ...old, surveyResult: null, error: error.message }))
    })

    const reload = (): void => setState(old => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }))

    useEffect(() => {
        loadSurveyResult.load().then(surveyResult => setState(old => ({ ...old, surveyResult }))).catch(handleError)
    }, [state.reload])

    return (
        <div className={Styles.surveyResultWrapper}>
            <LoggedInHeader />
            <div data-testid="survey-result" className={Styles.contentWrapper}>
                {state.surveyResult &&
                    <>
                        <hgroup>
                            <Calendar date={new Date()} className={Styles.calendarWrapper} />
                            <h2>{state.surveyResult.question}</h2>
                        </hgroup>
                        <ul>
                            {state.surveyResult.answers.map((answer) =>
                                <li key={answer.answer} className={answer.isCurrentAccountAnswer ? Styles.active : ''}>
                                    {answer.image && <img src={answer.image} alt={answer.answer} />}
                                    <span className={Styles.answer}> {answer.answer}</span>
                                    <span className={Styles.percent}> {answer.percent}%</span>
                                </li>
                            )}
                        </ul>
                        <button>Voltar</button>
                    </>
                }

                {state.isLoading && <Loading />}
                {state.error && <Error error={state.error} reload={reload} />}
            </div>
            <Footer />
        </div>
    )
}
