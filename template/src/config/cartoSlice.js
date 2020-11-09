import { createSlice } from '@reduxjs/toolkit';
import { WebMercatorViewport } from '@deck.gl/core';
import { debounce } from 'lib/sdk';

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
    addSource: (state, action) => {
      state.dataSources[action.payload.id] = {
        credentials: state.credentials,
        ...action.payload,
      };
    },
    removeSource: (state, action) => {
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
    setViewPort: (state) => {
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
    removeFilter: (state, action) => {
      const { id, column } = action.payload;
      const source = state.dataSources[id];

      if (source && source.filters && source.filters[column]) {
        delete source.filters[column];
      }
    },
  },
});

export const selectSourceById = (state, id) => state.carto.dataSources[id];

export const setViewState = (viewState) => {
  return (dispatch) => {
    const { setViewState, setViewPort } = cartoSlice.actions;
    dispatch(setViewState(viewState));
    debounce(() => {
      dispatch(setViewPort());
    }, 200)();
  };
};

export const {
  addSource,
  removeSource,
  addLayer,
  removeLayer,
  setBaseMap,
  addFilter,
  removeFilter,
} = cartoSlice.actions;

export default cartoSlice.reducer;
