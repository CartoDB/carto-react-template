/**
 * Setup the global elements of the react app:
 *  - redux store
 *  - react router
 *  - main component: App
 */
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { createCartoSlice } from '@carto/react-redux';
import { setDefaultCredentials } from '@deck.gl/carto';
import App from './App';
import { initialState } from 'store/initialStateSlice';
import configureAppStore from './store/store';

const store = configureAppStore();

store.reducerManager.add('carto', createCartoSlice(initialState));

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

ReactDOM.render(AppProvider, document.getElementById('root'));

function OauthProvider({ children }) {
  if (!initialState.oauth) {
    return children;
  }
  const { domain, clientId, scopes, audience, organizationId } = initialState.oauth;

  if (!clientId) {
    alert('Need to define a clientId. Please check the file store/initalStateSlice.js');
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      {...(organizationId !== '' ? { organization: organizationId } : {})}
      redirectUri={window.location.origin}
      scopes={scopes.join(' ')}
      audience={audience}
      cacheLocation='localstorage'
    >
      {children}
    </Auth0Provider>
  );
}
