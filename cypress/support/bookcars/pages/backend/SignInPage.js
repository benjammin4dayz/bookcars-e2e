import * as env from '../../env.config';
import { PageObjectBase } from '../PageObjectBase';
import { basicLoginFlow } from '../../scripts';

export class SignInPage extends PageObjectBase {
  constructor(route) {
    super({ backend: route });
  }

  login() {
    basicLoginFlow({
      username: env.BACKEND_EMAIL,
      password: env.BACKEND_PASSWORD,
      url: this.url,
      usernameSelector: this.selectors.emailInput,
      passwordSelector: this.selectors.passwordInput,
      submitSelector: this.selectors.submitButton,
    });
  }

  get selectors() {
    return {
      emailInput: '#email',
      passwordInput: '#password',
      staySignedInCheckbox: '',
      submitButton:
        '#root > div.app > div > div.signin > div > form > div.signin-buttons > button',
    };
  }
}
