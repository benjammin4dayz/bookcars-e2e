import { BACKEND_URL } from '../env.config';
import { PageHelper } from './util';

const page = new PageHelper(BACKEND_URL);

export class Backend {
  static AppBar = {
    chooseLanguageDropdown: '',
  };

  static SignInPage = page.create('/sign-in', {
    emailInput: '#email',
    passwordInput: '#password',
    staySignedInCheckbox: '',
    submitButton:
      '#root > div.app > div > div.signin > div > form > div.signin-buttons > button',
  });

  static HomePage = page.create('/');
}
