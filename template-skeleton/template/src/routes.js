import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { OAuthCallback } from '@carto/react-auth';

const Main = lazy(() => import('components/views/Main'));
const NotFound = lazy(() => import('components/views/NotFound'));
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
  { path: '/oauthCallback', element: <OAuthCallback /> },
  { path: '404', element: <NotFound /> },
  { path: '*', element: <Navigate to='/404' /> },
];

export default routes;
