import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeLocalUpdateAccount } from '@/main/factories/useCases/localUpdateAccount/localUpdateAccount'
import { makeSignupValidation } from './signupValidationFactory'
import { makeRemoteAddAccount } from '@/main/factories/useCases/addAccount/remoteAddAccount'

export const makeSignupPage: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      updateAccount={makeLocalUpdateAccount()}
    />
  )
}
