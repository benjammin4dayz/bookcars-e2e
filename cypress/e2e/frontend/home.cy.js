import { api, frontend } from '../../support/bookcars';

const { Home, Search } = frontend;

describe('Home', () => {
  before(async () => {
    await api.fetchLocations();
  });

  beforeEach(() => {
    Home.visit();
  });

  describe('Elements', () => {
    it('should display the cover', () => {
      Home.el.cover
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Top Car Rental Companies');
    });

    it('should display a pickup location input', () => {
      Home.el.pickupLocationInput.should('exist').and('be.visible');
      cy.contains('Pickup location').should('exist').and('be.visible');
    });

    it('should display a pickup date input', () => {
      Home.el.pickupDateInput.should('exist').and('be.visible');
      cy.contains('Pick-up Date').should('exist').and('be.visible');
    });

    it('should display a dropoff location input', () => {
      Home.el.dropOffDateInput.should('exist').and('be.visible');
      cy.contains('Drop-off Date').should('exist').and('be.visible');
    });

    it('should display a submit button', () => {
      Home.el.submitButton
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Search');
    });

    it('should display a section with supplier brands', () => {
      Home.el.suppliersHeader
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Connecting you to the Biggest Brands');

      const els = () => Home.el.slickSlider.find('[title]');

      els().should('exist').and('be.visible').and('have.length.greaterThan', 0);

      els().each(el => {
        expect(el).to.have.attr('title');
        expect(el).to.have.attr('alt').that.equals(el.attr('title'));
        expect(el).to.have.attr('src').that.is.not.empty;
      });
    });

    it('should display a section with a map', () => {
      Home.el.mapHeader
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Map of Car Rental Locations');

      Home.el.map.should('exist').and('be.visible');
    });

    it('should display a footer', () => {
      Home.el.footer.should('exist').and('be.visible');

      Home.el.footerHeader
        .should('exist')
        .and('be.visible')
        .and('have.text', 'BookCars');

      Home.el.footerCorporate
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Corporate');
      Home.el.footerAboutUs
        .should('exist')
        .and('be.visible')
        .and('have.text', 'About Us');
      Home.el.footerTermsOfService
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Terms of Service');

      Home.el.footerRentACar
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Rent a Car');
      Home.el.footerSuppliers
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Suppliers');
      Home.el.footerLocations
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Locations');

      Home.el.footerSupport
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Support');
      Home.el.footerContact
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Contact');
      Home.el.footerEmail
        .should('exist')
        .and('be.visible')
        .and('have.text', 'info@bookcars.ma');

      Home.el.footerPayment.should('exist').and('be.visible');
      Home.el.footerPaymentText
        .should('exist')
        .and('be.visible')
        .and('have.text', '100% secure payment with BookCars');
      Home.el.footerPaymentImage
        .should('exist')
        .and('be.visible')
        .and('have.attr', 'src', '/assets/secure-payment-BGw0rBpy.png');
      Home.el.footerCopyright
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Copyright © 2024 BookCars. All rights reserved.');
    });
  });

  describe('Inputs', () => {
    it('should select a location', () => {
      const location = 'Casablanca City';
      Home.selectPickupLocation(location, api.locations);
      Home.el.pickupLocationInput.should('have.attr', 'value', location);
    });

    it('should select a pickup date', () => {
      const date = Home.selectPickupDate();

      Home.el.pickupDateInput.should('have.attr', 'value', date);
    });

    it('should select a dropoff date', () => {
      const date = Home.selectDropoffDate();

      Home.el.dropOffDateInput.should('have.attr', 'value', date);
    });
  });

  describe('Form Submission', () => {
    it('should submit the form', () => {
      Home.selectPickupLocation(0);
      Home.selectPickupDate();
      Home.selectDropoffDate();
      Home.searchForCars();

      // default behavior after successful request is to navigate to /search
      cy.url().should('eq', Search.url);
    });
  });
});
