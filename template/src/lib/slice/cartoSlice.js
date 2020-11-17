import { createSlice } from '@reduxjs/toolkit';
import { WebMercatorViewport } from '@deck.gl/core';
import { debounce } from '../utils';

export const createCartoSlice = (initialState) => {
  const slice = createSlice({
    name: 'carto',
    initialState: {
      viewState: {
        ...initialState.viewState,
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
      viewport: undefined,
      geocoderResult: null,
      error: null,
      baseMap: 'positron',
      layers: {
        // Auto import layers
      },
      dataSources: {
        // Auto import dataSources
      },
      ...initialState,
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
        const { id, column, type, values, owner } = action.payload;
        const source = state.dataSources[id];

        if (source) {
          if (!source.filters) {
            source.filters = {};
          }

          if (!source.filters[column]) {
            source.filters[column] = {};
          }

          source.filters[column][type] = { values, owner };
        }
      },
      removeFilter: (state, action) => {
        const { id, column } = action.payload;
        const source = state.dataSources[id];

        if (source && source.filters && source.filters[column]) {
          delete source.filters[column];
        }
      },
      setGeocoderResult: (state, action) => {
        state.geocoderResult = action.payload;
      },
    },
  });

  return slice.reducer;
};

export const addSource = (payload) => ({ type: 'carto/addSource', payload });
export const removeSource = (payload) => ({ type: 'carto/removeSource', payload });
export const addLayer = (payload) => ({ type: 'carto/addLayer', payload });
export const removeLayer = (payload) => ({ type: 'carto/removeLayer', payload });
export const setBaseMap = (payload) => ({ type: 'carto/setBaseMap', payload });
export const addFilter = (payload) => ({ type: 'carto/addFilter', payload });
export const removeFilter = (payload) => ({ type: 'carto/removeFilter', payload });
export const setGeocoderResult = (payload) => ({
  type: 'carto/setGeocoderResult',
  payload,
});
const _setViewState = (payload) => ({ type: 'carto/setViewState', payload });
const _setViewPort = (payload) => ({ type: 'carto/setViewPort', payload });

export const selectSourceById = (state, id) => state.carto.dataSources[id];

const debouncedSetViewPort = debounce((dispatch, setViewPort) => {
  dispatch(setViewPort());
}, 200);

export const setViewState = (viewState) => {
  return (dispatch) => {
    dispatch(_setViewState(viewState));
    debouncedSetViewPort(dispatch, _setViewPort);
  };
};
