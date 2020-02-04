describe('Embed', () => {
  it('Show sources', () => {
    cy.visit(Cypress.env('url_lib'));

    cy.get('sourcesjs-root sourcesjs-libmain')
      .children()
      .should('have.length', 0);

    const EMBED_ID = Cypress.env('micropage_id_image');
    const URL = Cypress.env('url_sources') + '/s/' + EMBED_ID;

    cy.get('a[href="' + URL + '"]').should('have.class', 'sourcesjs-parsed');
    cy.get('a[href="' + URL + '"]').click();
    cy.get('sourcesjs-root sourcesjs-libmain')
      .children()
      .should('have.length', 1);
    cy.get('sourcesjs-root sourcesjs-libmain div.sourcesjs-overlayContainer');
  });
});
