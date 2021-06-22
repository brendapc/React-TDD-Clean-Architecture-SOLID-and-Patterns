describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load login', () => {
    cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'Campo Obrigatório')
  })
})
