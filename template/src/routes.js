import React from 'react';
import { Navigate } from 'react-router-dom';
import OAuthCallback from 'lib/sdk/oauth/OAuthCallback';
import Home from 'components/views/Home';
import Stores from 'components/views/stores/Stores';
import StoresDetail from 'components/views/stores/StoresDetail';
import Kpi from 'components/views/Kpi';
import Datasets from 'components/views/datasets/Datasets';

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '/', element: <Navigate to='/stores' /> },
      { path: '/stores', element: <Stores /> },
      { path: '/stores/:id', element: <StoresDetail /> },
      { path: '/kpi', element: <Kpi /> },
      { path: '/datasets', element: <Datasets /> },
    ],
  },
  { path: '/oauthCallback', element: <OAuthCallback /> },
];

export default routes;
