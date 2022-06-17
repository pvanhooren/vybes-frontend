const { defineConfig } = require("cypress");

var url = 'http://vybes-frontend'

if(process.env.REACT_APP_URL) {
  url = process.env.REACT_APP_URL
}

module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    username: 'cypress@test.com',
    password: 'Cypress123!',
    url: process.env.REACT_APP_URL,
  }
});
