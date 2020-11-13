import React from 'react';
import { Navigate } from 'react-router-dom';
import OAuthCallback from 'lib/sdk/oauth/OAuthCallback';
import Main from 'components/views/Main';
import Stores from 'components/views/stores/Stores';
import StoresList from 'components/views/stores/StoresList';
import StoresDetail from 'components/views/stores/StoresDetail';
import Kpi from 'components/views/Kpi';
import Datasets from 'components/views/datasets/Datasets';
import NotFound from 'components/views/NotFound';
import Ex from 'components/views/Ex.js';
// Auto import

const routes = [
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '/', element: <Navigate to='/stores' /> },
      {
        path: '/stores',
        element: <Stores />,
        children: [
          { path: '/', element: <StoresList /> },
          { path: '/:id', element: <StoresDetail /> },
        ],
      },
      { path: '/kpi', element: <Kpi /> },
      { path: '/datasets', element: <Datasets /> },
    ],
  },
  { path: '/oauthCallback', element: <OAuthCallback /> },
  { path: '/ex', element: <Ex /> },
  { path: '/pepe', element: <Ex /> },
  // Auto import routes
  { path: '404', element: <NotFound /> },
  { path: '*', element: <Navigate to='/404' /> },
];

export default routes;
