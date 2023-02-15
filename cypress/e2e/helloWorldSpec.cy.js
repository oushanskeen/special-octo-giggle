describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Creating a message', () => {
  it('Displays the message in the list', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="messageText"]')
      .type('New message');

    cy.get('[data-testid="sendButton"]')
      .click();

    // cy.get('[data-testid="messageText"]')
    //   .should('have.value', '');
    //
    // cy.contains('New message');
  });
});

describe('Choosng strategy', () => {
  it('WHEN strategy selected and tokens requested THEN received token records save strategy', () => {
    cy.visit('http://localhost:3000');

    // selectStrategy(strategyOne);
    // requestPerspctiveTokens();
    // selectRecentlyAddedTokens();
    // recievedTokensStoreStrategy();
    //
    // selectStrategy(strategyTwo);
    // requestPerspctiveTokens();
    // recievedTokensStoreStrategy();

    cy.get('[data-testid="messageText"]')
      .type('New message');

    cy.get('[data-testid="sendButton"]')
      .click();

    // cy.get('[data-testid="messageText"]')
    //   .should('have.value', '');
    //
    // cy.contains('New message');
  });
});
