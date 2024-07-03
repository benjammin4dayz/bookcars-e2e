import {
  PageModel,
  qcType,
  selectOption,
  selectEffectfulOption,
} from '../../scripts';

export class CreateCarPage extends PageModel {
  constructor(route) {
    super({ backend: route });
  }

  uploadImage = (fixturePath = 'cypress/fixtures/create-car-avatar.png') => {
    //https://stackoverflow.com/questions/68267329/how-to-upload-an-image-in-cypress
    cy.get('input[type="file"]').selectFile(fixturePath, {
      force: true,
    });
  };

  inputName = (carName = 'Cypress Car') => {
    qcType(this.selectors.carName, carName);
  };

  selectSupplier = (target = 0, dataset) => {
    return selectEffectfulOption({
      inputEl: this.selectors.supplierName,
      matchKey: 'fullName',
      target,
      dataset,
    });
  };

  inputMinAge = (minAge = 21) => {
    qcType(this.selectors.minAge, minAge);
  };

  selectPickupLocations = (target = 0, dataset) => {
    const opts = {
      inputEl: this.selectors.pickupLocation,
      matchKey: 'name',
      target,
      dataset,
    };

    const indices = [];

    if (Array.isArray(target)) {
      for (let i = 0; i < target.length; i++) {
        const index = selectEffectfulOption({ ...opts, target: target[i] });
        indices.push(index);
      }
    }

    return indices.length ? indices : selectEffectfulOption(opts);
  };

  inputPricePerDay = (pricePerDay = 100) => {
    qcType(this.selectors.pricePerDay, pricePerDay);
  };

  inputDepositAtPickup = (depositAtPickup = 100) => {
    qcType(this.selectors.depositAtPickup, depositAtPickup);
  };

  toggleAvailableForRental = () => {
    cy.get(this.selectors.availableForRental).click();
  };

  selectEngine = (type = 'gasoline') => {
    selectOption(this.selectors.engine, type);
  };

  selectGearbox = (type = 'automatic') => {
    selectOption(this.selectors.gearbox, type);
  };

  selectNumSeats = (numberOfSeats = 4) => {
    selectOption(this.selectors.seats, numberOfSeats);
  };

  selectNumDoors = (numberOfDoors = 4) => {
    selectOption(this.selectors.doors, numberOfDoors);
  };

  selectFuelPolicy = (policy = 'likeForlike') => {
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
    selectOption(this.selectors.fuelPolicy, policy);
  };

  toggleAirCon = () => {
    cy.get(this.selectors.aircon).click();
  };

  inputMileage = (mileage = 69420) => {
    qcType(this.selectors.mileage, mileage);
  };

  inputCancellations = (cancellations = 100) => {
    qcType(this.selectors.cancellation, cancellations);
  };

  inputAmendments = (amendments = 25) => {
    qcType(this.selectors.amendments, amendments);
  };

  inputTheftProtection = (theftProtection = 69) => {
    qcType(this.selectors.theftProtection, theftProtection);
  };

  inputCollisionDamageWaiver = (collisionDamageWaiver = 420) => {
    qcType(this.selectors.collisionDamageWaiver, collisionDamageWaiver);
  };

  inputFullInsurance = (fullInsurance = 690) => {
    qcType(this.selectors.fullInsurance, fullInsurance);
  };

  inputAdditionalDriver = (additionalDriver = 1337) => {
    qcType(this.selectors.additionalDriver, additionalDriver);
  };

  submit = () => {
    cy.get(this.selectors.submit).click();
  };

  completeForm = (formData, { submit = false, optional = true } = {}) => {
    const {
      // image,
      name,
      // supplier,
      minimumAge,
      // locations,
      price,
      deposit,
      available,
      type,
      gearbox,
      aircon,
      seats,
      doors,
      fuelPolicy,
      mileage,
      cancellation,
      amendments,
      theftProtection,
      collisionDamageWaiver,
      fullInsurance,
      additionalDriver,
    } = formData;

    this.uploadImage();
    this.inputName(name);
    this.selectSupplier();
    this.inputMinAge(minimumAge);
    for (let i = 0; i < 5; i++) {
      this.selectPickupLocations(i);
    }
    this.inputPricePerDay(price);
    this.inputDepositAtPickup(deposit);
    this.toggleAvailableForRental(available);
    this.selectEngine(type);
    this.selectGearbox(gearbox);
    this.selectNumSeats(seats);
    this.selectNumDoors(doors);
    this.selectFuelPolicy(fuelPolicy);
    this.toggleAirCon(aircon);

    if (optional) {
      this.inputMileage(mileage);
      this.inputCancellations(cancellation);
      this.inputAmendments(amendments);
      this.inputTheftProtection(theftProtection);
      this.inputCollisionDamageWaiver(collisionDamageWaiver);
      this.inputFullInsurance(fullInsurance);
      this.inputAdditionalDriver(additionalDriver);
    }

    if (submit) {
      this.submit();
    }
  };

  get selectors() {
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
