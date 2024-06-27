import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/global/e2e.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
