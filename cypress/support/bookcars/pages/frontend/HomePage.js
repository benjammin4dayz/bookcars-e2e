import { PageModel } from '../../scripts';

export class HomePage extends PageModel {
  constructor(route) {
    super({ frontend: route });
  }

  get selectors() {
    return {
      logo: '.home-cover',
      pickupLocationInput: '\\:r0\\:',
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
