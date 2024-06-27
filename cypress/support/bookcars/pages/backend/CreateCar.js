import { getBackendURL, qcType, selectOption } from '../../scripts';

export class CreateCar {
  static url = getBackendURL('/create-car');

  static visit() {
    return cy.visit(CreateCar.url);
  }

  static uploadImage(fixturePath = 'cypress/fixtures/create-car-avatar.png') {
    //https://stackoverflow.com/questions/68267329/how-to-upload-an-image-in-cypress
    cy.get('input[type="file"]').selectFile(fixturePath, {
      force: true,
    });
    return null;
  }

  static inputName(carName = 'Cypress Car') {
    return qcType(CreateCar.elements.carName, carName);
  }

  static selectSupplier(optionIndex = 0) {
    const input = CreateCar.elements.supplierName;
    cy.get(input).click();
    cy.get(`${input}-option-${optionIndex}`).click();
    return input;
  }

  static inputMinAge(minAge = 21) {
    return qcType(CreateCar.elements.minAge, minAge);
  }

  static selectPickupLocations(numberOfLocations = 5) {
    const input = CreateCar.elements.pickupLocation;
    for (let i = 0; i < numberOfLocations; i++) {
      cy.get(input).click();
      cy.get(`${input}-option-${i}`).click();
    }
    return input;
  }

  static inputPricePerDay(pricePerDay = 100) {
    return qcType(CreateCar.elements.pricePerDay, pricePerDay);
  }

  static inputDepositAtPickup(depositAtPickup = 100) {
    return qcType(CreateCar.elements.depositAtPickup, depositAtPickup);
  }

  static toggleAvailableForRental() {
    const el = CreateCar.elements.availableForRental;
    cy.get(el).click();
    return el;
  }

  static selectEngine(type = 'gasoline') {
    return selectOption(CreateCar.elements.engine, type);
  }

  static selectGearbox(type = 'automatic') {
    return selectOption(CreateCar.elements.gearbox, type);
  }

  static selectNumSeats(numberOfSeats = 4) {
    return selectOption(CreateCar.elements.seats, numberOfSeats);
  }

  static selectNumDoors(numberOfDoors = 4) {
    return selectOption(CreateCar.elements.doors, numberOfDoors);
  }

  static selectFuelPolicy(policy = 'likeForlike') {
    if (policy !== 'likeForlike' && policy !== 'freeTank') {
      throw new Error(`Invalid fuel policy: ${policy}`);
    }
    // delete this and refactor to use regex for assertions after this is fixed
    // https://stackoverflow.com/questions/18379254/regex-to-split-camel-case
    else if (policy === 'likeForlike') {
      cy.log(
        "This policy name has a casing error in the source code of Bookcars v4.2.0. It should be written as 'likeForLike' and may be changed at any time. If you are unable to select 'Like for Like', you should check this policy name."
      );
    }
    // ---
    return selectOption(CreateCar.elements.fuelPolicy, policy);
  }

  static toggleAirCon() {
    const el = CreateCar.elements.aircon;
    cy.get(el).click();
    return el;
  }

  static inputMileage(mileage = 69420) {
    return qcType(CreateCar.elements.mileage, mileage);
  }

  static inputCancellations(cancellations = 100) {
    return qcType(CreateCar.elements.cancellation, cancellations);
  }

  static inputAmendments(amendments = 25) {
    return qcType(CreateCar.elements.amendments, amendments);
  }

  static inputTheftProtection(theftProtection = 69) {
    return qcType(CreateCar.elements.theftProtection, theftProtection);
  }

  static inputCollisionDamageWaiver(collisionDamageWaiver = 420) {
    return qcType(
      CreateCar.elements.collisionDamageWaiver,
      collisionDamageWaiver
    );
  }

  static inputFullInsurance(fullInsurance = 690) {
    return qcType(CreateCar.elements.fullInsurance, fullInsurance);
  }

  static inputAdditionalDriver(additionalDriver = 1337) {
    return qcType(CreateCar.elements.additionalDriver, additionalDriver);
  }

  static submit() {
    const el = CreateCar.elements.submit;
    cy.get(el).click();
    return el;
  }

  static get elements() {
    return {
      carName:
        'div.MuiFormControl-root:nth-child(3) > div:nth-child(2) > input:nth-child(1)',
      supplierName: '#\\:r0\\:',
      minAge:
        'div.MuiFormControl-root:nth-child(5) > div:nth-child(2) > input:nth-child(1)',
      pickupLocation: '#\\:r2\\:',
      pricePerDay: '#\\:r4\\:',
      depositAtPickup: '#\\:r5\\:',
      availableForRental:
        ':nth-child(9) > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input',
      engine: '[aria-controls=":r6:"]',
      gearbox: '[aria-controls=":r7:"]',
      seats: '[aria-controls=":r8:"]',
      doors: '[aria-controls=":r9:"]',
      fuelPolicy: '[aria-controls=":ra:"]',
      aircon:
        ':nth-child(16) > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input',
      mileage: '#\\:rb\\:',
      cancellation: '#\\:rc\\:',
      amendments: '#\\:rd\\:',
      theftProtection: '#\\:re\\:',
      collisionDamageWaiver: '#\\:rf\\:',
      fullInsurance: '#\\:rg\\:',
      additionalDriver: '#\\:rh\\:',
      submit: '.buttons > .btn-primary',
    };
  }
}
