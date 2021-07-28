import { ILoadSurveyList } from '@/domain/useCases'
import { Footer, LoggedInHeader } from '@/presentation/components/layout'
import React, { useEffect } from 'react'
import { SurveyItem, SurveyItemEmpty } from './components'
import Styles from './surveyList.styles.scss'

type Props = {
  loadSurveyList: ILoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      await loadSurveyList.loadAll()
    })()
  }, [])

  return (
    <div className={Styles.surveyListWrapper}>
      <LoggedInHeader />
      <div className={Styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
          <SurveyItemEmpty />
          <SurveyItemEmpty />
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}
