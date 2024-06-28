import * as env from '../../env.config';
import { basicLoginFlow, getFrontendURL } from '../../scripts';

export class SignIn {
  static url = getFrontendURL('/sign-in');

  static visit() {
    return cy.visit(SignIn.url);
  }

  static login() {
    basicLoginFlow({
      username: env.FRONTEND_EMAIL,
      password: env.FRONTEND_PASSWORD,
      url: SignIn.url,
      usernameSelector: SignIn.elements.emailInput,
      passwordSelector: SignIn.elements.passwordInput,
      submitSelector: SignIn.elements.submitButton,
    });
    return this;
  }

  static get elements() {
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
