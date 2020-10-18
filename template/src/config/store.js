import { configureStore } from '@reduxjs/toolkit';
import cartoReducer from 'config/cartoSlice';
import oauthReducer from 'config/oauthSlice';
import { oauthInitialState } from 'config/oauthSlice';
import { throttle } from 'components/utils';

const store = configureStore({
  reducer: {
    carto: cartoReducer,
    oauth: oauthReducer,
  },
  preloadedState: {
    oauth: loadOAuthState(),
  },
});

/**
 * Set up initial OAuth state, loading values from localStorage if they were
 * stored in a previous session.
 */
function loadOAuthState() {
  let serializedState;
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    serializedState = { token, userInfo };
  } catch (err) {
    serializedState = {};
  }

  const initialState = Object.assign(oauthInitialState, serializedState);
  return initialState;
}

/**
 * Persist partial OAuth state to localStorage, to allow recovering on
 * a new load
 */
function saveOAuthState() {
  try {
    const { token, userInfo } = store.getState().oauth;

    if (token === null || userInfo === null) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      return;
    }

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch {
    // ignore write errors
  }
}

store.subscribe(throttle(saveOAuthState, 1000));

export default store;
