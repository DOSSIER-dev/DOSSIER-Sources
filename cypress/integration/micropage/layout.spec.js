describe('Layout', () => {
  const URL = Cypress.env('url_micropage');

  it('Sidebar breakpoints', () => {
    //const VIEWPORT_SMALL = ['iphone-3','iphone-4','iphone-5'];
    //const VIEWPORT_LARGE = ['macbook-15','macbook-13','macbook-11','ipad-2'];
    const VIEWPORT_SMALL = [[320, 480], [320, 568], [375, 667], [414, 736]];
    const VIEWPORT_LARGE = [[1440, 900], [1280, 800], [1366, 768]];
    const VIEWPORT_SMALL_SIDEBAR_WIDTH = 42;
    const VIEWPORT_LARGE_SIDEBAR_WIDTH = 216;

    cy.visit(URL + '/GeKlJqM4');

    VIEWPORT_SMALL.forEach(size => {
      if (Cypress._.isArray(size)) cy.viewport(size[0], size[1]);
      else cy.viewport(size);
      cy.get('app-sidebar')
        .should('have.css', 'width')
        .and('equal', size[0] + 'px');
      cy.get('app-sidebar')
        .should('have.css', 'height')
        .and('equal', VIEWPORT_SMALL_SIDEBAR_WIDTH + 'px');
    });

    VIEWPORT_LARGE.forEach(size => {
      if (Cypress._.isArray(size)) cy.viewport(size[0], size[1]);
      else cy.viewport(size);
      cy.get('app-sidebar')
        .should('have.css', 'width')
        .and('equal', VIEWPORT_LARGE_SIDEBAR_WIDTH + 'px');
      cy.get('app-sidebar')
        .should('have.css', 'height')
        .and('equal', size[1] + 'px');
    });
  });
});
