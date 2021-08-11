import { lazy, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { OAuthCallback } from '@carto/react-auth';
import Header from 'components/common/Header';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const Main = lazy(() => import('components/views/main/Main'));
const NotFound = lazy(() => import('components/views/NotFound'));
const Login = lazy(() => import('components/views/Login'));
// [hygen] Import views

export enum ROUTE_PATHS {
  LOGIN = '/login',
  DEFAULT = '/',
  OAUTH = '/oauthCallback',
  NOT_FOUND = '404',
  // [hygen] Add path routes
}

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
    path: ROUTE_PATHS.NOT_FOUND,
    element: (
      <DefaultView>
        <NotFound />
      </DefaultView>
    ),
  },
  { path: '*', element: <Navigate to={ROUTE_PATHS.NOT_FOUND} /> },
];

export default routes;

function ProtectedRoute({ children }: { children: ReactElement }) {
  const forceLogin = useSelector((state: RootState) => state.app.forceOAuthLogin);
  const user = useSelector((state: RootState) => state.oauth.userInfo);
  const isLoggedIn = !!user || !forceLogin;

  return isLoggedIn ? children : <Navigate to={ROUTE_PATHS.LOGIN} />;
}

function DefaultView({ children }: { children: ReactElement }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
