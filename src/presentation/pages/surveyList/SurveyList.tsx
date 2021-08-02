import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AccessDeniedError } from '@/domain/errors/AccessDeniedError'
import { ILoadSurveyList } from '@/domain/useCases'
import { Footer, LoggedInHeader } from '@/presentation/components/layout'
import { ApiContext } from '@/presentation/contexts'
import { ListSurveys, Error } from './components'
import SurveyContext from './context/SurveyContext'
import Styles from './surveyList.styles.scss'

type Props = {
  loadSurveyList: ILoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState({
    surveys: [] as ILoadSurveyList.Model[],
    error: '',
    reload: false
  })
  useEffect(() => {
    (async function () {
      await loadSurveyList.loadAll()
        .then(surveys => setState({ ...state, surveys }))
        .catch(error => {
          if (error instanceof AccessDeniedError) {
            setCurrentAccount(undefined)
            history.replace('/login')
          } else {
            setState({ ...state, error: error.message })
          }
        })
    })()
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrapper}>
      <LoggedInHeader />
      <div className={Styles.contentWrapper}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          { state.error
            ? <Error />
            : (<ListSurveys />)
          }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}
