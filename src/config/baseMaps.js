const GOOGLE_API_KEY = '';

export const baseMaps = {
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
    apiKey: GOOGLE_API_KEY,
    options: {
      mapTypeId: 'roadmap',
    },
  },
  satellite: {
    type: 'gmaps',
    apiKey: GOOGLE_API_KEY,
    options: {
      mapTypeId: 'satellite',
    },
  },
  hybrid: {
    type: 'gmaps',
    apiKey: GOOGLE_API_KEY,
    options: {
      mapTypeId: 'hybrid',
    },
  },
};
