describe('Authentication', () => {

  it('Displays login page', () => {
    cy.visit('/login');
    cy.get('.main-content h4').contains('Login');
    cy.get('a[routerlink="/reset-password"]').contains('password');
  });

  it('login', () => {
    cy.login();
    cy.location('pathname').should('eq', '/dashboard');
    cy.contains('Welcome');
  });

  it('logout', () => {
    cy.login();
    cy.contains('Welcome');
    cy.logout();
    cy.location('pathname').should('eq', '/');
    cy.contains('Welcome');
  });

  it('login fail', () => {
    cy.login('nope', 'nope');
    cy.location('pathname').should('eq', '/login');
    cy.contains('Could not authenticate');
  });
});
