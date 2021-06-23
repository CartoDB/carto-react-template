import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import Header from 'components/common/Header';
import { initialState } from 'store/initialStateSlice';

const Main = lazy(() => import('components/views/Main'));
const NotFound = lazy(() => import('components/views/NotFound'));
const Login = lazy(() => import('components/views/login/Login'));
// [hygen] Import views

export const ROUTE_PATHS = {
  LOGIN: '/login',
  DEFAULT: '/',
  NOT_FOUND: '404',
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
  const { isAuthenticated, isLoading } = useAuth0();
  const accessToken = useSelector((state) => state.carto.credentials.accessToken);

  if (!initialState.oauth) {
    return children;
  }

  const noAuthenticated = !isLoading && !isAuthenticated && !accessToken;

  if (noAuthenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} />;
  }

  return !!accessToken && children;
}

function DefaultView({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
