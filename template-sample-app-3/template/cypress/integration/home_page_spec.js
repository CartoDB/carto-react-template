const config = require('./config');

const HOME_PAGE = config.ROOT_PAGE;

describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit(HOME_PAGE);
  });

  it('redirect to main page works', () => {
    cy.visit(HOME_PAGE);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/${config.STORES_PATH}`);
    });
  });

  it('main options are available at toolbar', () => {
    cy.visit(HOME_PAGE);

    cy.findByRole('tab', { name: /Stores/i }).should('exist');
    cy.findByRole('tab', { name: /Tileset/i }).should('exist');
  });

  it('main elements are visible', () => {
    cy.visit(HOME_PAGE);

    // Map
    cy.get('#deckgl-overlay').should('exist');

    // Zoom controls
    cy.findByRole('button', { name: /Increase zoom/i }).should('exist');
    cy.findByRole('button', { name: /Decrease zoom/i }).should('exist');

    // Legend
    cy.findByRole('heading', { name: /store types/i }).should('exist');

    // Main tab
    cy.findByRole('heading', { name: /store analysis/i }).should('exist');
  });
});
