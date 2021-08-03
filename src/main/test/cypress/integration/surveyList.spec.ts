import faker from 'faker'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/httpMocks'

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockOkRequest = (): void => Http.mockOkRequest(path, 'GET', 'fx:survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
  })

  it('should present error on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    mockAccessDeniedError()
    cy.visit('')
    const account = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', account.name)
  })

  it('should logout properly on button click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })

  it('should present survey items on success', () => {
    mockOkRequest()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'ago.')
      assert.equal(li.find('[data-testid="year"]').text(), '2021')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="thumbs-icon"]').attr('src'), icon.thumbsUp)
      })
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '05')
      assert.equal(li.find('[data-testid="month"]').text(), 'set.')
      assert.equal(li.find('[data-testid="year"]').text(), '2021')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="thumbs-icon"]').attr('src'), icon.thumbsDown)
      })
    })
  })

  it('should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
    mockOkRequest()
    cy.getByTestId('reload-button').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })
})
