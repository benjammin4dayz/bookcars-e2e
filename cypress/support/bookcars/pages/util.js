export class PageHelper {
  /**
   *
   * @param {string} baseUrl The base URL, excluding the route. e.g. `https://example.com`
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @param {String} route The route, excluding the base url. e.g. `/sign-in`, `/settings`
   * @param {{[key: string]: string}} elements Page object model with an arbitrary number of key-value pairs, where both key and value are strings
   */
  create(route, elements = {}) {
    return {
      url: new URL(route, this.baseUrl).href,
      elements: elements,
    };
  }
}
