import { PageModel } from '../../scripts';

export class HomePage extends PageModel {
  constructor(route) {
    super({ frontend: route });
  }

  static get selectors() {
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
