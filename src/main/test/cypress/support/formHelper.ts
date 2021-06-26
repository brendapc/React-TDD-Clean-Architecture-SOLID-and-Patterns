export const testInputStatus = (field: string, error?: string): void => {
  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(field).should(attr, 'title', error)
  cy.getByTestId(`${field}-label`).should(attr, 'title', error)
  cy.getByTestId(`${field}-wrapper`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
}
