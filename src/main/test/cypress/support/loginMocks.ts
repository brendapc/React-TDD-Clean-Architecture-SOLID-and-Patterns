import faker from 'faker'
import * as Helper from './httpMocks'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/login/, 'POST')
export const mockOkRequest = (): void => Helper.mockOkRequest(/login/, 'POST', { accessToken: faker.random.words() })
export const mockInvalidResponse = (): void => Helper.mockOkRequest(/login/, 'POST', { invalid: faker.random.words() })
