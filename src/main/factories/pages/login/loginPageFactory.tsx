import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/useCases/authentication/remoteAuthentication'
import { makeLoginValidation } from './loginValidationFactory'

export const makeLoginPage: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
