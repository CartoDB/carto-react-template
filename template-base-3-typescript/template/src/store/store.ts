import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {
  Action,
  combineReducers,
  Reducer,
  ReducersMapObject,
  Store,
} from 'redux';
import appSlice from './appSlice';

interface AppStore extends Store {
  asyncReducers: ReducersMapObject;
  injectReducer: (key: string, reducer: Reducer) => void;
}

// Define the Reducers that will always be present in the application
const staticReducers = {
  app: appSlice,
};

let store: AppStore = {
  ...configureStore({
    reducer: staticReducers,
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
      getCustomMiddleware(getDefaultMiddleware),
  }),
  asyncReducers: {},
  injectReducer: (key: string, asyncReducer: Reducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  },
};

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

function getCustomMiddleware(
  getDefaultMiddleware: CurriedGetDefaultMiddleware,
) {
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

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
