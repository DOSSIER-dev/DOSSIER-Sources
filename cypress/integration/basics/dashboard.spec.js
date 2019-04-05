describe('Dashboard', () => {
  beforeEach(() => {
    cy.db_reset();
  });

  it('Check content', () => {
    cy.login();
    cy.visit('/dashboard');

    cy.get('app-root').get('.app-container');
    cy.get('app-mainmenu');
    cy.get('section.main-menu');
    cy.get('section.main-content');

    // --- Main Menu

    cy.get('section.main-menu').get('.logo-block');

    cy.get('section.main-menu').contains('All');
    cy.get('section.main-menu').contains('Collections');
    cy.get('section.main-menu').contains('Tags');
    cy.get('section.main-menu').contains('Tags');
    cy.get('section.main-menu').contains('Type');

    cy.get('section.main-menu').contains('My Sources');
    cy.get('section.main-menu').contains('Bookmarks');
    cy.get('section.main-menu').contains('Settings');
    cy.get('section.main-menu').contains('Logout');
    cy.get('section.main-menu').contains('Help');

    // Statistics is visible only for admin
    cy.get('section.main-menu').should('not.contain', 'Statistics');

    cy.get('section.main-menu').contains('Administration');

    cy.get('section.main-menu').get('button[routerlink="/source/add"]');

    // --- Main Content

    cy.get('section.main-content').contains('Welcome back!');
    cy.get('section.main-content').contains('My Statistics');
    cy.get('section.main-content').contains('Bookmarks');
    cy.get('section.main-content').contains('My Sources');
    cy.get('section.main-content').contains(/All My Sources/i);
  });

  it('Shows more menu items for admins', () => {
    cy.loginAdmin();
    cy.visit('/dashboard');
    cy.get('section.main-menu').should('contain', 'Statistics');
  });
});
