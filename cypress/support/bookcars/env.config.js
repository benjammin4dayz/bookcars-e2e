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
// resolve keys for the active environment specified in cypress.env.json
const frontend = __env__('frontend');
const backend = __env__('backend');

// construct and validate the URL before passing it to consumers
const frontendUrl = new URL(frontend.url);
frontendUrl.port = frontend.port;

const backendUrl = new URL(backend.url);
backendUrl.port = backend.port;
// ---

/** @type {string} */
export const FRONTEND_URL = frontendUrl.href;
/** @type {string} */
export const FRONTEND_EMAIL = frontend.email;
/** @type {string} */
export const FRONTEND_PASSWORD = frontend.password;

/** @type {string} */
export const BACKEND_URL = backendUrl.href;
/** @type {string} */
export const BACKEND_EMAIL = backend.email;
/** @type {string} */
export const BACKEND_PASSWORD = backend.password;
