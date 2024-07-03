import { getApiURL as url } from '../scripts';

export class Api {
  constructor() {
    this.routes = {
      createCarImage: url('/create-car-image'),
      suppliers: url('/suppliers/1/30/?s='), // requires auth token
      allSuppliers: url('/all-suppliers'),
      locations: url('/locations/1/30/en/?s='),
      createCar: url('/create-car'),
    };
  }

  fetchSuppliers = async () => {
    try {
      const res = await fetch(this.routes.allSuppliers);
      this.suppliers = await res.json();
    } catch (err) {
      console.log('Failed to fetch suppliers', err);
      this.suppliers = {};
    }
  };

  fetchLocations = async () => {
    try {
      const res = await fetch(this.routes.locations);
      const data = await res.json();
      this.locations = data[0].resultData;
    } catch (err) {
      console.log('Failed to fetch locations', err);
      this.locations = {};
    }
  };

  fetchAll = () => {
    return Promise.all([this.fetchSuppliers(), this.fetchLocations()]);
  };

  interceptSuppliers = () => cy.intercept(this.routes.suppliers);
  interceptLocations = () => cy.intercept(this.routes.locations);

  interceptCreateCarImage = () =>
    cy.intercept({
      method: 'POST',
      url: this.routes.createCarImage,
    });

  interceptCreateCarSubmit = () =>
    cy.intercept({
      method: 'POST',
      url: this.routes.createCar,
    });
}
