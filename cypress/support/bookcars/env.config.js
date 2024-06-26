// resolve keys for the active environment specified in cypress.env.json
const APP = __env__('app');
const CREDENTIALS = __env__('credentials');

// construct and validate the URL before passing it to consumers
const endpoint = new URL(APP.url);
endpoint.port = APP.port;
// ---

/**
 * The base at which the app is served
 * e.g. http://localhost:80 or https://example.com:443
 */
export const APP_URL = endpoint.href;

/** @type {string} */
export const USERNAME = CREDENTIALS.username;

/** @type {string} */
export const PASSWORD = CREDENTIALS.password;

/** @param {string} key */
export function __env__(key) {
  const activeEnv = Cypress.env('__active_env');
  try {
    return Cypress.env(activeEnv)[key];
  } catch (e) {
    throw new Error(
      `Cannot set active environment because '${activeEnv}' does not match any environment in cypress.env.json`
    );
  }
}
