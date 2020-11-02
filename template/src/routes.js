import React from 'react';
import Home from 'components/views/home/Home';
import Stores from 'components/views/stores/Stores';
import StoreList from 'components/views/stores/store-list/StoreList';
import StoreDetail from 'components/views/stores/store-detail/StoreDetail';
import Kpi from 'components/views/kpi/Kpi';
import Datasets from 'components/views/datasets/Datasets';

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
];

export default routes;
