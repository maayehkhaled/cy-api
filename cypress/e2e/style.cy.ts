describe('Response format / styling', () => {

    it('handles spaces', () => {
        cy.api({
            url: '/json-white-space'
        })
    })
})
