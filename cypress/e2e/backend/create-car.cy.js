import { api, backend } from '../../support/bookcars';

const { Cars, CreateCar } = backend;

const {
  el,
  uploadImage,
  inputName,
  selectSupplier,
  inputMinAge,
  selectPickupLocations,
  inputPricePerDay,
  inputDepositAtPickup,
  toggleAvailableForRental,
  selectEngine,
  selectGearbox,
  selectNumSeats,
  selectNumDoors,
  selectFuelPolicy,
  toggleAirCon,
  inputMileage,
  inputCancellations,
  inputAmendments,
  inputTheftProtection,
  inputCollisionDamageWaiver,
  inputFullInsurance,
  inputAdditionalDriver,
  completeForm,
} = CreateCar;

describe('Create Car', () => {
  before(async () => {
    await Promise.all([api.fetchLocations(), api.fetchSuppliers()]);
  });

  beforeEach(() => {
    cy.login('backend');
    CreateCar.visit();
  });

  describe('Form Inputs', () => {
    it('should upload a car avatar image', () => {
      // prepare to capture the POST request after submitting the image
      api.interceptCreateCarImage().as('createCarImage');

      // dispatch the POST request
      uploadImage();

      // assert that the request was successful
      cy.wait('@createCarImage').then(interception => {
        expect(interception.response.statusCode).to.eq(200);
      });
    });

    it('should input a car name', () => {
      inputName('Lada');
      el.carName.should('have.value', 'Lada');
    });

    it('should select a car supplier', () => {
      selectSupplier('Alamo', api.suppliers);
      el.supplierName.should('have.value', 'Alamo');
    });

    it('should input a minimum age', () => {
      inputMinAge(21);
      el.minAge.should('have.value', 21);
    });

    it('should select numerous pickup locations', () => {
      const locations = ['Casablanca City', 'Rabat City', 'Tangier City'];
      const indices = selectPickupLocations(locations, api.locations);

      const peers = () => el.pickupLocation.parent().children();

      // assert that each location is the one we expected
      indices.forEach(i => {
        peers().contains(api.locations[i].name);
      });

      // assert that multiple locations were added. there are 2 existing elements
      // that are NOT locations here, so the +2 is to ignore those
      peers().should('have.length', locations.length + 2);
    });

    it('should set the price per day', () => {
      inputPricePerDay(100);
      el.pricePerDay.should('have.value', 100);
    });

    it('should set the deposit at pickup', () => {
      inputDepositAtPickup(100);
      el.depositAtPickup.should('have.value', 100);
    });

    it('can toggle availability for rental', () => {
      toggleAvailableForRental();
      el.availableForRental.should('be.checked');
    });

    it('should choose the engine', () => {
      selectEngine('gasoline');
      el.engine.contains('gasoline', { matchCase: false });
    });

    it('should choose the gearbox', () => {
      selectGearbox('automatic');
      el.gearbox.contains('automatic', { matchCase: false });
    });

    it('should choose the seats', () => {
      selectNumSeats(4);
      el.seats.should('have.text', 4);
    });

    it('should choose the doors', () => {
      selectNumDoors(4);
      el.doors.should('have.text', 4);
    });

    it('should choose the fuel policy', () => {
      // occasional concurrency issues may occur
      // https://en.wikipedia.org/wiki/Ostrich_algorithm
      //
      selectFuelPolicy('likeForlike');
      el.fuelPolicy.contains('like for like', { matchCase: false });

      selectFuelPolicy('freeTank');
      el.fuelPolicy.contains('Free Tank', { matchCase: false });
    });

    it("can toggle aircon. It's quite hot!", () => {
      toggleAirCon();
      el.aircon.should('be.checked');
    });

    it('can input mileage', () => {
      inputMileage(69420);
      el.mileage.should('have.value', 69420);
    });

    it('can input cancellation fees', () => {
      inputCancellations(100);
      el.cancellation.should('have.value', 100);
    });

    it('can input amendments', () => {
      inputAmendments(25);
      el.amendments.should('have.value', 25);
    });

    it('can input theft protection cost', () => {
      inputTheftProtection(69);
      el.theftProtection.should('have.value', 69);
    });

    it('can input collision damage waiver cost', () => {
      inputCollisionDamageWaiver(420);
      el.collisionDamageWaiver.should('have.value', 420);
    });

    it('can input full insurance cost', () => {
      inputFullInsurance(690);
      el.fullInsurance.should('have.value', 690);
    });

    it('can input additional driver cost', () => {
      inputAdditionalDriver(1337);
      el.additionalDriver.should('have.value', 1337);
    });
  });

  describe('Form Submission', () => {
    let formData;

    before(() => {
      const file = 'create-car-request-body.json';
      cy.fixture(file).then(fixture => {
        expect(fixture, `Cannot find fixture ${file}`).to.be.an('object').that
          .is.not.empty;
        formData = fixture;
      });
    });

    it('should create a new car', () => {
      // complete the form entirely
      completeForm(formData, { submit: false });

      // prepare to capture the POST request when submitting the form
      api.interceptCreateCarSubmit().as('createCar');

      // dispatch the POST request
      CreateCar.submit();

      // wait for a response
      cy.wait('@createCar').then(interception => {
        // assert that the response status is OK
        expect(interception.response.statusCode).to.eq(200);

        // assert that the request body is matching the data entry
        const requestBody = interception.request.body;
        Object.entries(formData).forEach(([key, value]) => {
          // Some values are unique with unpredictable UUIDs postfixed to them.
          // In the mock, set these values equal to type `null` and as a result,
          // that null value will be set here to mirror the request value.
          //
          //! USE THIS SPARINGLY because it will force test assertions to pass.
          if (value === null) {
            cy.log(
              `[WARNING] Detected NULL in mock body. Mirroring value for '${key}' with the request body.`
            );
            formData[key] = requestBody[key];
          }
        });

        expect(requestBody).to.deep.equal(formData);

        // default behavior after successful request is to navigate to /cars
        cy.url().should('eq', Cars.url);

        // check that the expected image was created on the /cars page
        // and is displayed as the first result in the list
        Cars.el.carList.should('exist').and('be.visible');
        Cars.el.carList
          .children()
          .eq(0)
          .find('img')
          .eq(0)
          .should('exist')
          .and('be.visible')
          .and('have.attr', 'src')
          .and('include', interception.response.body.image);
      });
    });
  });
});
