import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages/surveyList/SurveyList'
import { makeLoginPage } from '@/main/factories/pages/login/loginPageFactory'
import { makeSignupPage } from '@/main/factories/pages/signup/signupPageFactory'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLoginPage} />
        <Route path="/signup" exact component={makeSignupPage} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}
