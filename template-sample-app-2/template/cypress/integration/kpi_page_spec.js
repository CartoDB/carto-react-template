const config = require('./config');

const KPI_PAGE = `${config.ROOT_PAGE}/${config.KPI_PATH}`;

describe('KPI Page', () => {
  it('successfully loads', () => {
    cy.visit(KPI_PAGE);
  });

  const getTotalRevenueWidget = () => {
    return cy.findByRole('region', { name: 'Total revenue' });
  };

  const getRevenueByStateWidget = () => {
    return cy.findByRole('region', { name: 'Revenue by state' });
  };

  it('widgets are visible', () => {
    cy.visit(KPI_PAGE);

    getTotalRevenueWidget().should('exist');
    getRevenueByStateWidget().should('exist');
  });

  it('calculations are working fine', () => {
    cy.visit(KPI_PAGE);

    // Note: calculations depend on viewport
    cy.viewport(1000, 660);

    // Total revenue
    getTotalRevenueWidget().findByText('16.80B').should('exist');

    // Revenue by state
    getRevenueByStateWidget().findByText('California').should('exist');
    getRevenueByStateWidget().findByText('$1.69B').should('exist');

    getRevenueByStateWidget().findByText('Others').should('exist');
    getRevenueByStateWidget().findByText('$10.98B').should('exist');
  });
});
