import { BACKEND_URL } from '../env.config';
import { PageHelper } from './util';

const page = new PageHelper(BACKEND_URL);

export class Backend {
  static AppBar = {
    chooseLanguageDropdown: '',
  };

  static HomePage = page.create('/');
}
