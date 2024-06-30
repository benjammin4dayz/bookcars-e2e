import { defineConfig } from 'cypress';
import linter from './cypress/plugins/linter.js';

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/global/e2e.js',
    experimentalInteractiveRunEvents: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      linter(on, config, { pauseOnError: false, pauseDuration: 5000 });
    },
  },
});
