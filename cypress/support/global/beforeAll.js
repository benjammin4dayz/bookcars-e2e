/* eslint-disable mocha/no-top-level-hooks */
before(() => {
  cy.log('[DEBUG]: Checking for network connectivity...');
  cy.request('https://example.com').then(response => {
    expect(response.status).to.eq(200);
  });
});
