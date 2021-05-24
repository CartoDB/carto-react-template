import { VOYAGER } from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 31.802892,
    longitude: -103.007813,
    zoom: 2,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: VOYAGER,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    // tenant: 'TYPE HERE YOUR CARTO CLOUD NATIVE TENANT',
    // mapsUrl: 'https://maps-{tenant}'
    mapsUrl: 'http://localhost:8002/v3/maps',
  },
  googleApiKey: '', // only required when using a Google Basemap,
  oauth: {
    domain: 'carto-development.us.auth0.com',
    clientId: 'qyHbllYolzyE79UAljEhAyc9BEok9maI',
    scopes: [
      'read:current_user',
      'update:current_user',
      'read:connections',
      'write:connections',
      'read:maps',
      'write:maps',
      'read:account',
      'admin:account',
    ],
    audience: 'carto-cloud-native-api',
    authorizeEndPoint: 'https://carto.com/oauth2/authorize', // only valid if keeping https://localhost:3000/oauthCallback
  },
};
