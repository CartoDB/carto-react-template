export const POSITRON = 'positron';
export const VOYAGER = 'voyager';
export const DARK_MATTER = 'dark-matter';
export const GOOGLE_ROADMAP = 'roadmap';
export const GOOGLE_SATELLITE = 'satellite';
export const GOOGLE_HYBRID = 'hybrid';

export const BASEMAPS = {
  [POSITRON]: {
    type: 'mapbox',
    options: {
      mapStyle: `https://basemaps.cartocdn.com/gl/${POSITRON}-gl-style/style.json`,
    },
  },
  [VOYAGER]: {
    type: 'mapbox',
    options: {
      mapStyle: `https://basemaps.cartocdn.com/gl/${VOYAGER}-gl-style/style.json`,
    },
  },
  [DARK_MATTER]: {
    type: 'mapbox',
    options: {
      mapStyle: `https://basemaps.cartocdn.com/gl/${DARK_MATTER}-gl-style/style.json`,
    },
  },
  [GOOGLE_ROADMAP]: {
    type: 'gmaps',
    options: {
      mapTypeId: 'roadmap',
    },
  },
  [GOOGLE_SATELLITE]: {
    type: 'gmaps',
    options: {
      mapTypeId: GOOGLE_SATELLITE,
    },
  },
  [GOOGLE_HYBRID]: {
    type: 'gmaps',
    options: {
      mapTypeId: 'hybrid',
    },
  },
};
