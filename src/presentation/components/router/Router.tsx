import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/global.scss'
import { makeLoginPage } from '@/main/factories/pages/login/loginPageFactory'
import { Signup } from '@/presentation/pages/'
import { SurveyList } from '@/presentation/pages/surveyList/SurveyList'

type Props = {
  makeLoginPage: React.FC
  makeSignupPage: React.FC
}

export const Router: React.FC<Props> = (factory: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={factory.makeLoginPage} />
        <Route path="/signup" exact component={factory.makeSignupPage} />
        <Route path="/" exact component={SurveyList } />
      </Switch>
    </BrowserRouter>
  )
}
