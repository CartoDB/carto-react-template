import React from 'react';
import Home from 'components/views/Home';
import Stores from 'components/views/Stores';
import StoreList from 'components/views/StoreList';
import StoreDetail from 'components/views/StoreDetail';
import Kpi from 'components/views/Kpi';
import Datasets from 'components/views/Datasets';
import OAuthCallback from 'components/common/oauth/OAuthCallback';

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/stores',
        element: <Stores />,
        children: [
          { path: '/', element: <StoreList /> },
          { path: ':id', element: <StoreDetail /> },
        ],
      },
      { path: '/kpi', element: <Kpi /> },
      { path: '/datasets', element: <Datasets /> },
    ],
  },
  { path: '/oauthCallback', element: <OAuthCallback /> },
];

export default routes;