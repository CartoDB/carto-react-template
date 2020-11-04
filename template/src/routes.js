import React from 'react';
import Home from 'components/views/Home';
import Stores from 'components/views/stores/Stores';
import StoresDetail from 'components/views/stores/StoresDetail';
import { Navigate } from 'react-router-dom';

import Kpi from 'components/views/Kpi';

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '/', element: <Navigate to='/stores' /> },
      { path: '/stores', element: <Stores /> },
      { path: '/stores/:id', element: <StoresDetail /> },
      { path: '/kpi', element: <Kpi /> },
    ],
  },
];

export default routes;
