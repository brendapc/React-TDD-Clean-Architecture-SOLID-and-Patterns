import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages/surveyList/SurveyList'
import { makeLoginPage } from '@/main/factories/pages/login/loginPageFactory'
import { makeSignupPage } from '@/main/factories/pages/signup/signupPageFactory'

import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/currentAccountAdapter'

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
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
    </ApiContext.Provider>

  )
}
