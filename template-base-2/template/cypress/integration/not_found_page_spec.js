const config = require('./config');

const HOME_PAGE = config.ROOT_PAGE;

describe('Not Found Page', () => {
  it('redirect to notFound page works', () => {
    cy.visit(`${HOME_PAGE}/anInvalidPathInTheApp`);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/404');
    });
  });
});
