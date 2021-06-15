import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/global.scss'
import { makeLoginPage } from '@/main/factories/pages/login/loginPageFactory'
import { Signup } from '@/presentation/pages/'

type Props = {
  makeLoginPage: React.FC
}

export const Router: React.FC<Props> = ({ makeLoginPage }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLoginPage} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}
