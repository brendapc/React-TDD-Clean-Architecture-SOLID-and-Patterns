import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/main/router/Router'
import { makeLoginPage } from './factories/pages/login/loginPageFactory'
import { makeSignupPage } from './factories/pages/signup/signupPageFactory'

ReactDOM.render(
  <Router
    makeLoginPage={makeLoginPage}
    makeSignupPage={makeSignupPage}
  />,
  document.getElementById('main')
)
