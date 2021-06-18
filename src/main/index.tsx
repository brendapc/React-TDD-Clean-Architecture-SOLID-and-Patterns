import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/pages'
import { makeLoginPage } from './factories/pages/login/loginPageFactory'
import { makeSignupPage } from './factories/pages/signup/loginPageFactory'

ReactDOM.render(
  <Router
    makeLoginPage={makeLoginPage}
    makeSignupPage={makeSignupPage}
  />,
  document.getElementById('main')
)
