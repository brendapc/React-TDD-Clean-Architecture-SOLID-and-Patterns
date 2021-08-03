import faker from 'faker'
import * as FormHelper from '../utils/formHelpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/httpMocks'

const path = /signup/
const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST')
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockInvalidResponse = (): void => Http.mockOkRequest(path, 'POST', { invalid: faker.random.words() })
const mockOkRequest = (): void => Http.mockOkRequest(path, 'POST', 'fx:account')

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
    mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('Esse email já está em uso')
    Helper.testUrl('/signup')
  })

  it('should present Unexpected error on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente')
    Helper.testUrl('/signup')
  })

  it('should save account if valid credentials are provided', () => {
    mockOkRequest()
    simulateValidSubmit()
    cy.window().then(window => assert.isOk(window.localStorage.getItem('account')))
    Helper.testUrl('/')
  })

  it('should prevent multiple submits', () => {
    mockOkRequest()
    populateFields()
    cy.getByTestId('submit-button').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should prevent submit on empty field', () => {
    mockOkRequest()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })

  it('should submit on press enter', () => {
    mockOkRequest()
    cy.getByTestId('username').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password).type('{enter}')
  })
})
