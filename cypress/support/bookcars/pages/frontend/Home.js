import { getFrontendURL } from '../../scripts';

export class Home {
  static url = getFrontendURL('/');

  static visit() {
    return cy.visit(Home.url);
  }

  static get elements() {
    return {
      logo: '#root > div.app > div.content > div > div > div.home-logo > span.home-logo-main',
      pickupLocationInput: '',
      dropOffLocationInput: '',
      dateFromInput: '',
      dateFromPicker: '',
      dateToInput: '',
      dateToPicker: '',
      searchButton: '',
      carList: '',
    };
  }
}
