import faker from 'faker'
import * as FormHelper from '../support/formHelpers'
import * as Helper from '../support/helpers'
import * as HttpHelper from '../support/signupMocks'

const populateFields = (): void => {
  cy.getByTestId('username').focus().type(faker.name.findName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}
const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit-button').click()
}

describe('SignUp', () => {
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

  it('should present error state if form is invalid', () => {
    cy.getByTestId('username').focus().type(faker.random.alphaNumeric(1))
    FormHelper.testInputStatus('username', 'Valor inválido')
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')
    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido')
    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('username').focus().type(faker.name.findName())
    FormHelper.testInputStatus('username')
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatus('password')
    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation')
    cy.getByTestId('submit-button').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present EmailInUseError on 403', () => {
    HttpHelper.mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('Esse email já está em uso')
    Helper.testUrl('/signup')
  })

  it('should present Unexpected error on default error cases', () => {
    HttpHelper.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente')
    Helper.testUrl('/signup')
  })

  it('should save account if valid credentials are provided', () => {
    HttpHelper.mockOkRequest()
    simulateValidSubmit()
    cy.window().then(window => assert.isOk(window.localStorage.getItem('account')))
    Helper.testUrl('/')
  })

  it('should prevent multiple submits', () => {
    HttpHelper.mockOkRequest()
    populateFields()
    cy.getByTestId('submit-button').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should prevent submit on empty field', () => {
    HttpHelper.mockOkRequest()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })

  it('should submit on press enter', () => {
    HttpHelper.mockOkRequest()
    cy.getByTestId('username').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password).type('{enter}')
  })
})
