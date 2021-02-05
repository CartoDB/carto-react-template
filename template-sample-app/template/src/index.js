/**
 * Setup the global elements of the react app:
 *  - redux store
 *  - react router
 *  - main component: App
 */
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { initialState, oauthInitialState } from 'config/initialStateSlice';
import configureAppStore from './config/store';

import { createCartoSlice, createOauthCartoSlice } from '@carto/react/redux';

const store = configureAppStore();

store.reducerManager.add('carto', createCartoSlice(initialState));
store.reducerManager.add('oauth', createOauthCartoSlice(oauthInitialState));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
