import faker from 'faker'
import { IAddAccount } from '../useCases'

export const mockAddAccountParams = (): IAddAccount.Params => {
  const password = faker.internet.password()

  return {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
