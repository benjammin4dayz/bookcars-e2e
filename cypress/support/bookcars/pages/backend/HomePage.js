import { PageModel } from '../../scripts';

export class HomePage extends PageModel {
  constructor(route) {
    super({ backend: route });
  }

  // redirects to sign in page when unauthenticated
}
