import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import noop from 'utils/noop';
import appSlice from './appSlice';

let store = {};

function createReducerManager(initialReducers) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = Object.keys(reducers).length ? combineReducers(reducers) : noop;

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
      store.replaceReducer(combinedReducer);
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
      store.replaceReducer(combinedReducer);
    },
  };
}

const staticReducers = {
  app: appSlice,
};

function getCustomMiddleware() {
  const devConfig = {
    immutableCheck: {
      ignoredPaths: ['carto.viewportFeatures'],
    },
    serializableCheck: {
      ignoredPaths: ['carto.viewportFeatures'],
      ignoredActions: ['carto/setViewportFeatures'],
    },
  };

  const prodConfig = {
    immutableCheck: false,
    serializableCheck: false,
  };

  const isProductionEnv = process.env.NODE_ENV === 'production';

  return getDefaultMiddleware(isProductionEnv ? prodConfig : devConfig);
}

// Configure the store
export default function configureAppStore() {
  const reducerManager = createReducerManager(staticReducers);
  store = configureStore({
    reducer: reducerManager.reduce,
    middleware: getCustomMiddleware(),
  });

  store.reducerManager = reducerManager;

  return store;
}
