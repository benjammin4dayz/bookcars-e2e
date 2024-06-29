import { PageObjectBase } from '../PageObjectBase';

export class CarsPage extends PageObjectBase {
  constructor(route) {
    super({ backend: route });
  }

  // redirects to sign in page when unauthenticated
}
