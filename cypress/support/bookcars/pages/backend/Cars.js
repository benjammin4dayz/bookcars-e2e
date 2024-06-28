import { getBackendURL } from '../../scripts';

export class Cars {
  static url = getBackendURL('/cars');

  // redirects to sign in page when unauthenticated
}
