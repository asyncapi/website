import React from 'react';
import PropTypes from 'prop-types';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { useRouter } from 'next/router';

const createRouter = (params) => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  back: cy.spy().as('back'),
  beforePopState: cy.spy().as('beforePopState'),
  prefetch: cy.stub().as('prefetch').resolves(),
  reload: cy.spy().as('reload'),
  isFallback: false,
  defaultLocale: 'en',
  ...params,
});

const MockRouter = ({ children, ...props }) => {
  const router = createRouter(props);

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};

MockRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MockRouter;
