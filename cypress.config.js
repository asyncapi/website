import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 8000,
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      config.specPattern = ['cypress/*.cy.js'];
      return config;
    },
    baseUrl: 'http://127.0.0.1:3000',
    env: {
      STARTUP_WAIT_MILLISECONDS: 30000,
    },
  },
  retries: {
    runMode: 1,
    openMode: 1,
  },
});
