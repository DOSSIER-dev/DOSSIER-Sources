// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Login test user
 */
//Cypress.Commands.add("login", (user='test@tt4.at',password='test1234') => {

Cypress.Commands.add( "login", (user,password) => {
  if( !user ) user = Cypress.env( 'user_name' );
  if( !password  ) password = Cypress.env( 'user_password' );
  cy.server();
  cy.route( { method: 'POST', url: '**/login/' } ).as( 'doLogin' );
  cy.clearCookies();
  localStorage.clear();
  sessionStorage.clear();
  cy.visit('/');
  cy.get('app-mainmenu').contains('Login').click();
  cy.get('app-login-view input[name="username"]').type(user);
  cy.get('app-login-view input[name="password"]').type(password);
  cy.get('app-login-view button[type="submit"]').click();
  cy.wait(['@doLogin']);
});

/**
 * Login admin
 */
Cypress.Commands.add("loginAdmin", () => {
  cy.login( Cypress.env('admin_name'), Cypress.env('admin_password') );
});

/**
 * Logout
 */
Cypress.Commands.add("logout", () => {
  cy.get('app-mainmenu').contains('Logout').click();
});

/**
 * Reset the test db
 */
Cypress.Commands.add("db_reset", () => {
  cy.exec('./db-import.sh NO_CLI').its('code').should('eq',0);
});

/*
Cypress.Commands.add("visitMicropage", (id,url='http://127.0.0.1:4202') => {
  cy.visit( url+'/'+id );
});
*/
