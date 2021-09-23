import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLoginPage, makeSignupPage, makeSurveyList, makeSurveyResult } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/currentAccountAdapter'
import { PrivateRoute } from '@/presentation/components/privateRoutes/PrivateRoute'
import { ApiContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'

export const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLoginPage} />
          <Route path="/signup" exact component={makeSignupPage} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveyresult/:id" exact component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>

  )
}
