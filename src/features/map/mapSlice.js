import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    viewState: {
      pitch: 0,
      bearing: 0,
      latitude: 0,
      longitude: 0,
      zoom: 1,
      dragRotate: false,
    },
    baseMap: {
      mapType: "mapbox",
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    },
    layers: [],
  },
  reducers: {
    setBaseMap: (state, action) => {
      state.baseMap = action.payload;
    },
    setViewState: (state, action) => {
      const viewState = action.payload;
      state.viewState = { ...state.viewState, ...viewState };
    },
    fitBounds: (state, action) => {},
    togglePerspective: (state, action) => {},
    addLayer: (state, action) => {},
    removeLayer: (state, action) => {},
    toggleLayerVisibility: (state, action) => {},
    reorderLayer: (state, action) => {},
    onLayerHover: (state, action) => {},
    onLayerClick: (state, action) => {},
  },
});

export const { setBaseMap, setViewState } = mapSlice.actions;

export default mapSlice.reducer;
