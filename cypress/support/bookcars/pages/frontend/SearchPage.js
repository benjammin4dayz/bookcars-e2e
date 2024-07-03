import { PageModel } from '../../scripts';

export class SearchPage extends PageModel {
  constructor(route) {
    super({ frontend: route });
  }

  get selectors() {
    return {
      pickupLocationInput: '#\\:r6\\:',
      pickupDateInput: '#\\:r8\\:',
      dropoffDateInput: '#\\:ra\\:',
      searchButton: '.search > .MuiButtonBase-root',
      carList: '.car-list',
      supplierFilter: '.supplier-filter > .accordion',
      carSpecsFilter: '.car-specs-filter > .accordion',
      carTypeFilter: '.car-type-filter > .accordion',
      gearboxFilter: '.gearbox-filter > .accordion',
      mileageFilter: '.mileage-filter > .accordion',
      fuelPolicyFilter: '.fuel-policy-filter > .accordion',
      depositAtPickupFilter: '.deposit-filter > .accordion',
    };
  }
}
