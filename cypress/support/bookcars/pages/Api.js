import { getApiURL } from '../scripts';

export class Api {
  static interceptImageUpload() {
    return cy.intercept({
      method: 'POST',
      url: Api.routes.createCarImage,
    });
  }

  static interceptCreateCar() {
    return cy.intercept({
      method: 'POST',
      url: Api.routes.createCar,
    });
  }

  static interceptSuppliers() {
    return cy.intercept(Api.routes.suppliers);
  }

  static interceptLocations() {
    return cy.intercept(Api.routes.locations);
  }

  static get routes() {
    const api = route => getApiURL('/api' + route);
    return {
      createCarImage: api('/create-car-image'),
      suppliers: api('/suppliers/1/30/?s='),
      locations: api('/locations/1/30/en/?s='),
      createCar: api('/create-car'),
    };
  }
}
