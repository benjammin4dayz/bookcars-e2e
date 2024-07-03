import { frontend } from '../../support/bookcars';

const { About } = frontend;

describe('About', () => {
  beforeEach(() => {
    About.visit();
  });

  it('should visit the page', () => {
    cy.url().should('eq', About.url);
  });

  it('should display a placeholder page', () => {
    About.el.about
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Lorem ipsum dolor');
  });
});
