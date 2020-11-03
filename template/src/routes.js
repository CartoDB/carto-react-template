import React from 'react';
import Home from 'components/views/Home';
import Stores from 'components/views/Stores';
import StoreList from 'components/views/StoreList';
import StoreDetail from 'components/views/StoreDetail';
import Kpi from 'components/views/Kpi';

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
    ],
  },
];

export default routes;
