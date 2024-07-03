import { frontend } from '../../support/bookcars';

const { ToS } = frontend;

describe('Terms of Service', () => {
  beforeEach(() => {
    ToS.visit();
  });

  it('should visit the page', () => {
    cy.url().should('eq', ToS.url);
  });

  it('should display a placeholder page', () => {
    ToS.el.terms
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Lorem ipsum dolor');
  });
});
