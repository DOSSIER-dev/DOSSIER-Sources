describe('Delete Sources', () => {
  before(() => {
    cy.db_reset();
  });

  beforeEach(() => {
    cy.login();
  });

  it('Deletes test document', () => {
    cy.visit('/source/1');
    cy.contains('Test Document');

    // Delete
    cy.get('app-delete-confirm').click();
    cy.get('button')
      .contains('Delete')
      .click();
    cy.location('pathname').should('eq', '/dashboard');

    // Check if (not) exists
    cy.visit('/search');
    cy.contains('Test Document').should('not.exist');
  });
});
