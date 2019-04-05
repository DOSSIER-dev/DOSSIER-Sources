describe('Administration', () => {
  beforeEach(() => {
    cy.db_reset();
    cy.loginAdmin();
    cy.get('section.main-menu')
      .contains('Administration')
      .click();
    cy.get('app-administration-home')
      .contains('Users')
      .click();
  });

  it('Adds, changes and deletes a user', () => {
    const EMAIL = 'king@kong.com';
    const FIRSTNAME = 'king';
    const LASTNAME = 'kong';

    cy.get('app-administration-home')
      .contains('Add User')
      .click();

    // Add user disables add user button
    cy.get('section.add-item button').should('be.disabled');

    cy.get('app-user-admin-form input[name="email"]').type(EMAIL);
    cy.get('app-user-admin-form input[name="firstname"]').type(FIRSTNAME);
    cy.get('app-user-admin-form input[name="lastname"]').type(LASTNAME);
    cy.get('app-user-admin-form input[name="isActive"]').check();
    cy.get('app-user-admin-form button[type="submit"]').click();

    cy.location('pathname').should('eq', '/settings/users');
    cy.get('section.main-content').contains(EMAIL);
    cy.get('section.main-content').contains(FIRSTNAME);
    cy.get('section.main-content').contains(LASTNAME);

    const EMAIL_NEW = 'changed@another.com';
    const FIRSTNAME_NEW = 'rick';
    const LASTNAME_NEW = 'astley';

    // go to user page
    cy.get('section.main-menu')
      .contains('Administration')
      .click();
    cy.get('app-administration-home')
      .contains('Users')
      .click();

    cy.get('section.main-content')
      .contains(EMAIL)
      .click();
    cy.get('input[name="email"]')
      .clear()
      .type(EMAIL_NEW);
    cy.get('input[name="firstname"]')
      .clear()
      .type(FIRSTNAME_NEW);
    cy.get('input[name="lastname"]')
      .clear()
      .type(LASTNAME_NEW + '{enter}');

    cy.get('section.main-content').contains(LASTNAME_NEW);
    cy.get('section.main-content').contains(FIRSTNAME_NEW);
    cy.get('section.main-content').contains(LASTNAME_NEW);

    // go to user page
    cy.get('section.main-menu')
      .contains('Administration')
      .click();
    cy.get('app-administration-home')
      .contains('Users')
      .click();

    cy.get('section.main-content')
      .contains(EMAIL_NEW)
      .click();
    cy.get('app-delete-confirm').click();
    cy.contains('Delete').click();

    // go to user page
    cy.get('section.main-menu')
      .contains('Administration')
      .click();
    cy.get('app-administration-home')
      .contains('Users')
      .click();

    cy.contains(EMAIL_NEW).should('not.exist');
  });
});
