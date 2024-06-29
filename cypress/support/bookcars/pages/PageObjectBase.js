import { getApiURL, getBackendURL, getFrontendURL } from '../scripts';

class NoInstanceError extends Error {
  constructor(className) {
    super(className);
    this.message = `Cannot instantiate ${className} directly.`;
  }
}

class CyGetter {
  constructor() {
    if (new.target === CyGetter) {
      throw new NoInstanceError(new.target.name);
    }
  }

  /**
   * @returns {Record<string, Cypress.Chainable>} A record where each property is a Cypress.Chainable
   * that wraps the corresponding CSS selector.
   */
  get elements() {
    return new Proxy(this.selectors, {
      get: (target, prop) => cy.get(target[prop]),
    });
  }
  get element() {
    return this.elements;
  }
  get els() {
    return this.elements;
  }
  get el() {
    return this.elements;
  }

  get selectors() {
    return {};
  }
  get selector() {
    return this.selectors;
  }
  get sels() {
    return this.selectors;
  }
  get sel() {
    return this.selectors;
  }
}

export class PageObjectBase extends CyGetter {
  /**
   * Superclass to provide common methods and properties between page objects.
   * @param {Object} options - An object containing __one__ of the following properties:
   *   - api (string): The API route to visit.
   *   - backend (string): The backend route to visit.
   *   - frontend (string): The frontend route to visit.
   */
  constructor({ api, backend, frontend }) {
    if (new.target === PageObjectBase) {
      // throw new TypeError('Cannot instantiate PageObjectBase directly.');
      throw new NoInstanceError(new.target.name);
    }

    super();

    this.url = api
      ? getApiURL(api)
      : backend
      ? getBackendURL(backend)
      : getFrontendURL(frontend);
  }

  visit = () => cy.visit(this.url);
}
