import { createSlice } from '@reduxjs/toolkit';

const _layers = {};

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    viewState: {
      pitch: 0,
      bearing: 0,
      latitude: 0,
      longitude: 0,
      zoom: 1,
      dragRotate: false,
    },
    baseMap: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    // layers: []
    dataSources: {}
  },
  reducers: {
    setBaseMap: (state, action) => {},
    fitBounds: (state, action) => {},
    togglePerspective: (state, action) => {},
    addLayer: (state, action) => {
      // state.layers.push(action.payload)
    },
    removeLayer: (state, action) => {},
    toggleLayerVisibility: (state, action) => {},
    reorderLayer: (state, action) => {},
    onLayerHover: (state, action) => {},
    onLayerClick: (state, action) => {},



    addDataSource: (state, action) => {
      state.dataSources[action.payload.id] = action.payload
    }
  }
});

export const addLayerAsync = layer => dispatch => {
  _layers[layer.id] =  layer;
  dispatch(addLayer(layer.id));
};

export const layers = state => Object.values(_layers)

export const { addDataSource, setBaseMap, fitBounds, togglePerspective, addLayer, removeLayer, toggleLayerVisibility, reorderLayer, onLayerHover, onLayerClick } = mapSlice.actions;

export default mapSlice.reducer;
