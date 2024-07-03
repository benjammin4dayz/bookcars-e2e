import { frontend } from '../../support/bookcars';

const { Home, Search } = frontend;

describe('Search', () => {
  beforeEach(() => {
    Home.visit();
    Home.selectPickupLocation(0);
    Home.selectPickupDate();
    Home.selectDropoffDate();
    Home.searchForCars();
  });

  it('displays results when searching for cars', () => {
    Search.el.carList.each(el => {
      cy.wrap(el).should('exist').and('be.visible');
    });

    Search.el.carList.should('have.length.greaterThan', 0);
  });

  it('has a pickup location input', () => {
    Search.el.pickupLocationInput.should('exist').and('be.visible');
  });

  it('has a pickup date input', () => {
    Search.el.pickupDateInput.should('exist').and('be.visible');
  });

  it('has a dropoff date input', () => {
    Search.el.dropoffDateInput.should('exist').and('be.visible');
  });

  it('has a search button', () => {
    Search.el.searchButton.should('exist').and('be.visible').click();
  });

  it('has a supplier filter', () => {
    Search.el.supplierFilter.should('exist').and('be.visible').click();
  });

  it('has a car specifications filter', () => {
    Search.el.carSpecsFilter.should('exist').and('be.visible').click();
  });

  it('has an engine type filter', () => {
    Search.el.carTypeFilter.should('exist').and('be.visible').click();
  });

  it('has a gearbox filter', () => {
    Search.el.gearboxFilter.should('exist').and('be.visible').click();
  });

  it('has a mileage filter', () => {
    Search.el.mileageFilter.should('exist').and('be.visible').click();
  });

  it('has a fuel policy filter', () => {
    Search.el.fuelPolicyFilter.should('exist').and('be.visible').click();
  });

  it('has a deposit at pickup filter', () => {
    Search.el.depositAtPickupFilter.should('exist').and('be.visible').click();
  });
});
