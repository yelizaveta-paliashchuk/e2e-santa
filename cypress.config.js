const { defineConfig } = require('cypress')
// const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
// const addCucumberPreprocessorPlugin =
//   require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
// const createEsbuildPlugin =
//   require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin

module.exports = defineConfig({
  env: {
    db: {
      host: 'sql7.freesqldatabase.com',
      user: 'sql7711278',
      password: 'T7xSmqa5ac',
      database: 'sql7711278',
    },
  },
  e2e: {
    // baseUrl: 'https://santa-secret.ru/',
    testIsolation: false,
    chromeWebSecurity: false,
    // specPattern: 'cypress/e2e/**/*.feature',
    setupNodeEvents(on, config) {
      on('task', {
        queryDb: (query) => {
          return queryTestDb(query, config)
        },
      })

      // const bundler = createBundler({ plugins: [createEsbuildPlugin(config)] })
      // on('file:preprocessor', bundler)
      // addCucumberPreprocessorPlugin(on, config)
      // return config
    },
  },
})

const mysql = require('mysql')

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db)
  connection.connect()
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}
