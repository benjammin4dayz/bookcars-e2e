import { PageModel } from '../../scripts';

export class ToSPage extends PageModel {
  constructor(route) {
    super({ frontend: route });
  }

  get selectors() {
    return {
      terms: '.tos',
    };
  }
}
