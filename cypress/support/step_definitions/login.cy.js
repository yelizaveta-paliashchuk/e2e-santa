import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { faker } from '@faker-js/faker'
import { deleteBoxViaApi } from './deleteBoxViaAPI'

const users = require('../fixtures/users.json')
const boxPage = require('../fixtures/pages/boxPage.json')
const generalElements = require('../fixtures/pages/general.json')
const dashboardPage = require('../fixtures/pages/dashboardPage.json')
const invitePage = require('../fixtures/pages/invitePage.json')
let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } })
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective()
let maxAmount = 50
let currency = 'Евро'
let inviteLink
let boxId

Given('user is on secret santa login page', function () {
  cy.visit('/login')
})

When('user logs in with table', function (dataTable) {
  cy.login(dataTable.hashes()[0].username, dataTable.hashes()[0].password)
})

Then('user is on the dashboard page', function () {
  cy.contains('Создать коробку')
})

When('main user creates a box', function () {
  cy.contains('Создать коробку').click()
  cy.get(boxPage.boxNameField).type(newBoxName)
  cy.get(boxPage.idField)
    .invoke('text')
    .then((text) => {
      boxId = text
    })
  cy.get(generalElements.arrowRight).click()
  cy.get(boxPage.sixthIcon).click()
  cy.get(generalElements.arrowRight).click()
  cy.get(boxPage.giftPriceToggle).click({ force: true })
  cy.get(boxPage.maxAnount).type(maxAmount)
  cy.get(boxPage.currency).select(currency)
  for (let i = 0; i < 3; i++) {
    cy.get(generalElements.arrowRight).click({ force: true })
  }
})

Then('user is on the box page', function () {
  cy.get(dashboardPage.createdBoxName).should('have.text', newBoxName)
  cy.get(dashboardPage.topPaneTabs)
    .invoke('text')
    .then((text) => {
      expect(text).to.include('Участники')
      expect(text).to.include('Моя карточка')
      expect(text).to.include('Подопечный')
    })
})

When('user adds participants', function () {
  cy.get(generalElements.submitButton).click()
  cy.get(invitePage.inviteLink)
    .invoke('text')
    .then((link) => {
      inviteLink = link
    })
  cy.clearCookies()
  cy.acceptInvitation('user1', inviteLink, wishes)
  cy.acceptInvitation('user2', inviteLink, wishes)
  cy.acceptInvitation('user3', inviteLink, wishes)
})

Then('user runs the toss', function () {
  cy.visit('/login')
  cy.login(users.userAutor.email, users.userAutor.password)
  cy.contains('Коробки').click({ force: true })
  cy.contains(newBoxName).click()
  cy.runToss()
  deleteBoxViaApi(boxId)
})
