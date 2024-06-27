import {
  NewCar,
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
} from './create-car.helpers';
const BASE_URL = 'http://localhost';

describe('Create Car', () => {
  describe('Form Inputs', () => {
    beforeEach(() => {
      cy.login('backend');
      cy.visit(BASE_URL + ':3001/create-car');
    });

    it('should upload a car avatar image', () => {
      // prepare to capture the POST request after submitting the image
      cy.intercept({
        method: 'POST',
        url: BASE_URL + ':4002/api/create-car-image',
      }).as('createCarImage');

      // upload the image
      uploadImage();

      // assert that the request was successful
      cy.wait('@createCarImage').then(interception => {
        expect(interception.response.statusCode).to.eq(200);
      });
    });

    it('should input a car name', () => {
      const carName = inputName('Lada');
      cy.get(carName).should('have.value', 'Lada');
    });

    it('should select a car supplier', () => {
      selectSupplier();
      // TODO: add an assertion to test the supplier
    });

    it('should input a minimum age', () => {
      const minAge = inputMinAge(21);
      cy.get(minAge).should('have.value', 21);
    });

    it('should select numerous pickup locations', () => {
      selectPickupLocations();
      // TODO: add an assertion to test the pickup locations
    });

    it('should set the price per day', () => {
      const pricePerDay = inputPricePerDay(100);
      cy.get(pricePerDay).should('have.value', 100);
    });

    it('should set the deposit at pickup', () => {
      const deposit = inputDepositAtPickup(100);
      cy.get(deposit).should('have.value', 100);
    });

    it('can toggle availability for rental', () => {
      const available = toggleAvailableForRental();
      cy.get(available).should('be.checked');
    });

    it('should choose the engine', () => {
      const engine = selectEngine('gasoline');
      cy.get(engine).contains('gasoline', { matchCase: false });
    });

    it('should choose the gearbox', () => {
      const gearbox = selectGearbox('automatic');
      cy.get(gearbox).contains('automatic', { matchCase: false });
    });

    it('should choose the seats', () => {
      const seats = selectNumSeats(4);
      cy.get(seats).should('have.text', 4);
    });

    it('should choose the doors', () => {
      const doors = selectNumDoors(4);
      cy.get(doors).should('have.text', 4);
    });

    it('should choose the fuel policy', () => {
      const fuelPolicy = selectFuelPolicy('likeForlike');
      cy.get(fuelPolicy).contains('like for like', { matchCase: false });

      selectFuelPolicy('freeTank');
      cy.get(fuelPolicy).contains('free tank', { matchCase: false });
    });

    it("can toggle aircon. It's quite hot!", () => {
      const aircon = toggleAirCon();
      cy.get(aircon).should('be.checked');
    });

    it('can input mileage', () => {
      const mileage = inputMileage(69420);
      cy.get(mileage).should('have.value', 69420);
    });

    it('can input cancellation fees', () => {
      const cancellations = inputCancellations(100);
      cy.get(cancellations).should('have.value', 100);
    });

    it('can input amendments', () => {
      const amendments = inputAmendments(25);
      cy.get(amendments).should('have.value', 25);
    });

    it('can input theft protection cost', () => {
      const theftProtection = inputTheftProtection(69);
      cy.get(theftProtection).should('have.value', 69);
    });

    it('can input collision damage waiver cost', () => {
      const collisionDamageWaiver = inputCollisionDamageWaiver(420);
      cy.get(collisionDamageWaiver).should('have.value', 420);
    });

    it('can input full insurance cost', () => {
      const fullInsurance = inputFullInsurance(690);
      cy.get(fullInsurance).should('have.value', 690);
    });

    it('can input additional driver cost', () => {
      const additionalDriver = inputAdditionalDriver(1337);
      cy.get(additionalDriver).should('have.value', 1337);
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      cy.login('backend');
      cy.visit(BASE_URL + ':3001/create-car');
    });

    it('should create a new car', () => {
      uploadImage();
      inputName();
      selectSupplier();
      inputMinAge();
      selectPickupLocations();
      inputPricePerDay();
      inputDepositAtPickup();
      toggleAvailableForRental();

      selectEngine();
      selectGearbox();
      selectNumSeats();
      selectNumDoors();
      selectFuelPolicy();
      toggleAirCon();

      // optional
      inputMileage();
      inputCancellations();
      inputAmendments();
      inputTheftProtection();
      inputCollisionDamageWaiver();
      inputFullInsurance();
      inputAdditionalDriver();
      // ---

      // prepare to capture the POST request after submitting the form
      cy.intercept({
        method: 'POST',
        url: BASE_URL + ':4002/api/create-car',
      }).as('createCar');

      // dispatch the POST request
      cy.get(NewCar.SUBMIT).click();

      // wait for a response
      cy.wait('@createCar').then(interception => {
        // assert that the response status is OK
        expect(interception.response.statusCode).to.eq(200);

        // default behavior after successful request is to navigate to /cars
        cy.url().should('eq', BASE_URL + ':3001/cars');

        // assert that the request body is matching the data entry
        const requestBody = interception.request.body;
        cy.fixture('create-car-request-body.json').then(expectedBody => {
          Object.entries(expectedBody).forEach(([key, value]) => {
            // Some values are unique with unpredictable UUIDs postfixed to them.
            // In the mock, set these values equal to type `null` and as a result,
            // that null value will be set here to mirror the request value.
            //
            //! USE THIS SPARINGLY because it will force test assertions to pass.
            if (value === null) {
              cy.log(
                `[WARNING] Detected NULL in mock body. Mirroring value for '${key}' with the request body.`
              );
              expectedBody[key] = requestBody[key];
            }
          });
          expect(requestBody).to.deep.equal(expectedBody);
        });
      });
    });

    after(() => {
      cy.wait(5000); // eslint-disable-line cypress/no-unnecessary-waiting
      const deleteButton =
        ':nth-child(1) > .action > button.MuiButtonBase-root';
      const confirmButton = '.MuiButton-containedError';

      cy.get(deleteButton).click({ force: true });
      cy.get(confirmButton).click({ force: true });
    });
  });
});
