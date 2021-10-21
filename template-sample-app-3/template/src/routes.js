import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from 'components/common/ProtectedRoute';
import DefaultView from 'components/common/DefaultView';

const Main = lazy(() => import(/* webpackPrefetch: true */ 'components/views/main/Main'));
const NotFound = lazy(() => import('components/views/NotFound'));
const Login = lazy(() => import('components/views/Login'));
const Stores = lazy(() => import('components/views/Stores.js'));
const Tileset = lazy(() => import('components/views/Tileset.js'));
// [hygen] Import views

export const ROUTE_PATHS = {
  LOGIN: '/login',
  DEFAULT: '/',
  NOT_FOUND: '/404',
  STORES: '/stores',
  TILESET: '/tileset',
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
      { path: '/', element: <Navigate to={ROUTE_PATHS.STORES} /> },
      { path: ROUTE_PATHS.STORES, element: <Stores /> },
      { path: ROUTE_PATHS.TILESET, element: <Tileset /> },
      // [hygen] Add routes
    ],
  },
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
