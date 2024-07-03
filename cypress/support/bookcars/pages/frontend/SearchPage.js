import { PageModel } from '../../scripts';

export class SearchPage extends PageModel {
  constructor(route) {
    super({ frontend: route });
  }

  get selectors() {
    return {};
  }
}
