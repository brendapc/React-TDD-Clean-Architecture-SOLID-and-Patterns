import faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.server()

  cy.route({
    method: 'POST',
    url,
    status: 401,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: string): void => {
  cy.server()

  cy.route({
    method,
    url,
    status: faker.helpers.randomize([400,404, 500]),
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mockOkRequest = (url: RegExp, method: string, response: any): void => {
  cy.server()

  cy.route({
    method,
    url,
    status: 200,
    response
  }).as('request')
}
