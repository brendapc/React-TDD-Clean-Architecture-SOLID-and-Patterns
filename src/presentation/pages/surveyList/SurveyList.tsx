import React, { useEffect, useState } from 'react'
import { ILoadSurveyList } from '@/domain/useCases'
import { useErrorHandler } from '@/presentation/hooks/'
import { Footer, LoggedInHeader } from '@/presentation/components/layout'
import { ListSurveys, Error } from './components'
import SurveyContext from './context/SurveyContext'
import Styles from './surveyList.styles.scss'

type Props = {
  loadSurveyList: ILoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })
  const [state, setState] = useState({
    surveys: [] as ILoadSurveyList.Model[],
    error: '',
    reload: false
  })
  useEffect(() => {
    (async function () {
      await loadSurveyList.loadAll()
        .then(surveys => setState(old => ({ ...old, surveys })))
        .catch(error => handleError(error))
    })()
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrapper}>
      <LoggedInHeader />
      <div className={Styles.contentWrapper}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error
            ? <Error />
            : (<ListSurveys />)
          }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}
