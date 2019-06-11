describe('Add Sources', () => {
  beforeEach(() => {
    cy.db_reset();
    cy.login();
    cy.visit('/source/add');
  });

  it('Add document source', () => {
    const SOURCE_TITLE = 'My document title';
    const SOURCE_DESCRIPTION = 'My description';
    const SOURCE_COLLECTION = 'TestCollection';
    const SOURCE_TAG = 'Document-Tag';
    const SOURCE_COUNTRY = 'Austria';
    const SOURCE_LANGUAGE = 'German';
    const SOURCE_DATE = 'Jan 1, 2012';  // this format is understood by the datepicker
    const SOURCE_ID = '987123';

    cy.contains('Document').click();
    cy.get('sources-sourcetype').contains('Document');

    // Enter source meta data
    cy.get('textarea[name="title"]').type(SOURCE_TITLE);
    cy.get('textarea[name="description"]').type(SOURCE_DESCRIPTION);
    cy.get('input[formcontrolname="collection"]').type(SOURCE_COLLECTION + '{enter}');
    cy.get('app-multiselect[formcontrolname="tags"] input').type(SOURCE_TAG + '{enter}');
    cy.get('input[formcontrolname="country"]').type(SOURCE_COUNTRY + '{enter}');
    cy.get('input[formcontrolname="language"]').type(SOURCE_LANGUAGE + '{enter}');
    cy.get('input[formcontrolname="date"]').type(SOURCE_DATE);
    cy.get('input[formcontrolname="sourceId"]').type(SOURCE_ID);

    // Submit
    cy.get('button[type="submit"].srcs-navbutton').click();

    // Check result
    cy.location('pathname').should('include', '/source');
    cy.get('sources-sourcetype').contains('Document');
    cy.get('h2.title').contains(SOURCE_TITLE);
    cy.get('app-visibility > label').should('have.text', 'Confidential');
    cy.contains(SOURCE_DESCRIPTION);
    cy.contains(SOURCE_TAG);
    cy.contains(SOURCE_DATE);
    cy.contains(SOURCE_ID);
    cy.contains('Test User');

    // cy.get('app-embed-code input').contains('http');

    // Check listing
    cy.visit('/type?_s_type=DOC');
    cy.contains(SOURCE_TITLE).click();
    cy.contains(SOURCE_DESCRIPTION);
    cy.contains(SOURCE_TAG);
    cy.contains(SOURCE_DATE);
    cy.contains(SOURCE_ID);

    // Delete the created source
    //cy.get('app-delete-confirm').click();
    //cy.get('button').contains('Delete').click();
    //cy.url().should('include','/dashboard');
    //cy.location('pathname').should('eq','/dashboard');
  });

  it('Add image source', () => {
    const SOURCE_TITLE = 'My image title';
    const SOURCE_DESCRIPTION = 'Image description';
    const SOURCE_COLLECTION = 'TestCollection';
    const SOURCE_TAG = 'Image-Tag';
    const SOURCE_COUNTRY = 'Germany';
    const SOURCE_LANGUAGE = 'English';
    const SOURCE_DATE = 'Apr 3, 2019';
    const SOURCE_ID = '123000';

    cy.contains('Image').click();
    cy.get('sources-sourcetype').contains('Image');

    // Enter source meta data
    cy.get('textarea[name="title"]').type(SOURCE_TITLE);
    cy.get('textarea[name="description"]').type(SOURCE_DESCRIPTION);
    cy.get('input[formcontrolname="collection"]').type(SOURCE_COLLECTION + '{enter}');
    cy.get('app-multiselect[formcontrolname="tags"] input').type(SOURCE_TAG + '{enter}');
    cy.get('input[formcontrolname="country"]').type(SOURCE_COUNTRY + '{enter}');
    cy.get('input[formcontrolname="language"]').type(SOURCE_LANGUAGE + '{enter}');
    cy.get('input[formcontrolname="date"]').type(SOURCE_DATE);
    cy.get('input[formcontrolname="sourceId"]').type(SOURCE_ID);

    // Check dragover droparea highlight
    cy.get('.drop-container')
      .trigger('dragover')
      .should('have.class', 'is-drop-over')
      .trigger('dragleave')
      .should('not.have.class', 'is-drop-over');

    // // Add/Upload image file
    // //const fileName = 'skeletor.png';
    // //const mimeType = 'image/png' ;

    // //Using the cypress upload plugin
    // cy.fixture(fileName, 'base64').then(b64 => {
    //   cy.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><');
    //   cy.get('.drop-container').upload(b64, fileName, mimeType);
    //   cy.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><');
    // });

    // cy.fixture(fileName, 'base64').then(b64 => {
    //   var blob = Cypress.Blob.base64StringToBlob(b64, mimeType);
    //   const file = new window.File([blob], fileName, { type: mimeType });
    //   cy.get('.drop-container').trigger('drop', {
    //     dataTransfer: { files: [file], types: ['Files'] }
    //   });
    //   cy.log(blob);
    // });

    // cy.fixture(fileName, 'base64').then(b64 => {
    //   cy.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><');
    //   var blob = Cypress.Blob.base64StringToBlob(b64, mimeType);
    //   const file = new window.File([blob], fileName, { type: mimeType });
    //   cy.log(file);
    //   cy.get('.drop-container').trigger('drop', {
    //     dataTransfer: {
    //       files: [file],
    //       types: ['Files']
    //     }
    //   });
    // });

    // Submit
    cy.get('button[type="submit"].srcs-navbutton').click();

    // Check result
    cy.location('pathname').should('include', '/source');
    cy.get('sources-sourcetype').contains('Image');
    cy.get('h2.title').contains(SOURCE_TITLE);
    cy.get('app-visibility > label').should('have.text', 'Confidential');
    cy.contains(SOURCE_DESCRIPTION);
    cy.contains(SOURCE_ID);
    cy.contains(SOURCE_TAG);
    cy.contains(SOURCE_DATE);

    // Check listing
    cy.visit('/type?_s_type=IMG');
    cy.contains(SOURCE_TITLE).click();
    cy.contains(SOURCE_DESCRIPTION);
    cy.contains(SOURCE_TAG);
    cy.contains(SOURCE_DATE);
    cy.contains(SOURCE_ID);
  });

  it('Add youtube video source', () => {
    const SOURCE_TITLE = 'My video title';
    const SOURCE_DESCRIPTION = 'Youtube text description';
    const SOURCE_COLLECTION = 'TestCollection';
    const SOURCE_TAG = 'YoutubeTag';
    const SOURCE_ID = '87654321';
    const SOURCE_YOUTUBE_ID = 'Y33-1cOkg4k';
    const SOURCE_YOUTUBE_URL = 'https://www.youtube.com/watch?v=' + SOURCE_YOUTUBE_ID;

    cy.get('section.srcs-list')
      .contains('Video')
      .click();

    cy.get('section.srcs-source-sidebar sources-sourcetype').contains('Video');

    // Enter source meta data
    cy.get('app-source-form textarea[name="title"]').type(SOURCE_TITLE);
    cy.get('app-source-form textarea[name="description"]').type(SOURCE_DESCRIPTION);
    cy.get('app-source-form input[formcontrolname="collection"]').type(
      SOURCE_COLLECTION + '{enter}'
    );
    cy.get('app-source-form app-multiselect[formcontrolname="tags"] input').type(
      SOURCE_TAG + '{enter}'
    );
    cy.get('app-source-form input[name="sourceId"]').type(SOURCE_ID);

    cy.get('app-link-input button[type="submit"]').should('have.attr', 'disabled');

    // Enter invalid youtube url
    cy.get('app-sourceref-input input').type('wasd');
    cy.wait(500);
    cy.get('app-link-input button[type="submit"]').should('have.attr', 'disabled');

    // Enter invalid youtube url
    cy.get('app-sourceref-input input')
      .clear()
      .type('https://example.com/watch?v=qb6L4C8AxBY');
    cy.wait(500);
    cy.get('app-link-input button[type="submit"]').should('have.attr', 'disabled');

    // Enter valid youtube url
    cy.get('app-sourceref-input input')
      .clear()
      .type(SOURCE_YOUTUBE_URL);
    cy.wait(500);
    cy.get('app-link-input button[type="submit"]').should('not.have.attr', 'disabled');

    // Fetch video
    cy.get('app-link-input button[type="submit"]').click();

    // Video fetched
    cy.get('app-video');

    // Submit
    cy.get('section.srcs-source-sidebar button[type="submit"].srcs-navbutton').click();

    // Check result
    cy.location('pathname').should('include', '/source');
    cy.get('app-source-meta sources-sourcetype').contains('Video');
    cy.get('app-source-meta .title').contains(SOURCE_TITLE);
    cy.get('app-source-meta app-visibility > label').should('have.text', 'Confidential');
    cy.get('app-source-meta').contains(SOURCE_DESCRIPTION);
    cy.get('app-source-meta').contains(SOURCE_ID);
    cy.get('app-source-meta').contains(SOURCE_TAG);

    // Check listing
    cy.visit('/type?_s_type=VIDEO');
    cy.wait(200);
    cy.get('section.main-content')
      .contains(SOURCE_TITLE)
      .click();
    cy.get('app-source-meta sources-sourcetype').contains('Video');
    cy.get('app-source-meta .title').contains(SOURCE_TITLE);
    cy.get('app-source-meta app-visibility > label').should('have.text', 'Confidential');
    cy.get('app-source-meta').contains(SOURCE_DESCRIPTION);
    cy.get('app-source-meta').contains(SOURCE_ID);
    cy.get('app-source-meta').contains(SOURCE_TAG);
  });

  it('Add vimeo video source', () => {
    const SOURCE_TITLE = 'My vimeo title';
    const SOURCE_DESCRIPTION = 'Vimeo description';
    const SOURCE_COLLECTION = 'TestCollection';
    const SOURCE_TAG = 'Vimeo-Tag';
    const SOURCE_ID = '123';
    const SOURCE_VIMEO_ID = '241269961';
    const SOURCE_VIMEO_URL = 'https://vimeo.com/' + SOURCE_VIMEO_ID;

    cy.get('section.srcs-list')
      .contains('Video')
      .click();

    cy.get('section.srcs-source-sidebar sources-sourcetype').contains('Video');

    // Enter source meta data
    cy.get('app-source-form textarea[name="title"]').type(SOURCE_TITLE);
    cy.get('app-source-form textarea[name="description"]').type(SOURCE_DESCRIPTION);
    cy.get('app-source-form input[formcontrolname="collection"]').type(
      SOURCE_COLLECTION + '{enter}'
    );
    cy.get('app-source-form app-multiselect[formcontrolname="tags"] input').type(
      SOURCE_TAG + '{enter}'
    );
    cy.get('app-source-form input[name="sourceId"]').type(SOURCE_ID);

    cy.get('app-link-input button[type="submit"]').should('have.attr', 'disabled');

    // Enter invalid vimeo url
    cy.get('app-sourceref-input input').type('wasd');
    cy.wait(500);
    cy.get('app-link-input button[type="submit"]').should('have.attr', 'disabled');

    // Enter invalid vimeo url
    //cy.get('app-sourceref-input input').clear().type('https://example.com/watch?v=qb6L4C8AxBY');
    cy.get('app-sourceref-input input')
      .clear()
      .type('https://example.com/invalid');
    cy.wait(500);
    cy.get('app-link-input button[type="submit"]').should('have.attr', 'disabled');

    // Enter valid vimeo url
    cy.get('app-sourceref-input input')
      .clear()
      .type(SOURCE_VIMEO_URL);
    cy.wait(500);
    cy.get('app-link-input button[type="submit"]').should('not.have.attr', 'disabled');

    // Fetch video
    cy.get('app-link-input button[type="submit"]').click();

    // Video fetched
    cy.get('app-video');

    // Submit
    cy.get('section.srcs-source-sidebar button[type="submit"].srcs-navbutton').click();

    // Check result
    cy.location('pathname').should('include', '/source');
    cy.get('app-source-meta sources-sourcetype').contains('Video');
    cy.get('app-source-meta .title').contains(SOURCE_TITLE);
    cy.get('app-source-meta app-visibility > label').should('have.text', 'Confidential');
    cy.get('app-source-meta').contains(SOURCE_DESCRIPTION);
    cy.get('app-source-meta').contains(SOURCE_ID);
    cy.get('app-source-meta').contains(SOURCE_TAG);

    // Check listing
    cy.visit('/type?_s_type=VIDEO');
    cy.wait(200);
    cy.get('section.main-content')
      .contains(SOURCE_TITLE)
      .click();
    cy.get('app-source-meta sources-sourcetype').contains('Video');
    cy.get('app-source-meta .title').contains(SOURCE_TITLE);
    cy.get('app-source-meta app-visibility > label').should('have.text', 'Confidential');
    cy.get('app-source-meta').contains(SOURCE_DESCRIPTION);
    cy.get('app-source-meta').contains(SOURCE_ID);
    cy.get('app-source-meta').contains(SOURCE_TAG);
  });
});
