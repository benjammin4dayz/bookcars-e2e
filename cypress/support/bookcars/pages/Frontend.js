import { FRONTEND_URL } from '../env.config';
import { PageHelper } from './util';

const page = new PageHelper(FRONTEND_URL);

export class Frontend {
  static AppBar = {
    signInButton:
      '#root > div.app > div.header > header > div > div.header-desktop > a',
    chooseLanguageDropdown: '',
  };

  static HomePage = page.create('/');
}
