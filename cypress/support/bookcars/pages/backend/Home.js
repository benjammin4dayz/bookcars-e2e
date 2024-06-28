import { getBackendURL } from '../../scripts';

export class Home {
  static url = getBackendURL('/');

  // redirects to sign in page when unauthenticated
}
