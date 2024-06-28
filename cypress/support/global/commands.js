import { backend, frontend } from '../bookcars/pages';
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (where, username, password) => {
  switch (where.toLowerCase()) {
    case 'frontend':
      frontend.SignIn.login(username, password);
      break;
    case 'backend':
      backend.SignIn.login(username, password);
      break;
    default:
      throw new Error(
        `Invalid login location: '${where}'. Expected 'frontend' or 'backend'.`
      );
  }
});
