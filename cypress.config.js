const { defineConfig } = require("cypress");

module.exports = defineConfig({

  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.saucedemo.com/"
  },
});
