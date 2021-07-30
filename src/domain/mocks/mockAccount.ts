import { RemoteAuthentication } from '@/data/useCases/authentication/remoteAuthentication'
import faker from 'faker'

export const mockAuthentication = (): RemoteAuthentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): RemoteAuthentication.Model => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})
