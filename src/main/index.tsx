import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/pages'
import { makeLoginPage } from './factories/pages/login/loginFactory'

ReactDOM.render(
  <Router
    makeLoginPage={makeLoginPage}
  />,
  document.getElementById('main')
)
