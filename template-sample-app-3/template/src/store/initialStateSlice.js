import { VOYAGER, GOOGLE_ROADMAP } from '@carto/react-basemaps';
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
  // basemap: GOOGLE_ROADMAP,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    // Going public!
    accessToken:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRVNGNZTHAwaThjYnVMNkd0LTE0diJ9.eyJodHRwOi8vYXBwLmNhcnRvLmNvbS9lbWFpbCI6ImphcmFnb25AY2FydG9kYi5jb20iLCJodHRwOi8vYXBwLmNhcnRvLmNvbS9hY2NvdW50X2lkIjoiYWNfeTBpc3NoaWoiLCJpc3MiOiJodHRwczovL2F1dGguY2FydG8uY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA0MzMxMjQxMTYwMTYyNzU3ODM4IiwiYXVkIjpbImNhcnRvLWNsb3VkLW5hdGl2ZS1hcGkiLCJodHRwczovL2NhcnRvLXByb2R1Y3Rpb24udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY0MzEwMzg5MywiZXhwIjoxNjQzMTkwMjkzLCJhenAiOiJqQ1duSEs2RTJLMmFPeTlqTHkzTzdaTXBocUdPOUJQTCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlciByZWFkOmNvbm5lY3Rpb25zIHdyaXRlOmNvbm5lY3Rpb25zIHJlYWQ6bWFwcyB3cml0ZTptYXBzIHJlYWQ6YWNjb3VudCBhZG1pbjphY2NvdW50IiwicGVybWlzc2lvbnMiOlsiYWRtaW46YWNjb3VudCIsInJlYWQ6YWNjb3VudCIsInJlYWQ6YXBwcyIsInJlYWQ6Y29ubmVjdGlvbnMiLCJyZWFkOmN1cnJlbnRfdXNlciIsInJlYWQ6aW1wb3J0cyIsInJlYWQ6bGlzdGVkX2FwcHMiLCJyZWFkOm1hcHMiLCJyZWFkOnRpbGVzZXRzIiwicmVhZDp0b2tlbnMiLCJ1cGRhdGU6Y3VycmVudF91c2VyIiwid3JpdGU6YXBwcyIsIndyaXRlOmNvbm5lY3Rpb25zIiwid3JpdGU6aW1wb3J0cyIsIndyaXRlOmxpc3RlZF9hcHBzIiwid3JpdGU6bWFwcyIsIndyaXRlOnRva2VucyJdfQ.iczwchmXF6nGOfhWES496l-EE39aozVBL3dtCvSs5M0sqIhw20ArBGpkEvpgHH4-tpXZDtROcn3JmGeoV_5F7phtGC0Gw00TTXJmjfBg8jDZ4Ndqk60cB8kHnuvDXx-660lJ_zWaYvwyNQcJiIiXdD3LITJgF6HhWbl8a7VoEzGpeUPfbVLQfKV3RQep2wBwEsIYQ1A__Cpvb34k1vdUR4BaqVLkofYulMB56qWbjsgrVClpdHcrUxv0NvgD9eJQxQucr49F1uCtW5xpjjtKp0QN9Bze5DVBYaKB21L42tmZLZWhReIyrg0T1F65IfveJPJq1zTAF_WJdlGk4jsOXA',
  },
  googleApiKey: 'AIzaSyDo0IcSXC0VZNz3IEKawF2rWng20KXkhWc', // only required when using a Google Basemap,
  googleMapId: '', // only required when using a Google Custom Basemap
};
