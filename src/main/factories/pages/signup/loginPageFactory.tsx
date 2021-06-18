import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeSaveAccessToken } from '../../useCases/saveAccessToken/localSaveAccessTokenFactory'
import { makeSignupValidation } from './signupValidationFactory'
import { makeRemoteAddAccount } from '../../useCases/addAccount/remoteAddAccount'

export const makeSignupPage: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      saveAccessToken={makeSaveAccessToken()}
    />
  )
}
