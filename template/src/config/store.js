/* import { configureStore, createStore } from '@reduxjs/toolkit';
import { createCartoSlice } from 'lib/sdk/slice/cartoSlice'
import { createOauthCartoSlice, saveOAuthState } from 'lib/sdk/slice/oauthSlice';
import { throttle } from 'lib/sdk/utils';
import { initialState, oauthInitialState } from 'config/initialStateSlice';

const cartoSlice = createCartoSlice(initialState)
const oauthCartoSlice = createOauthCartoSlice(oauthInitialState)

export default function configureStore(initialState) {
  const store = createStore(createReducer(), initialState)

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {}

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  // Return the modified store
  return store
}

const store = createStore(createReducer(), initialState)


// store.subscribe(throttle(() => saveOAuthState(store.getState().oauth), 1000));

export default store;


function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
} */

import { combineReducers, createStore } from '@reduxjs/toolkit';
// import appSlice from './appSlice'

export function createReducerManager(initialReducers) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove = [];

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state, action) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action);
    },

    // Adds a new reducer with the specified key
    add: (key, reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
      debugger;
    },

    // Removes a reducer with the specified key
    remove: (key) => {
      if (!key || !reducers[key]) {
        return;
      }

      // Remove it from the reducer mapping
      delete reducers[key];

      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },
  };
}

const staticReducers = {
  // app: appSlice
};

export function configureStore(initialState = {}) {
  const reducerManager = createReducerManager(staticReducers);

  // Create a store with the root reducer function being the one exposed by the manager.
  const store = createStore(reducerManager.reduce, initialState);

  // Optional: Put the reducer manager on the store so it is easily accessible
  store.reducerManager = reducerManager;

  return store;
}
