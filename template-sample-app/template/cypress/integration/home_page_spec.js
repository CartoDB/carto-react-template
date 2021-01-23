const config = require('./config');

const HOME_PAGE = config.ROOT_PAGE;

describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit(HOME_PAGE);
  });

  it('redirect to main page works', () => {
    cy.visit(HOME_PAGE);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/stores');
    });
  });

  it('main options are available at toolbar', () => {
    cy.visit(HOME_PAGE);

    cy.findByRole('tab', { name: /Stores/i }).should('exist');
    cy.findByRole('tab', { name: /KPI/i }).should('exist');
    cy.findByRole('tab', { name: /Datasets/i }).should('exist');
    cy.findByRole('button', { name: /Login/i }).should('exist');
  });

  it('main elements are visible', () => {
    cy.visit(HOME_PAGE);

    // Map
    cy.findByRole('region', { name: /Map/i }).should('exist');

    // Zoom controls
    cy.findByRole('button', { name: /Increase zoom/i }).should('exist');
    cy.findByRole('button', { name: /Decrease zoom/i }).should('exist');

    // Geocoder
    cy.findByPlaceholderText('Search address').should('exist');

    // Legend
    cy.findByText('Store types').should('exist');

    // Main tab
    cy.findByText('Store Analysis').should('exist');
  });
});