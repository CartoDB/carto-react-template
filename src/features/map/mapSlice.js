import { createSlice } from '@reduxjs/toolkit';

const defaultDataSourceCredentials = {
  username: 'public',
  apiKey: 'default_public',
  serverUrlTemplate: 'https://{user}.carto.com',
};

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    viewState: {
      pitch: 0,
      bearing: 0,
      latitude: 31.802892,
      longitude: -103.007813,
      zoom: 3,
      dragRotate: false,
    },
    baseMap: {
      name: 'gmaps-satellite',
      type: 'gmaps',
      apiKey: 'VALID_API_KEY',
      options: {
        mapTypeId: 'satellite',
      },
      // name: 'positron',
      // type: 'mapbox',
      // options: {
      //   mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      // },
    },
    layers: {
      tempLayer: { id: 'tempLayer', source: 'tempSource' },
      tipsLayer: { id: 'tipsLayer', source: 'tipsSource' },
    },
    dataSources: {
      tempSource: {
        id: 'tempSource',
        data: 'SELECT * FROM temps',
        credentials: defaultDataSourceCredentials,
      },
      tipsSource: {
        id: 'tipsSource',
        data: 'cartobq.maps.nyc_taxi_points_demo_id',
        credentials: defaultDataSourceCredentials,
      },
    },
  },
  reducers: {
    addDataSource: (state, action) => {
      state.dataSources[action.payload.id] = {
        credentials: defaultDataSourceCredentials,
        ...action.payload,
      };
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
  },
});

export const {
  addDataSource,
  removeDataSource,
  addLayer,
  removeLayer,
  setBaseMap,
  setViewState,
} = mapSlice.actions;

export default mapSlice.reducer;
