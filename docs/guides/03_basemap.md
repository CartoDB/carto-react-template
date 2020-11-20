# CARTO and Google Basemaps

It is quite easy to change the basemap for the application. By default, the application will use the CARTO Positron basemap, but you can choose any other CARTO basemap (Dark Matter, Voyager) or you can also use a Google basemap.

You need to edit the src/config/initialStateSlice.js file. At the beginning of this file we are importing the basemap from the @carto/react package. The constants for the available basemaps are:

- POSITRON. CARTO Positron basemap.
- DARK_MATTER. CARTO Dark Matter basemaP.
- VOYAGER. CARTO Voyager basemap.
- GOOGLE_ROADMAP. Google road basemap.
- GOOGLE_SATELLITE. Google satellite basemap.
- GOOGLE_HYBRID. Google hybrid basemap.

If you want to use the Google road basemap, you need to import it like this:

```javascript
import { GOOGLE_ROADMAP } from '@carto/react/basemaps';
```

Then you need to modify the "basemap" property in the initialState object:

```javascript
export const initialState = {
  ...
  basemap: GOOGLE_ROADMAP,
  ...
};
```

In the particular case of Google Maps basemaps, you also need to provide the Google API Key in the googleApiKey property:

```javascript
export const initialState = {
  ...
  googleApiKey: 'AAAAABBBBBBBCCCCCCC11111122222233333', 
};
```