import * as Helper from '../support/helpers'

describe('Private routes', () => {
  it('should logout if survey-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
