describe('Settings', () => {
  before(() => {
    cy.db_reset();
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/usersettings');
  });

  afterEach(() => {
    cy.logout();
  });

  it('Change username', () => {
    const NEW_FIRSTNAME = 'Rick';
    const NEW_LASTNAME = 'Astley';

    cy.get('app-user-settings-view input[name="firstname"]')
      .clear()
      .type(NEW_FIRSTNAME);
    cy.get('app-user-settings-view input[name="lastname"]')
      .clear()
      .type(NEW_LASTNAME);
    cy.get('app-user-settings-view button[type="submit"]')
      .first()
      .click();

    // Check change in mainmenu
    cy.get('app-mainmenu').contains(NEW_FIRSTNAME + ' ' + NEW_LASTNAME);

    // Check user listing as admin
    cy.logout();
    cy.loginAdmin();
    cy.visit('/settings');
    cy.get('app-administration-home section.srcs-list')
      .contains('Users')
      .click();
    cy.get('app-administration-home').contains(NEW_FIRSTNAME);
    cy.get('app-administration-home').contains(NEW_LASTNAME);
  });

  it('Change password', () => {
    const OLD_PASSWORD = 'test1234';
    const NEW_PASSWORD = 'rambazamba';

    cy.get('input[name="oldPassword"]')
      .clear()
      .type(OLD_PASSWORD);
    cy.get('input[name="newPassword1"]')
      .clear()
      .type(NEW_PASSWORD);
    cy.get('input[name="newPassword2"]')
      .clear()
      .type(NEW_PASSWORD);
    cy.get('button[type="submit"]')
      .last()
      .click();

    cy.logout();
    cy.location('pathname').should('eq', '/');

    cy.visit('/');
    cy.login('test@tt4.at', NEW_PASSWORD);
    cy.location('pathname').should('eq', '/dashboard');
  });
});
