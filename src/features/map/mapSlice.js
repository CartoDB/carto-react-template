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
    baseMap: 'positron',
    baseMaps: {
      positron: {
        type: 'mapbox',
        options: {
          mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        },
      },
      voyager: {
        type: 'mapbox',
        options: {
          mapStyle: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
        },
      },
      darmatter: {
        type: 'mapbox',
        options: {
          mapStyle: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        },
      },
      roadmap: {
        type: 'gmaps',
        apiKey: 'GOOGLE_API_KEY',
        options: {
          mapTypeId: 'roadmap',
        },
      },
      satellite: {
        type: 'gmaps',
        apiKey: 'GOOGLE_API_KEY',
        options: {
          mapTypeId: 'satellite',
        },
      },
      hybrid: {
        type: 'gmaps',
        apiKey: 'GOOGLE_API_KEY',
        options: {
          mapTypeId: 'hybrid',
        },
      },
    },
    layers: {
      tempLayer: { id: 'tempLayer', source: 'tempSource' },
      tipsLayer: { id: 'tipsLayer', source: 'tipsSource' },
    },
    dataSources: {
      countriesSource: {
        id: 'countriesSource',
        data: 'SELECT * FROM ne_50m_admin_0_countries',
        credentials: defaultDataSourceCredentials
      },
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
