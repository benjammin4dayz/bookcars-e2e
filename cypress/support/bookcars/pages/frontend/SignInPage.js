import * as env from '../../env.config';
import { PageObjectBase } from '../PageObjectBase';
import { basicLoginFlow } from '../../scripts';

export class SignInPage extends PageObjectBase {
  constructor(route) {
    super({ frontend: route });
  }

  login() {
    basicLoginFlow({
      username: env.FRONTEND_EMAIL,
      password: env.FRONTEND_PASSWORD,
      url: this.url,
      usernameSelector: this.selectors.emailInput,
      passwordSelector: this.selectors.passwordInput,
      submitSelector: this.selectors.submitButton,
    });
  }

  static get selectors() {
    return {
      emailInput:
        '#root > div.app > div > div.signin > div > form > div:nth-child(2) > div > input',
      passwordInput:
        '#root > div.app > div > div.signin > div > form > div:nth-child(3) > div > input',
      staySignedInCheckbox: '',
      submitButton:
        '#root > div.app > div > div.signin > div > form > div.signin-buttons > button',
    };
  }
}
