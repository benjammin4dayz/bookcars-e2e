import { PageModel } from '../../scripts';

export class CarsPage extends PageModel {
  constructor(route) {
    super({ backend: route });
  }

  // redirects to sign in page when unauthenticated

  get selectors() {
    return {
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
