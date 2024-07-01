/* eslint-disable mocha/no-top-level-hooks */
import { env } from '../bookcars';

before(() => {
  cy.log('[DEBUG]: Checking for network connectivity...');

  const req = url => cy.request({ url, failOnStatusCode: false });

  req(env.API_URL).then(res => {
    expect(res.status).to.eq(404);
    expect(res.body).to.include('Cannot GET /');
  });

  req(env.BACKEND_URL).then(res => {
    expect(res.status).to.eq(200);
  });

  req(env.FRONTEND_URL).then(res => {
    expect(res.status).to.eq(200);
  });
});
