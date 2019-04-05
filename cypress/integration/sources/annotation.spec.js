describe('Annotations', () => {
  before(() => {
    cy.db_reset();
  });

  beforeEach(() => {
    cy.login();
  });

  it('Open/Close annotation menu', () => {
    cy.visit('/source/3');

    cy.get('app-annotation-panel').should('not.exist');

    cy.get('.annotation').click();
    cy.get('app-annotation-panel');

    cy.get('.srcs-close-button').click();
    cy.get('app-annotation-panel').should('not.exist');

    /*
    //TODO: https://gitlab.com/dossier/sources/issues/189
    cy.get('.annotation').click();
    cy.get('app-annotation-panel');
    cy.get('section.main-content').trigger('mousedown');
    cy.get('app-annotation-panel').should('not.exist');

    cy.get('.annotation').click();
    cy.get('app-annotation-panel');
    cy.get('section.srcs-source-sidebar').trigger('mousedown');
    cy.get('app-annotation-panel').should('not.exist');

    cy.get('.annotation').click();
    cy.get('app-annotation-panel');
    cy.get('app-mainmenu').trigger('mousedown');
    cy.get('app-annotation-panel').should('not.exist');
    */
  });

  it('Edit image annotation', () => {
    const NEW_TITLE = 'Changed Title';
    const NEW_DESCIPTION = 'Changed Description';

    cy.visit('/source/3');

    // Test toggle button
    cy.contains('Add Annotation').click();
    cy.contains('Cancel').click();
    cy.contains('Add Annotation');

    // Click edit annotation
    cy.get('.annotation').click();
    //cy.contains('One Annotation');
    cy.contains('Edit').click();

    // Change
    cy.get('input[formcontrolname="title"]')
      .clear()
      .type(NEW_TITLE);
    cy.get('textarea[name="description"]')
      .clear()
      .type(NEW_DESCIPTION);

    // Save changes
    cy.contains('Save').click();

    // Check result
    cy.contains(NEW_TITLE);
    cy.contains(NEW_DESCIPTION);

    // Close popup
    cy.get('.srcs-close-button').click();

    // Shows up in meta data
    cy.contains(NEW_TITLE); //.click();
  });

  it('Add image annotation', () => {
    const NEW_TITLE = 'New Title';
    const NEW_DESCIPTION = 'New Description';

    cy.visit('/source/3');
    cy.contains('Add Annotation').click();

    // Mark rectangle
    cy.get('.annotation-layer-svg > svg')
      .trigger('mousedown', { clientX: 400, clientY: 50 })
      .trigger('mousemove', { clientX: 500, clientY: 150 })
      .trigger('mouseup');

    // Enter data
    cy.get('input[formcontrolname="title"]')
      .clear()
      .type(NEW_TITLE);
    cy.get('textarea[name="description"]')
      .clear()
      .type(NEW_DESCIPTION);

    // Save changes
    cy.contains('Save').click();

    // Check result
    cy.contains(NEW_TITLE);
    cy.contains(NEW_DESCIPTION);

    // Close popup
    cy.get('.srcs-close-button').click();

    // Shows up in meta data
    cy.contains(NEW_TITLE);
  });
});
