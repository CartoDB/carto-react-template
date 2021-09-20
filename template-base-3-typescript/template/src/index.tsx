/**
 * Setup the global elements of the react app:
 *  - redux store
 *  - react router
 *  - main component: App
 */
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { createCartoSlice } from '@carto/react-redux';
import App from './App';
import { initialState } from 'store/initialStateSlice';
import store from './store/store';
// @ts-ignore
import { setDefaultCredentials } from '@deck.gl/carto';

// @ts-ignore
store.injectReducer('carto', createCartoSlice(initialState));

setDefaultCredentials({ ...initialState.credentials });

const AppProvider = (
  <OauthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </OauthProvider>
);

render(AppProvider, document.getElementById('root'));

function OauthProvider({ children }: { children: JSX.Element }) {
  if (!initialState.oauth) {
    return children;
  }
  const { domain, clientId, scopes, audience } = initialState.oauth;

  if (!clientId) {
    alert(
      'Need to define a clientId. Please check the file store/initalStateSlice.js',
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      scopes={scopes.join(' ')}
      audience={audience}
      cacheLocation='localstorage'
    >
      {children}
    </Auth0Provider>
  );
}
