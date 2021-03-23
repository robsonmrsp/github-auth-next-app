
/**
 * Os tempos extras de espera tem o propósito de melhorara a visualização dos videos gerados pelo cypress.
 */
describe('Guest access', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("There's a input field ", () => {
    cy.get('.input').should('have.length', 1).wait(1000);;
  });

  it("There's a input field ", () => {
    const input = 'robsonmrsp';
    cy.get('.input').type(input).type('{enter}').wait(2000);
    cy.get('.card').should('have.length', 1);
    cy.get('p.subtitle').should('have.text', '@robsonmrsp').wait(2000);
    cy.get('.H_ib').should('have.length', 1);
  });

  it("After input user, display a card ", () => {
    const input = 'robsonmrsp';
    cy.get('.input').type(input).type('{enter}').wait(2000);
    cy.get('.card').should('have.length', 1);
  });

  it("After input user, display the user info ", () => {
    const input = 'robsonmrsp';
    cy.get('.input').type(input).type('{enter}').wait(2000);
    cy.get('p.subtitle').should('have.text', '@robsonmrsp').wait(2000);
  });
  
  
  it("After input user, display the user location on map ", () => {
    const input = 'robsonmrsp';
    cy.get('.input').type(input).type('{enter}').wait(2000);
    cy.get('.H_ib').should('have.text', 'Maracanaú').wait(2000);
  });
});
