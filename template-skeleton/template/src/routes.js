import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { OAuthCallback } from '@carto/react-auth';
import { useSelector } from 'react-redux';
import Header from 'components/common/Header';

const Main = lazy(() => import('components/views/Main'));
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

function ProtectedRoute({ children }) {
  const forceLogin = useSelector((state) => state.app.forceOAuthLogin);
  const user = useSelector((state) => state.oauth.userInfo);
  const isLoggedIn = !!user || !forceLogin;

  return isLoggedIn ? children : <Navigate to={ROUTE_PATHS.LOGIN} />;
}

function DefaultView({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
