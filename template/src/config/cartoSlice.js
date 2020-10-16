import { createSlice, createSelector } from '@reduxjs/toolkit';
import { WebMercatorViewport } from '@deck.gl/core';

export const cartoSlice = createSlice({
  name: 'carto',
  initialState: {
    viewState: {
      pitch: 0,
      bearing: 0,
      latitude: 31.802892,
      longitude: -103.007813,
      zoom: 2,
      dragRotate: false,
    },
    viewport: undefined,
    baseMap: 'positron',
    credentials: {
      username: 'public',
      apiKey: 'default_public',
      serverUrlTemplate: 'https://{user}.carto.com',
    },
    layers: {},
    dataSources: {},
  },
  reducers: {
    addDataSource: (state, action) => {
      state.dataSources[action.payload.id] = action.payload;
    },
    removeDataSource: (state, action) => {
      delete state.dataSources[action.payload];
    },
    addLayer: (state, action) => {
      state.layers[action.payload.id] = action.payload;
    },
    removeLayer: (state, action) => {
      delete state.layers[action.payload];
    },
    setBaseMap: (state, action) => {
      state.baseMap = action.payload;
    },
    setViewState: (state, action) => {
      const viewState = action.payload;
      state.viewState = { ...state.viewState, ...viewState };
    },
    setViewPort: (state, action) => {
      state.viewport = new WebMercatorViewport(state.viewState).getBounds();
    },
    addFilter: (state, action) => {
      const { id, column, type, values } = action.payload;
      const source = state.dataSources[id];

      if (source) {
        if (!source.filters) {
          source.filters = {};
        }

        if (!source.filters[column]) {
          source.filters[column] = {};
        }

        source.filters[column][type] = values;
      }
    },
  },
});

export const selectSourceById = createSelector(
  [
    (state) => state.carto.dataSources,
    (state, id) => id,
    (state) => state.carto.credentials,
  ],
  (dataSources, id, defaultCredentials) => {
    return (
      dataSources[id] && {
        credentials: defaultCredentials,
        ...dataSources[id],
      }
    );
  }
);

let viewportTimer;
export const setViewState = (viewState) => {
  return (dispatch, getState) => {
    const { setViewState, setViewPort } = cartoSlice.actions;
    dispatch(setViewState(viewState));
    clearTimeout(viewportTimer);
    viewportTimer = setTimeout(() => {
      dispatch(setViewPort());
    }, 200);
  };
};

export const {
  addDataSource,
  removeDataSource,
  addLayer,
  removeLayer,
  setBaseMap,
  addFilter,
} = cartoSlice.actions;

export default cartoSlice.reducer;
