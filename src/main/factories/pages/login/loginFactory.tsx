import { RemoteAuthentication } from '@/data/useCases/authentication/remoteAuthentication'
import { AxiosHttpClient } from '@/infra/http/axiosHttpClient/axiosHttpClient'
import { Login } from '@/presentation/pages'
import { ValidationComposite } from '@/validation/validators'
import React from 'react'
import { ValidationBuilder } from './../../../../validation/validators/builder/validationBuilder'

export const makeLoginPage: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
