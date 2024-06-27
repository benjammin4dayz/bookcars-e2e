import * as env from '../env.config';
import { Frontend, Backend } from '../pages';

/**
 * Login to the Bookcars frontend. Defaults to environment credentials
 *
 * @param {string} username Optional username
 * @param {string} password Optional password
 */
export const frontendLogin = (username, password) => {
  _basicLoginFlow({
    username: username || env.FRONTEND_EMAIL,
    password: password || env.FRONTEND_PASSWORD,
    url: Frontend.SignInPage.url,
    usernameSelector: Frontend.SignInPage.elements.emailInput,
    passwordSelector: Frontend.SignInPage.elements.passwordInput,
    submitSelector: Frontend.SignInPage.elements.submitButton,
  });

  cy.visit(Frontend.HomePage.url);
};

/**
 * Login to the Bookcars backend. Defaults to environment credentials
 *
 * @param {string} username Optional username
 * @param {string} password Optional password
 */
export const backendLogin = (username, password) => {
  _basicLoginFlow({
    username: username || env.BACKEND_EMAIL,
    password: password || env.BACKEND_PASSWORD,
    url: Backend.SignInPage.url,
    usernameSelector: Backend.SignInPage.elements.emailInput,
    passwordSelector: Backend.SignInPage.elements.passwordInput,
    submitSelector: Backend.SignInPage.elements.submitButton,
  });

  cy.visit(Backend.SignInPage.url);
};

/**
 * Enters the username, password, and clicks the submit button.
 * Then it saves the credentials in a session.
 * @param {object} loginOptions - The login options object
 * @param {string} loginOptions.username - The username or email to log in with
 * @param {string} loginOptions.password - The password to log in with
 * @param {string} loginOptions.url - The URL to navigate to before logging in
 * @param {string} loginOptions.usernameSelector - HTML selector pointing to the username input text box
 * @param {string} loginOptions.passwordSelector - HTML selector pointing to the password input text box
 * @param {string} loginOptions.submitSelector - HTML selector pointing to the form submit button
 * @param {number} [loginOptions.loadTime=1500] - Duration to wait for page load
 */
function _basicLoginFlow({
  username,
  password,
  url,
  usernameSelector,
  passwordSelector,
  submitSelector,
  loadTime = 1500,
}) {
  cy.session([username, password], () => {
    cy.visit(url);
    cy.get(usernameSelector).type(username);
    cy.get(passwordSelector).type(password);
    cy.get(submitSelector).click();
    cy.wait(loadTime);
  });
}
