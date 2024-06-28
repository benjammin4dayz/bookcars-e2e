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
export function basicLoginFlow({
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
