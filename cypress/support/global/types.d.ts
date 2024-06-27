declare namespace Cypress {
  interface Chainable {
    /**
     * Login to the specified location.
     * @param where The location to login to. Valid options are 'frontend' or 'backend'.
     * @param username The username to login with. Defaults to the environment credentials.
     * @param password The password to login with. Defaults to the environment credentials.
     */
    login(
      where: 'frontend' | 'backend',
      username?: string,
      password?: string
    ): Chainable<void>;
  }
}
