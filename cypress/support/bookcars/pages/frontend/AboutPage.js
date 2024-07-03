import { PageModel } from '../../scripts';

export class AboutPage extends PageModel {
  constructor(route) {
    super({ frontend: route });
  }

  get selectors() {
    return {
      about: '.about',
    };
  }
}
