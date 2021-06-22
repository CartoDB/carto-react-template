import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { OAuthCallback } from '@carto/react-auth';
import { useSelector } from 'react-redux';
import Header from 'components/common/Header';

const Main = lazy(() => import('components/views/Main'));
const NotFound = lazy(() => import('components/views/NotFound'));
const Login = lazy(() => import('components/views/login/Login'));
// [hygen] Import views

const routes = [
  {
    path: '/',
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
  { path: '/oauthCallback', element: <OAuthCallback /> },
  { path: '/login', element: <Login /> },
  {
    path: '404',
    element: (
      <DefaultView>
        <NotFound />
      </DefaultView>
    ),
  },
  { path: '*', element: <Navigate to='/404' /> },
];

export default routes;

function ProtectedRoute({ children }) {
  const forceLogin = useSelector((state) => state.app.forceOAuthLogin);
  const user = useSelector((state) => state.oauth.userInfo);
  const isLoggedIn = !!user || !forceLogin;

  return isLoggedIn ? children : <Navigate to='/login' />;
}

function DefaultView({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
