const config = require('./config');

const STORES_PAGE = `${config.ROOT_PAGE}/${config.STORES_PATH}`;
const STORE_DETAIL_PAGE = `${STORES_PAGE}/1`;

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
      cy.viewport(1000, 660);

      // Zoom out, to fit all layer
      const zoomOut = cy.findByRole('button', { name: /Decrease zoom/i });
      zoomOut.click();
      zoomOut.click();

      // Total revenue
      getTotalRevenueWidget().findByText('17.95B').should('exist');

      // Revenue by store type
      getRevenueByStoreTypeWidget().findByText('Supermarket').should('exist');
      getRevenueByStoreTypeWidget().findByText('$15.32B').should('exist');

      getRevenueByStoreTypeWidget().findByText('Others').should('exist');
      getRevenueByStoreTypeWidget().findByText('$314.48M').should('exist');

      // Stores by revenue widget
      // This would require image snapshot testing, like described in https://www.valentinog.com/blog/canvas/
    });
  });

  describe('Detail', () => {
    // TODO: temporary, while fixing issue on page
    beforeEach(() => {
      cy.on('uncaught:exception', (err, runnable) => {
        // temporary ignore console.errors
        return false;
      });
    });

    it('successfully loads one store', () => {
      cy.visit(STORE_DETAIL_PAGE);
    });

    const getTotalRevenueWidget = () => {
      return cy.findByRole('region', { name: 'Total revenue' });
    };

    const getRevenuePerMonthWidget = () => {
      return cy.findByRole('region', { name: 'Revenue per month' });
    };

    it('widgets are visible', () => {
      cy.visit(STORE_DETAIL_PAGE);

      //cy.findByText('1776 Main St, SpringfieldA').should('exist');

      getTotalRevenueWidget().should('exist');
      getRevenuePerMonthWidget().should('exist');
    });

    it('calculations are working fine', () => {
      cy.visit(STORE_DETAIL_PAGE);

      // Total revenue
      getTotalRevenueWidget().findByText('1.35M').should('exist');

      // Revenue per month
      // This would require image snapshot testing, like described in https://www.valentinog.com/blog/canvas/
    });
  });
});
