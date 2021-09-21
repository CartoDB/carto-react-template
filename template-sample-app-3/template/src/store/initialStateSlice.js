import { VOYAGER } from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 31.802892,
    longitude: -103.007813,
    zoom: 3,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: VOYAGER,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    // Going public!
    accessToken:
      'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfY2N5MWhtb3giLCJqdGkiOiJiNTc2OGY5MCJ9.Ny0UvbEZX5q3zlJUydZ6lXjdpPUMIhYnwaJQGP9PCog',
  },
  googleApiKey: '', // only required when using a Google Basemap,
};
