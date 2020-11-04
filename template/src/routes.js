import React from 'react';
import Home from 'components/views/Home';
import Stores from 'components/views/stores/Stores';
import StoresDetail from 'components/views/stores/StoresDetail';
import Kpi from 'components/views/Kpi';
import Datasets from 'components/views/Datasets';
import OAuthCallback from 'components/common/oauth/OAuthCallback';

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '/stores', element: <Stores /> },
      { path: '/stores/:id', element: <StoresDetail /> },
      { path: '/kpi', element: <Kpi /> },
      { path: '/datasets', element: <Datasets /> },
    ],
  },
  { path: '/oauthCallback', element: <OAuthCallback /> },
];

export default routes;
