import React from 'react';
import { Navigate } from 'react-router-dom';
import Main from 'components/views/Main';
import NotFound from 'components/views/NotFound';
// [hygen] Import views

const routes = [
  {
    path: '/',
    element: <Main />,
    children: [
      // { path: '/', element: <Navigate to='/<your default view>' /> },
      // [hygen] Add routes
    ],
  },
  { path: '404', element: <NotFound /> },
  { path: '*', element: <Navigate to='/404' /> },
];

export default routes;
