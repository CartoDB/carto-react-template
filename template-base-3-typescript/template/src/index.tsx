/**
 * Setup the global elements of the react app:
 *  - redux store
 *  - react router
 *  - main component: App
 */
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createCartoSlice, createOauthCartoSlice } from '@carto/react-redux';
import App from './App';
import { initialState, oauthInitialState } from 'store/initialStateSlice';
import store from './store/store';

// @ts-ignore
store.injectReducer('carto', createCartoSlice(initialState));
// @ts-ignore
store.injectReducer('oauth', createOauthCartoSlice(oauthInitialState));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
