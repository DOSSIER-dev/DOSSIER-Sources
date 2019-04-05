describe('View Micropage', () => {
  const URL = Cypress.env('url_micropage');

  it('Correctly', () => {
    // Test Document
    cy.visit(URL + '/' + Cypress.env('micropage_id_document'));
    cy.get('micropage-sourcetype').contains('Document');
    cy.contains('Test Document');
    cy.get('app-copytext-simple');

    // Image Test
    cy.visit(URL + '/' + Cypress.env('micropage_id_image'));
    cy.get('micropage-sourcetype').contains('Image');
    cy.contains('Image Test');
    cy.get('app-copytext-simple');

    // Video Test
    cy.visit(URL + '/' + Cypress.env('micropage_id_video'));
    cy.contains('Video Test');
    cy.get('micropage-sourcetype').contains('Video');
    cy.contains('Testing video source with a Richard Feynman video.');
    cy.get('app-copytext-simple');
  });

  it('Public annotations', () => {
    const ANNOTATION_ID = Cypress.env('micropage_id_document');
    const ANNOTATION_TITLE = 'Public Annotation';
    const ANNOTATION_DESCRIPTION = 'Annotation-Description, publicly readable.';

    cy.visit(URL + '/' + ANNOTATION_ID);

    cy.get('app-annotation-detail').should('not.exist');

    cy.get('app-sidebar')
      .contains(ANNOTATION_TITLE)
      .click();
    cy.get('app-annotation-detail').contains(ANNOTATION_TITLE);
    cy.get('app-annotation-detail').contains(ANNOTATION_DESCRIPTION);

    cy.get('app-annotation-detail i.close').click();
    cy.get('app-annotation-detail').should('not.exist');
  });

  it('Confidential annotations', () => {
    cy.visit(URL + '/' + Cypress.env('micropage_id_image'));
    cy.get('app-sidebar')
      .contains('One Annotation')
      .should('not.exist');

    cy.visit(URL + '/' + Cypress.env('micropage_id_video'));
    cy.get('app-sidebar')
      .contains('One Annotation')
      .should('not.exist');
  });
});
