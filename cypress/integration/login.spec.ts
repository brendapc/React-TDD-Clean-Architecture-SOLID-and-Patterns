describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load login', () => {
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo Obrigatório')
  })
})
