const config = require('./config');

const HOME_PAGE = config.ROOT_PAGE;

describe('Not Found Page', () => {
  it('redirect to notFound page works', () => {
    const INVALID_PATH = 'anInvalidPathInTheApp';
    cy.visit(`${HOME_PAGE}/${INVALID_PATH}`);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/${INVALID_PATH}`);
    });
    cy.findByText('Error 404');
  });
});
