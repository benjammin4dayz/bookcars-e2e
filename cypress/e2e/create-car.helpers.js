// ****************************************************************************
// Page Selectors
//
export const NewCar = {
  // this does not have any :r<NUMBER>: selector (yet)?
  CAR_NAME:
    'div.MuiFormControl-root:nth-child(3) > div:nth-child(2) > input:nth-child(1)',
  SUPPLIER_NAME: '#\\:r0\\:',
  MIN_AGE:
    'div.MuiFormControl-root:nth-child(5) > div:nth-child(2) > input:nth-child(1)',
  PICKUP_LOCATION: '#\\:r2\\:',
  PRICE_PER_DAY: '#\\:r4\\:',
  DEPOSIT_AT_PICKUP: '#\\:r5\\:',
  AVAILABLE_FOR_RENTAL:
    ':nth-child(9) > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input',
  // elements in this block do NOT have IDs, however they DO have unique attributes
  //
  ENGINE: '[aria-controls=":r6:"]',
  GEARBOX: '[aria-controls=":r7:"]',
  SEATS: '[aria-controls=":r8:"]',
  DOORS: '[aria-controls=":r9:"]',
  FUEL_POLICY: '[aria-controls=":ra:"]',
  // ---
  AIRCON:
    ':nth-child(16) > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input',
  MILEAGE: '#\\:rb\\:',
  CANCELLATION: '#\\:rc\\:',
  AMENDMENTS: '#\\:rd\\:',
  THEFT_PROTECTION: '#\\:re\\:',
  COLLISION_DAMAGE_WAIVER: '#\\:rf\\:',
  FULL_INSURANCE: '#\\:rg\\:',
  ADDITIONAL_DRIVER: '#\\:rh\\:',
  SUBMIT: '.buttons > .btn-primary',
};
//
// ----------------------------------------------------------------------------

// ****************************************************************************
// Form Input Helpers - NO TEST ASSERTIONS!
// If applicable, each function returns the selector used to input the value
//

/** @param {string} [fixturePath="cypress/fixtures/create-car-avatar.png"] @returns {null} */
export const uploadImage = (
  fixturePath = 'cypress/fixtures/create-car-avatar.png'
) => {
  //https://stackoverflow.com/questions/68267329/how-to-upload-an-image-in-cypress
  cy.get('input[type="file"]').selectFile(fixturePath, {
    force: true,
  });
  return null;
};

/** @returns {string} Input selector */
export const inputName = (carName = 'Cypress Car') => {
  const input = NewCar.CAR_NAME;
  qcType(input, carName);
  return input;
};

/** @returns {string} Input selector */
export const selectSupplier = (optionIndex = 0) => {
  const input = NewCar.SUPPLIER_NAME;
  cy.get(input).click();
  cy.get(`${input}-option-${optionIndex}`).click();
  return input;
};

/** @returns {string} Input selector */
export const inputMinAge = (n = 21) => {
  const input = NewCar.MIN_AGE;
  qcType(input, n);
  return input;
};

/** @returns {string} Input selector */
export const selectPickupLocations = (numLocations = 5) => {
  const input = NewCar.PICKUP_LOCATION;
  // TODO: check number of available locations
  for (let i = 0; i < numLocations; i++) {
    cy.get(input).click();
    cy.get(`${input}-option-${i}`).click();
  }
  return input;
};

/** @returns {string} Input selector */
export const inputPricePerDay = (n = 100) => {
  const input = NewCar.PRICE_PER_DAY;
  qcType(input, n);
  return input;
};

/** @returns {string} Input selector */
export const inputDepositAtPickup = (n = 100) => {
  const input = NewCar.DEPOSIT_AT_PICKUP;
  qcType(input, n);
  return input;
};

/** @returns {string} Input selector */
export const toggleAvailableForRental = () => {
  const input = NewCar.AVAILABLE_FOR_RENTAL;
  cy.get(input).click();
  return input;
};

/** @returns {string} Input selector */
export const selectEngine = (type = 'gasoline') => {
  const input = selectOption(NewCar.ENGINE, type);
  return input;
};

/** @returns {string} Input selector */
export const selectGearbox = (type = 'automatic') => {
  const input = selectOption(NewCar.GEARBOX, type);
  return input;
};

/** @returns {string} Input selector */
export const selectNumSeats = (n = 4) => {
  const input = selectOption(NewCar.SEATS, n);
  return input;
};

/** @returns {string} Input selector */
export const selectNumDoors = (n = 4) => {
  const input = selectOption(NewCar.DOORS, n);
  return input;
};

/** @returns {string} Input selector */
export const selectFuelPolicy = (policy = 'likeForlike') => {
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
  const input = selectOption(NewCar.FUEL_POLICY, policy);
  return input;
};

/** @returns {string} Input selector */
export const toggleAirCon = () => {
  const input = NewCar.AIRCON;
  cy.get(NewCar.AIRCON).click();
  return input;
};

/** @returns {string} Input selector */
export const inputMileage = (n = 69420) => {
  const input = NewCar.MILEAGE;
  qcType(input, n);
  return input;
};

/** @returns {string} Input selector */
export const inputCancellations = (n = 100) => {
  const input = NewCar.CANCELLATION;
  qcType(input, n);
  return input;
};

/** @returns {string} Input selector */
export const inputAmendments = (n = 25) => {
  const input = NewCar.AMENDMENTS;
  qcType(input, n);
  return input;
};

/** @returns {string} Input selector */
export const inputTheftProtection = (n = 69) => {
  const input = NewCar.THEFT_PROTECTION;
  qcType(input, n);
  return input;
};

/** @returns {string} Input selector */
export const inputCollisionDamageWaiver = (n = 420) => {
  const input = NewCar.COLLISION_DAMAGE_WAIVER;
  qcType(input, n);
  return input;
};

/** @returns {string} Input selector */
export const inputFullInsurance = (n = 690) => {
  const input = NewCar.FULL_INSURANCE;
  qcType(input, n);
  return input;
};

/** @returns {string} Input selector */
export const inputAdditionalDriver = (n = 1337) => {
  const input = NewCar.ADDITIONAL_DRIVER;
  qcType(input, n);
  return input;
};
//
// ----------------------------------------------------------------------------

/**
 * Opens a dropdown by clicking it. Then, finds the element with the 'data-value'
 * attribute that matches the given value, clicks it, and returns its selector.
 * @param {string} input
 * @param {string} value
 * @returns
 */
export function selectOption(input, value) {
  // focus input with click
  cy.get(input).click();
  // click the element whos data-value attribute matches the 'value' param
  cy.get(`[data-value="${value}"]`).click();
  // return the input element handle
  return input;
}

/**
 * 'q'uick 'c'lean Type - quickly get an input, clear it, and type a value
 * - This should be converted into a Cypress command
 * @param {string} input
 * @param {string} value
 */
function qcType(input, value) {
  cy.get(input).clear();
  cy.get(input).type(value, { delay: 0 });
}
