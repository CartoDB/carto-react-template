const config = require('./config');

const STORES_PAGE = `${config.ROOT_PAGE}/${config.STORES_PATH}`;

describe('Stores Page', () => {
  describe('Main', () => {
    it('successfully loads', () => {
      cy.visit(STORES_PAGE);
    });

    const getTotalRevenueWidget = () => {
      return cy.findByRole('region', { name: 'Total revenue' });
    };

    const getRevenueByStoreTypeWidget = () => {
      return cy.findByRole('region', { name: 'Revenue by store type' });
    };

    const getStoresByRevenueWidget = () => {
      return cy.findByRole('region', { name: 'Stores by revenue' });
    };

    it('widgets are visible', () => {
      cy.visit(STORES_PAGE);

      getTotalRevenueWidget().should('exist');
      getRevenueByStoreTypeWidget().should('exist');
      getStoresByRevenueWidget().should('exist');
    });

    it('calculations are working fine', () => {
      cy.visit(STORES_PAGE);

      // Note: calculations depend on viewport
      cy.viewport(1200, 660);

      // Zoom out, to fit all layer
      const zoomOut = cy.findByRole('button', { name: /Decrease zoom/i });
      zoomOut.click();
      zoomOut.click();

      // Total revenue
      getTotalRevenueWidget()
        .findByText(/17\.95b/i)
        .should('exist');

      // Revenue by store type
      getRevenueByStoreTypeWidget().findByText('Supermarket').should('exist');
      getRevenueByStoreTypeWidget().findByText('$15.32B').should('exist');

      getRevenueByStoreTypeWidget().findByText('Others').should('exist');
      getRevenueByStoreTypeWidget().findByText('$314.48M').should('exist');

      // Stores by revenue widget
      // This would require image snapshot testing, like described in https://www.valentinog.com/blog/canvas/
    });
  });
});
