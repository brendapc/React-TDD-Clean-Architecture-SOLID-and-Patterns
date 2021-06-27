import faker from 'faker'
import * as FormHelper from '../support/formHelper'
import * as HttpHelper from '../support/loginMocks'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should load login with correct initial state', () => {
    cy.getByTestId('username').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('username', 'Campo Obrigatório')
    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Campo Obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo Obrigatório')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo Obrigatório')
    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
