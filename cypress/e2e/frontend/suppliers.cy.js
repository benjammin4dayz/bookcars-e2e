import { api, frontend } from '../../support/bookcars';

const { Suppliers } = frontend;

describe('Suppliers', () => {
  const suppliers = () => Suppliers.el.suppliers;

  before(async () => {
    await api.fetchSuppliers();
  });

  beforeEach(() => {
    Suppliers.visit();
  });

  it('should visit the page', () => {
    cy.url().should('eq', Suppliers.url);
  });

  it('should display all the suppliers', () => {
    suppliers().should('have.length', api.suppliers.length);
  });

  it('should display the suppliers in an expected order', () => {
    suppliers().each((sup, i) => {
      cy.wrap(sup).should('have.text', api.suppliers[i].fullName);
    });
  });
});
