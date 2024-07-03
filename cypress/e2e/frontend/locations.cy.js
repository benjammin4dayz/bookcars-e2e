import { frontend } from '../../support/bookcars';

const { Locations } = frontend;

describe('Suppliers', () => {
  beforeEach(() => {
    Locations.visit();
  });

  it('should visit the page', () => {
    cy.url().should('eq', Locations.url);
  });

  it('should display a map', () => {
    Locations.el.map.should('exist').and('be.visible');
  });

  it('should zoom in on the map', () => {
    Locations.el.zoomIn.should('exist').and('be.visible').click();
  });

  it('should zoom out on the map', () => {
    Locations.el.zoomOut.should('exist').and('be.visible').click();
  });
});
