const users = require('../fixtures/users.json')
const boxPage = require('../fixtures/pages/boxPage.json')
const generalElements = require('../fixtures/pages/general.json')
const dashboardPage = require('../fixtures/pages/dashboardPage.json')
const invitePage = require('../fixtures/pages/invitePage.json')
import { faker } from '@faker-js/faker'
import { deleteBoxViaApi } from './deleteBoxViaAPI'

describe('user can create a box and run it', () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } })
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective()
  let maxAmount = 50
  let currency = 'Евро'
  let inviteLink
  let boxId

  it('user logs in and create a box', () => {
    cy.visit('/login')
    cy.login(users.userAutor.email, users.userAutor.password)
    //пользователь 1 создает коробку
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
    cy.get(dashboardPage.createdBoxName).should('have.text', newBoxName)
    cy.get(dashboardPage.topPaneTabs)
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Участники')
        expect(text).to.include('Моя карточка')
        expect(text).to.include('Подопечный')
      })
  })
  it('add participants', () => {
    //пользователь 1 получает приглашение
    cy.get(generalElements.submitButton).click()
    cy.get(invitePage.inviteLink)
      .invoke('text')
      .then((link) => {
        inviteLink = link
      })
    cy.clearCookies()
  })
  it('users approve invitations', () => {
    cy.acceptInvitation('user1', inviteLink, wishes)
    cy.acceptInvitation('user2', inviteLink, wishes)
    cy.acceptInvitation('user3', inviteLink, wishes)
  })
  it('run the toss', () => {
    //пользователь 1 запускает жеребьевку
    cy.visit('/login')
    cy.login(users.userAutor.email, users.userAutor.password)
    cy.contains('Коробки').click({ force: true })
    cy.contains(newBoxName).click()
    cy.runToss()
  })
  after('delete the box', () => {
    deleteBoxViaApi(boxId)
  })
})
