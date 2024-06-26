import { FRONTEND_URL } from '../env.config';
import { PageHelper } from './util';

const page = new PageHelper(FRONTEND_URL);

export class Frontend {
  static AppBar = {
    signInButton:
      '#root > div.app > div.header > header > div > div.header-desktop > a',
    chooseLanguageDropdown: '',
  };

  static HomePage = page.create('/', {
    logo: '#root > div.app > div.content > div > div > div.home-logo > span.home-logo-main',
    pickupLocationInput: '',
    dropOffLocationInput: '',
    dateFromInput: '',
    dateFromPicker: '',
    dateToInput: '',
    dateToPicker: '',
    searchButton: '',
    carList: '',
  });

  static SignInPage = page.create('/sign-in', {
    emailInput:
      '#root > div.app > div > div.signin > div > form > div:nth-child(2) > div > input',
    passwordInput:
      '#root > div.app > div > div.signin > div > form > div:nth-child(3) > div > input',
    staySignedInCheckbox: '',
    submitButton:
      '#root > div.app > div > div.signin > div > form > div.signin-buttons > button',
  });
}
