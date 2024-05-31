const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://santa-secret.ru/',
    testIsolation: false,
    chromeWebSecurity: false,
    specPattern: 'cypress/e2e/**/*.feature',
    setupNodeEvents(on, config) {
      const bundler = createBundler({ plugins: [createEsbuildPlugin(config)] })
      on('file:preprocessor', bundler)
      addCucumberPreprocessorPlugin(on, config)

      return config
    },
  },
})
