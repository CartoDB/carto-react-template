# CARTO and Google Basemaps

It is quite easy to change the basemap for the application. By default, the application will use the CARTO Positron basemap, but you can choose any other CARTO basemap (Dark Matter, Voyager) or you can also use a Google basemap.

<br/>

| BASEMAP | PREVIEW
| -----|---------
| POSITRON | <img src="https://carto.com/help/images/building-maps/basemaps/positron_labels.png"  /> | https://basemaps.cartocdn.com/gl/positron-gl-style/style.json |
| DARK_MATTER | <img src="https://carto.com/help/images/building-maps/basemaps/dark_labels.png"  /> | https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json |
| VOYAGER | <img src="https://carto.com/help/images/building-maps/basemaps/voyager_labels.png"  /> | https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json |
| GOOGLE_ROADMAP | No preview available yet |
| GOOGLE_SATELLITE | No preview available yet |
| GOOGLE_HYBRID | No preview available yet |

<br/>

You need to edit the `src/store/initialStateSlice.js` file. At the beginning of this file we are importing the basemap from the `@carto/react` package.

If you want to use the Google road basemap, you need to import it like this:

```javascript
import { GOOGLE_ROADMAP } from '@carto/react/basemaps';
```

Then you need to modify the "basemap" property in the initialState object:

```javascript
export const initialState = {
  ...
  basemap: GOOGLE_ROADMAP,
    googleApiKey: 'AAAAABBBBBBBCCCCCCC11111122222233333',
  ...
};
```
