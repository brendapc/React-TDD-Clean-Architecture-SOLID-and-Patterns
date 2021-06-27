import faker from 'faker'
import * as Helper from './httpMocks'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/, 'POST')
export const mockInvalidResponse = (): void => Helper.mockOkRequest(/signup/, 'POST', { invalid: faker.random.words() })
