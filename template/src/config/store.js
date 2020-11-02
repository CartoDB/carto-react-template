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
    const storedConfig = JSON.parse(localStorage.getItem('cra-carto'));
    const { token, userInfo } = storedConfig;

    if (token.expirationDate < Date.now()) {
      throw new Error('Found expired token in localStorage, resetting...');
    }
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
      localStorage.removeItem('cra-carto');
      return;
    }

    localStorage.setItem('cra-carto', JSON.stringify({ token, userInfo }));
  } catch {
    // ignore write errors
  }
}

store.subscribe(throttle(saveOAuthState, 1000));

export default store;
