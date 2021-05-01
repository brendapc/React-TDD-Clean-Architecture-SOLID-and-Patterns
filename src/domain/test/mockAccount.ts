import { AuthenticationParams } from '@/domain/useCases/authentication'
import faker from 'faker'
import { IAccountModel } from './../models/accountModel'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): IAccountModel => ({
  accessToken: faker.random.uuid()
})
