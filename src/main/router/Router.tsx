import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/global.scss'
import ApiContext from '@/presentation/contexts/api/ApiContext'
import { IAccountModel } from '@/domain/models'

type Props = {
  makeLoginPage: React.FC
  makeSignupPage: React.FC
}

const setCurrentAccountAdapter = (account: IAccountModel): void => {
  return null
}

export const Router: React.FC<Props> = (factory: Props) => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter
    }}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={factory.makeLoginPage} />
        <Route path="/signup" exact component={factory.makeSignupPage} />
      </Switch>
    </BrowserRouter>
    </ApiContext.Provider>
  )
}
