import { defineConfig } from 'cypress';
import cypressMochawesomeReporterPlugin from 'cypress-mochawesome-reporter/plugin.js';
// import linter from './cypress/plugins/linter.js';

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/global/e2e.js',
    experimentalInteractiveRunEvents: true,
    reporter: 'cypress-mochawesome-reporter',
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // linter(on, config, { pauseOnError: false, pauseDuration: 5000 });
      cypressMochawesomeReporterPlugin(on);
    },
  },
});
