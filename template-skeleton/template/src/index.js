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
import { initialState, oauthInitialState } from 'store/initialState';
import configureAppStore from './store/store';
import App from './App';

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
