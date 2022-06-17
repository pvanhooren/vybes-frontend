describe('Authenticated tests', () => {
  it('Load homepage', () => {
    cy.visit(Cypress.env("url"))
      cy.get('.btn-primary').click();
  
      cy.origin("https://vybes.eu.auth0.com/", () => {
        cy.get("#username").type(Cypress.env("username"));
        cy.get("#password").type(Cypress.env("password"));
        cy.get(".cf3cf4903 > .ce746f871").click();
      });

      cy.get('h1').contains('Cypress');
  })

  it('Load profile page', () => {
    cy.visit(Cypress.env("url"))
      cy.get('.btn-primary').click();
  
      cy.origin("https://vybes.eu.auth0.com/", () => {
        cy.get("#username").type(Cypress.env("username"));
        cy.get("#password").type(Cypress.env("password"));
        cy.get(".cf3cf4903 > .ce746f871").click();
      });
      
      cy.get('.dropdown-toggle').click();
      cy.get('.dropdown-button:first-child').click();

      cy.get('h5').contains('Cypress');
  })

  it('Change display name', () => {
    cy.visit(Cypress.env("url"))
      cy.get('.btn-primary').click();
  
      cy.origin("https://vybes.eu.auth0.com/", () => {
        cy.get("#username").type(Cypress.env("username"));
        cy.get("#password").type(Cypress.env("password"));
        cy.get(".cf3cf4903 > .ce746f871").click();
      });
      
      cy.get('.dropdown-toggle').click();
      cy.get('.dropdown-button:first-child').click();

      cy.get('.profile-button:first-child').click();
      cy.get('input.form-control:first-child').clear().type('Cypress e2e testing acc')
      cy.get('.btn-primary').click()

      cy.get('.navbar-logo').click();
      cy.get('h1').contains('e2e')
  })
})