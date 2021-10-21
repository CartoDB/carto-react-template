import { lazy } from 'react';
import { OAuthCallback } from '@carto/react-auth';
import ProtectedRoute from 'components/common/ProtectedRoute';
import DefaultView from 'components/common/DefaultView';

const Main = lazy(() => import('components/views/main/Main'));
const NotFound = lazy(() => import('components/views/NotFound'));
const Login = lazy(() => import('components/views/Login'));
// [hygen] Import views

export const ROUTE_PATHS = {
  LOGIN: '/login',
  DEFAULT: '/',
  OAUTH: '/oauthCallback',
  NOT_FOUND: '404',
  // [hygen] Add path routes
};

const routes = [
  {
    path: ROUTE_PATHS.DEFAULT,
    element: (
      <ProtectedRoute>
        <DefaultView>
          <Main />
        </DefaultView>
      </ProtectedRoute>
    ),
    children: [
      // { path: '/', element: <Navigate to='/<your default view>' /> },
      // [hygen] Add routes
    ],
  },
  { path: ROUTE_PATHS.OAUTH, element: <OAuthCallback /> },
  { path: ROUTE_PATHS.LOGIN, element: <Login /> },
  {
    path: '*',
    element: (
      <DefaultView>
        <NotFound />
      </DefaultView>
    ),
  },
];

export default routes;
