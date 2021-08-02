import * as Http from './httpMocks'

export const mockUnexpectedError = (): void => Http.mockServerError(/surveys/, 'GET')
