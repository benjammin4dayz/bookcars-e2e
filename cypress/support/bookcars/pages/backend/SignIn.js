import * as env from '../../env.config';
import { basicLoginFlow, getBackendURL } from '../../scripts';

export class SignIn {
  static url = getBackendURL('/sign-in');

  static visit() {
    return cy.visit(SignIn.url);
  }

  static login() {
    basicLoginFlow({
      username: env.BACKEND_EMAIL,
      password: env.BACKEND_PASSWORD,
      url: SignIn.url,
      usernameSelector: SignIn.elements.emailInput,
      passwordSelector: SignIn.elements.passwordInput,
      submitSelector: SignIn.elements.submitButton,
    });
    return this;
  }

  static get elements() {
    return {
      emailInput: '#email',
      passwordInput: '#password',
      staySignedInCheckbox: '',
      submitButton:
        '#root > div.app > div > div.signin > div > form > div.signin-buttons > button',
    };
  }
}
