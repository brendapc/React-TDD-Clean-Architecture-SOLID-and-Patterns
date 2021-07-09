import { AuthenticationParams } from '@/domain/useCases'
import faker from 'faker'
import { IAccountModel } from '../models'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): IAccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})
