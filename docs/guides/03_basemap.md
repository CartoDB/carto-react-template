# CARTO and Google Basemaps

It is quite easy to change the basemap for the application. By default, the application will use the CARTO Positron basemap, but you can choose any other CARTO basemap (Dark Matter, Voyager) or you can also use a Google basemap.

You need to edit the src/config/initialStateSlice.js file. At the beginning of this file we are importing the basemap from the @carto/react package. The constants for the available basemaps are:

- POSITRON.
- DARK_MATTER.
- VOYAGER.
- GOOGLE_ROADMAP.
- GOOGLE_SATELLITE.
- GOOGLE_HYBRID.

If you want to use the dark matter basemap, you need to import it like this:

```javascript
import { DARK_MATTER } from '@carto/react/basemaps';
```

Then you need to modify the "basemap" property in the initialState object:

```javascript
export const initialState = {
  ...
  basemap: DARK_MATTER,
  ...
};
```

In the particular case of Google Maps basemaps, you also need to provide the Google API Key in the googleApiKey property:

```javascript
export const initialState = {
  ...
  basemap: GOOGLE_ROADMAP,
  googleApiKey: 'AAAAABBBBBBBCCCCCCC11111122222233333',
};
```
