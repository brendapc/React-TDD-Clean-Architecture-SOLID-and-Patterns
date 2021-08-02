import faker from 'faker'
import * as Helper from '../support/helpers'
import * as Http from '../support/surveyListMocks'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
  })

  it('should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
  })

  it('should present error on AccessDeniedError', () => {
    Http.mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    Http.mockAccessDeniedError()
    cy.visit('')
    const account = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', account.name)
  })

  it('should logout properly on button click', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })
})
