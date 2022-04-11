const config = require('./config');

const TILESET_PAGE = `${config.ROOT_PAGE}/${config.TILESET_PATH}`;

describe('Tileset Page', () => {
  it('successfully loads', () => {
    cy.visit(TILESET_PAGE);
  });

  const getAggregationSumWidget = () => {
    return cy.findByRole('region', { name: 'Total aggregated sum' });
  };

  const getAggregationCountWidget = () => {
    return cy.findByRole('region', { name: 'Total aggregated count' });
  };

  it('widgets are visible', () => {
    cy.visit(TILESET_PAGE);

    getAggregationSumWidget().should('exist');
    getAggregationCountWidget().should('exist');
  });

  it('calculations are working fine', () => {
    cy.visit(TILESET_PAGE);

    // Note: calculations depend on viewport
    cy.viewport(1200, 660);

    // Zoom out, to fit all layer
    const zoomOut = cy.findByRole('button', { name: /Decrease zoom/i });
    zoomOut.click();

    // Total aggregated sum
    getAggregationSumWidget().findByText('481.7M', { timeout: 10000 }).should('exist');
  });
});
