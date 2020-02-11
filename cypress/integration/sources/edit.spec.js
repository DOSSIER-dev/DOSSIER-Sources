describe('Edit Sources', () => {
  before(() => {
    cy.db_reset();
  });

  beforeEach(() => {
    cy.login();
  });

  it('Change meta data', () => {
    const TITLE = 'My new title';
    const DESCRIPTION = 'My new description';
    const COLLECTION = 'ABCCollection';
    const COUNTRY = 'Djibouti';
    const LANGUAGE = 'Acoli';
    const SOURCE_ID = '666-ZZZ-AAA';

    cy.visit('/source/1/edit');

    cy.get('app-source-form textarea[name="title"]')
      .clear()
      .type(TITLE);
    cy.get('app-source-form textarea[name="description"]')
      .clear()
      .type(DESCRIPTION);
    cy.get('app-source-form input[formcontrolname="collection"]')
      .clear()
      .type(COLLECTION + '{enter}');
    cy.get('app-source-form input[formcontrolname="country"]')
      .clear()
      .type(COUNTRY + '{enter}');
    cy.get('app-source-form input[formcontrolname="language"]')
      .clear()
      .type(LANGUAGE + '{enter}');
    cy.get('app-source-form input[formcontrolname="sourceId"]')
      .clear()
      .type(SOURCE_ID);

    cy.get('section.srcs-source-sidebar button[type="submit"]').click();

    cy.location('pathname').should('eq', '/source/1');
    //cy.get('app-source-meta .title').should('have.text',TITLE);
    cy.get('section.srcs-source-sidebar').contains(TITLE);
    cy.get('section.srcs-source-sidebar').contains(DESCRIPTION);
    cy.get('section.srcs-source-sidebar').contains(COLLECTION);
    cy.get('section.srcs-source-sidebar').contains(LANGUAGE);
    cy.get('section.srcs-source-sidebar').contains(SOURCE_ID);

    cy.visit('/search');
    cy.wait(200);
    cy.get('section.main-content')
      .contains(TITLE)
      .click();
    cy.get('section.srcs-source-sidebar').contains(TITLE);
    cy.get('section.srcs-source-sidebar').contains(DESCRIPTION);
  });

  it('Add tag', () => {
    const SOURCE_TITLE = 'Test Document With Added Tag';
    const TAG = 'TestTag';

    cy.visit('/source/1/edit');

    // Set title
    cy.get('app-source-form textarea[name="title"]')
      .clear()
      .type(SOURCE_TITLE);

    // Add
    cy.get('section.srcs-source-sidebar app-multiselect[name="tags"] input').type(TAG + '{enter}');

    // Result
    cy.get('section.srcs-source-sidebar app-multiselect[name="tags"]').contains(TAG);

    // Submit
    cy.get('section.srcs-source-sidebar button[type="submit"]').click();

    // Result (redirects)
    cy.location('pathname').should('eq', '/source/1');
    cy.location('search').should('eq', '');

    // Check for the tag in the detail view (not edit) site
    cy.get('section.srcs-source-sidebar .tag').contains(TAG);

    // New tag shows up in the sidebar menu list
    cy.visit('/tags');
    cy.get('section.srcs-list')
      .contains(TAG)
      .click();

    // Tag filters works
    cy.contains(SOURCE_TITLE);
  });

  it('Delete tag', () => {
    const TAG = 'Tag1';

    cy.visit('/source/1/edit');

    // Delete
    cy.get('app-source-form app-multiselect[name="tags"]')
      .contains(TAG)
      .find('a')
      .click();

    // Result
    cy.get('section.srcs-source-sidebar app-multiselect[name="tags"]')
      .contains(TAG)
      .should('not.exist');

    // Submit
    cy.get('section.srcs-source-sidebar button[type="submit"]').click();

    // Redirects to view page
    cy.location('pathname').should('eq', '/source/1');
    cy.location('search').should('eq', '');

    // No tag in the sidebar
    cy.get('section.srcs-source-sidebar').should('not.contain', TAG);
  });
});
