import React from 'react';
import Home from 'components/views/home/Home';
import Kpis from 'components/views/kpis/Kpis';
import Stores from 'components/views/stores/Stores';
import StoreIndex from 'components/views/stores/store-index/StoreIndex';
import StoreDetail from 'components/views/stores/store-detail/StoreDetail';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/kpis', element: <Kpis /> },
  {
    path: 'stores',
    element: <Stores />,
    children: [
      { path: '/', element: <StoreIndex /> },
      { path: ':id', element: <StoreDetail /> },
    ],
  },
];

export default routes;
