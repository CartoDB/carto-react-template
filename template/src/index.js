/**
 * Setup the global elements of the react app:
 *  - redux store
 *  - react router
 *  - main component: App
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { initialState, oauthInitialState } from 'config/initialStateSlice';
import { configureStore } from './config/store';
import * as serviceWorker from './serviceWorker';
import { createCartoSlice } from 'lib/sdk/slice/cartoSlice';
import { createOauthCartoSlice } from 'lib/sdk/slice/oauthSlice';
import { cartoSlice } from 'config/cartoSlice_old';
import { oauthSlice } from 'config/oauthSlice_old';

const store = configureStore();

// store.reducerManager.add('carto', cartoSlice)
// store.reducerManager.add('carto', oauthSlice)

debugger;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
