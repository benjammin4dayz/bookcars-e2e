import { Api, frontend } from '../../support/bookcars';

const { Home, Search } = frontend;

describe('Home', () => {
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

    it('should display a suppliers header', () => {
      Home.el.suppliersHeader
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Connecting you to the Biggest Brands');
    });

    it('should display a slick slider with brands', () => {
      const els = () => Home.el.slickSlider.find('[title]');

      els().should('exist').and('be.visible').and('have.length.greaterThan', 0);

      els().each(el => {
        expect(el).to.have.attr('title');
        expect(el).to.have.attr('alt').that.equals(el.attr('title'));
      });
    });

    it('should display a map header', () => {
      Home.el.mapHeader
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Map of Car Rental Locations');
    });

    it('should display a map', () => {
      Home.el.map.should('exist').and('be.visible');
    });

    it('should display a footer', () => {
      Home.el.footer.should('exist').and('be.visible');
      Home.el.footerHeader
        .should('exist')
        .and('be.visible')
        .and('have.text', 'BookCars');

      // TODO: add more footer assertions
    });
  });

  describe('Inputs', () => {
    it('should select a location', () => {
      // prepare
      const location = 'Casablanca City';
      Api.interceptLocations().as('locations');

      // dispatch
      Home.el.pickupLocationInput.click();

      // assert
      cy.wait('@locations').then(({ response }) => {
        expect(response.statusCode, 'Unexpected status code').to.eq(200);

        const { resultData } = response.body[0];

        Home.selectPickupLocation(location, resultData);

        // assert that each location has expected props
        resultData.forEach(entry => {
          expect(entry).to.have.all.keys([
            '_id',
            'createdAt',
            'name',
            'updatedAt',
            'value',
            'values',
            '__v',
          ]);
        });

        Home.el.pickupLocationInput.should('have.attr', 'value', location);
      });
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
      Home.el.pickupLocationInput.click();
      Home.selectPickupLocation(0);
      Home.selectPickupDate();
      Home.selectDropoffDate();
      Home.searchForCars();

      // default behavior after successful request is to navigate to /search
      cy.url().should('eq', Search.url);
    });
  });
});
