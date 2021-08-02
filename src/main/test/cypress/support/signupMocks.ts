import faker from 'faker'
import * as Http from './httpMocks'

export const mockEmailInUseError = (): void => Http.mockForbiddenError(/signup/, 'POST')
export const mockUnexpectedError = (): void => Http.mockServerError(/signup/, 'POST')
export const mockInvalidResponse = (): void => Http.mockOkRequest(/signup/, 'POST', { invalid: faker.random.words() })
export const mockOkRequest = (): void => Http.mockOkRequest(/signup/, 'POST', { accessToken: faker.random.words(), name: faker.name.findName() })
