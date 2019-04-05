describe('View Sources', () => {
  before(() => {
    cy.db_reset();
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  const SELECTOR_MAIN_MENU = 'section.main-menu';
  const SELECTOR_MAIN_CONTENT = 'section.main-content';
  const SELECTOR_SRCS_LIST = 'section.srcs-list';
  const SELECTOR_SRCS_SIDEBAR = 'section.srcs-source-sidebar';
  const SELECTOR_SRC_META = SELECTOR_SRCS_SIDEBAR + ' app-source-meta';

  it('All', () => {
    cy.get(SELECTOR_MAIN_MENU)
      .contains('All')
      .click();

    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');
  });

  it('By collection', () => {
    cy.get(SELECTOR_MAIN_MENU)
      .contains('Collections')
      .click();

    cy.get(SELECTOR_SRCS_LIST).contains('FirstCollection');
    cy.get(SELECTOR_SRCS_LIST).contains('TestCollection');
    cy.get(SELECTOR_SRCS_LIST).contains('ABCCollection');

    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');

    cy.get(SELECTOR_SRCS_LIST)
      .contains('FirstCollection')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');

    cy.get(SELECTOR_SRCS_LIST)
      .contains('TestCollection')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');

    cy.get(SELECTOR_SRCS_LIST)
      .contains('ABCCollection')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');
  });

  it('By tag', () => {
    cy.get(SELECTOR_MAIN_MENU)
      .contains('Tags')
      .click();

    cy.get(SELECTOR_SRCS_LIST).contains('Tag1');
    cy.get(SELECTOR_SRCS_LIST).contains('Tag2');

    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');

    cy.get(SELECTOR_SRCS_LIST)
      .contains('Tag1')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');
    cy.get(SELECTOR_SRCS_LIST)
      .contains('Tag1')
      .click();

    cy.get(SELECTOR_SRCS_LIST)
      .contains('Tag2')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');
    cy.get(SELECTOR_SRCS_LIST)
      .contains('Tag2')
      .click();

    cy.get(SELECTOR_SRCS_LIST)
      .contains('Tag1')
      .click();
    cy.get(SELECTOR_SRCS_LIST)
      .contains('Tag2')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');
  });

  it('By contributor', () => {
    cy.get(SELECTOR_MAIN_MENU)
      .contains('Contributors')
      .click();

    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');

    cy.get(SELECTOR_SRCS_LIST)
      .contains('admin')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');

    cy.get(SELECTOR_SRCS_LIST)
      .contains(' Test User ')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');
  });

  it('By type', () => {
    cy.get(SELECTOR_MAIN_MENU)
      .contains('Type')
      .click();

    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');

    cy.get(SELECTOR_SRCS_LIST)
      .contains('Document')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');

    cy.get(SELECTOR_SRCS_LIST)
      .contains('Image')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');

    cy.get(SELECTOR_SRCS_LIST)
      .contains('Video')
      .click();
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');
  });

  it('By search', () => {
    cy.get(SELECTOR_MAIN_MENU)
      .contains('All')
      .click();

    cy.get(SELECTOR_MAIN_CONTENT)
      .get('form input[type="search"]')
      .clear()
      .type('ima');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');

    cy.get(SELECTOR_MAIN_CONTENT)
      .get('form input[type="search"]')
      .clear()
      .type('docu');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');

    cy.get(SELECTOR_MAIN_CONTENT)
      .get('form input[type="search"]')
      .clear()
      .type('vid');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');
  });

  it('By user', () => {
    cy.get(SELECTOR_MAIN_MENU)
      .contains('My Sources')
      .click();

    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Image Test')
      .should('not.exist');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Video Test')
      .should('not.exist');
  });

  it('Correctly', () => {
    cy.get(SELECTOR_MAIN_MENU)
      .contains('All')
      .click();

    cy.get(SELECTOR_MAIN_CONTENT).contains('Search');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Ranking');

    cy.get(SELECTOR_MAIN_CONTENT).contains('Image Test');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Test Document');
    cy.get(SELECTOR_MAIN_CONTENT).contains('Video Test');

    // Open source detail view
    cy.get(SELECTOR_MAIN_CONTENT)
      .contains('Test Document')
      .click();

    // Nav bar
    cy.get(SELECTOR_SRCS_SIDEBAR).contains('Back');

    // Edit bar
    cy.get(SELECTOR_SRCS_SIDEBAR).get('app-editbar');

    // Source meta
    cy.get(SELECTOR_SRC_META).contains('Document');
    //cy.get(SELECTOR_SRCS_SIDEBAR).get('app-source-meta').contains('Bookmark');
    cy.get(SELECTOR_SRC_META + ' .title').should('have.text', 'Test Document');
    cy.get(SELECTOR_SRC_META + ' app-visibility').contains('Public');
    cy.get(SELECTOR_SRC_META + ' app-embed-code app-copytext input.app-copytext');

    cy.get(SELECTOR_SRC_META).contains(' TestCollection ');
    cy.get(SELECTOR_SRC_META).contains('Tag1');
    cy.get(SELECTOR_SRC_META).contains(' made-with-cc-min.pdf ');

    // Annotations
    cy.get(SELECTOR_SRCS_SIDEBAR + ' app-annotations-list').contains('Text part');

    // Statistics
    cy.get(SELECTOR_SRCS_SIDEBAR).contains('Statistics');

    // Details
    cy.get(SELECTOR_SRCS_SIDEBAR).contains(' Test User ');
    cy.get(SELECTOR_SRCS_SIDEBAR).contains(' Jul 12, 2018 ');
  });
});
