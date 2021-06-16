import faker from 'faker'
import { IAddAccountParams } from '../useCases'

export const mockAddAccountParams = (): IAddAccountParams => {
  const password = faker.internet.password()

  return {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
