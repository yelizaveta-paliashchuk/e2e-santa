const users = require('../fixtures/users.json')
const boxPage = require('../fixtures/pages/boxPage.json')
const generalElements = require('../fixtures/pages/general.json')
const dashboardPage = require('../fixtures/pages/dashboardPage.json')
const invitePage = require('../fixtures/pages/invitePage.json')
import { faker } from '@faker-js/faker'

describe('user can create a box and run it', () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } })
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective()
  let maxAmount = 50
  let currency = 'Евро'
  let inviteLink
  let boxId
  let cookie =
    '_ym_uid=1716292751466331321; _ym_d=1716292751; adrcid=AgsBL60Nict60XoIGeSVVgQ; uuid=b2264b2b91830b82%3A1; __upin=tfKrJTBOwGcjNAWRvyWfqg; _buzz_fpc=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjIxYmEzMmIyYmI5NTZmN2JlM2JiM2U2YzhhNGJhYmUwMyUyMiUyQyUyMmJyb3dzZXJWZXJzaW9uJTIyJTNBJTIyMTI1LjAlMjIlMkMlMjJ0c0NyZWF0ZWQlMjIlM0ExNzE2Mjk1Mzc0ODk1JTdEJTJDJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyV2VkJTJDJTIwMjElMjBNYXklMjAyMDI1JTIwMTIlM0E0MiUzQTU1JTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlN0Q=; _buzz_aidata=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjJ0ZktySlRCT3dHY2pOQVdSdnlXZnFnJTIyJTJDJTIyYnJvd3NlclZlcnNpb24lMjIlM0ElMjIxMjUuMCUyMiUyQyUyMnRzQ3JlYXRlZCUyMiUzQTE3MTYyOTUzNjQxMjMlN0QlMkMlMjJwYXRoJTIyJTNBJTIyJTJGJTIyJTJDJTIyZG9tYWluJTIyJTNBJTIyLnNhbnRhLXNlY3JldC5ydSUyMiUyQyUyMmV4cGlyZXMlMjIlM0ElMjJXZWQlMkMlMjAyMSUyME1heSUyMDIwMjUlMjAxMiUzQTQyJTNBNTUlMjBHTVQlMjIlMkMlMjJTYW1lU2l0ZSUyMiUzQSUyMkxheCUyMiU3RA==; lang=ru; acs_3=%7B%22hash%22%3A%223c8f85edb06b1f745fbd%22%2C%22nextSyncTime%22%3A1716541610587%2C%22syncLog%22%3A%7B%22224%22%3A1716455210587%2C%221228%22%3A1716455210587%2C%221230%22%3A1716455210587%7D%7D; adrdel=1716455210802; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTY4MDYsImlhdCI6MTcxNjQ3NTkwNywiZXhwIjoxNzE5MDY3OTA3fQ.QJ44N69vLm1xifa24ndgxYlMsM9qiA9ZeyoFc5n7F1Q; _ym_isad=2; domain_sid=zKpFIUOPG04lonD1zl5aR%3A1716535842958'

  it('user logs in and create a box', () => {
    cy.visit('/login')
    cy.login(users.userAutor.email, users.userAutor.password)
    cy.contains('Создать коробку').click()
    cy.get(boxPage.boxNameField).type(newBoxName)
    cy.get(boxPage.idField)
      .invoke('text')
      .then((text) => {
        boxId = text
        cy.log(boxId)
      })
    cy.get(generalElements.arrowRight).click()
    cy.get(boxPage.sixthIcon).click()
    cy.get(generalElements.arrowRight).click()
    cy.get(boxPage.giftPriceToggle).click({ force: true })
    cy.get(boxPage.maxAnount).type(maxAmount)
    cy.get(boxPage.currency).select(currency)
    cy.get(generalElements.arrowRight).click({ force: true })
    cy.get(generalElements.arrowRight).click({ force: true })
    cy.get(generalElements.arrowRight).click({ force: true })
    cy.get(dashboardPage.createdBoxName).should('have.text', newBoxName)
    cy.get('.layout-1__header-wrapper-fixed .toggle-menu-item span')
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Участники')
        expect(text).to.include('Моя карточка')
        expect(text).to.include('Подопечный')
      })
  })
  it('add participants', () => {
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
    cy.visit('/login')
    cy.login(users.userAutor.email, users.userAutor.password)
    cy.contains('Коробки').click({ force: true })
    cy.contains(newBoxName).click()
    cy.contains('Перейти к жеребьевке').click()
    cy.contains('Провести жеребьевку').click({ force: true })
    cy.contains('Да, провести жеребьевку').click({ force: true })
    cy.contains('Жеребьевка проведена').should('be.visible')
  })
  after('delete the box', () => {
    cy.request({
      method: 'DELETE',
      headers: {
        Cookie: cookie,
      },
      url: `https://santa-secret.ru/api/box/${boxId}`,
    }).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
