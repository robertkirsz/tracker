/// <reference types="cypress" />

describe('Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Has visible elements', () => {
    cy.get('#app-root > footer > span').should('be.visible')
    cy.get('#app-root > footer > button.btn.self-center').should('be.visible')
    cy.get('#app-root > footer > button:nth-child(3)').should('be.visible')
  })

  it('"Database preview" modal can be opened and closed', () => {
    cy.get('[data-e2e="database-preview-modal"]').should('not.exist')
    cy.get('#app-root > footer > button:nth-child(3)').click()
    cy.get('[data-e2e="database-preview-modal"]').should('be.visible')
    cy.get('[data-e2e="database-preview-modal"] > button').click()
    cy.get('[data-e2e="database-preview-modal"]').should('not.exist')
  })

  it('"Add timeline" modal can be opened and closed', () => {
    cy.get('[data-e2e="add-timeline-modal"]').should('not.exist')
    cy.get('#app-root > footer > button.btn.self-center').click()
    cy.get('[data-e2e="add-timeline-modal"]').should('be.visible')
    cy.get('#modal-root > div > div > div > form > div > button:nth-child(2)').click()
    cy.get('[data-e2e="add-timeline-modal"]').should('not.exist')
  })

  it('Timeline can be added', () => {
    cy.get('#app-root > footer > button.btn.self-center').click()
    cy.get('[data-e2e="add-timeline-modal"] [placeholder="Emoji"]').type('🐈')
    cy.get('[data-e2e="add-timeline-modal"] [placeholder="Description"]').type('Pet a cat')
    cy.get('[data-e2e="add-timeline-modal"] [placeholder="Start date"]').clear().type('2021-02-02')
    cy.get('#modal-root > div > div > div > form > div > button.btn.btn-primary').click()
  })
})
