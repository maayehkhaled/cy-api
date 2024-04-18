// loads definition for the custom "cy.api" command
/// <reference path="../../dist/types.d.ts" />

describe('cy.api', () => {
  it('calls API method', () => {
    cy.api({
      url: '/',
    })
  })

  it(
    'calls API without displaying request',
    { apiDisplayRequest: false },
    () => {
      cy.get('body').should('not.contain', 'MY PAGE')
      cy.api({
        url: '/',
      })
      cy.get('.container').should('not.contain', 'Request')
      cy.visit('/test.html')
      cy.contains('MY PAGE')
      cy.url().should('contain', 'test.html')
      cy.api(
        {
          url: '/',
        },
        'hello world',
      )
      cy.contains('MY PAGE')
      cy.get('.container').should('not.contain', 'Request')
    },
  )

  it('calls several times', () => {
    const options = { url: '/' }
    cy.api(options, 'first')
    cy.api(options, 'second')
    cy.api(options, 'third')
  })

})
