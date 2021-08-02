import faker from 'faker'
import * as Http from './httpMocks'

export const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(/login/)
export const mockUnexpectedError = (): void => Http.mockServerError(/login/, 'POST')
export const mockOkRequest = (): void => Http.mockOkRequest(/login/, 'POST', { accessToken: faker.random.words(), name: faker.name.findName() })
