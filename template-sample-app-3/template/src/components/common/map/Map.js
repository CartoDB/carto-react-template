import { lazy } from 'react';
import { useSelector } from 'react-redux';
import 'maplibre-gl/dist/maplibre-gl.css';
import makeStyles from '@mui/styles/makeStyles';
import { BASEMAPS } from '@carto/react-basemaps';

const DeckGLComponent = lazy(() =>
  import(/* webpackChunkName: 'deck-gl' */ 'components/common/map/DeckGLComponent')
);
const GoogleMapsComponent = lazy(() =>
  import(/* webpackChunkName: 'google-map' */ 'components/common/map/GoogleMapsComponent')
);

const BASEMAP_TYPES = {
  mapbox: 'mapbox',
  gmaps: 'gmaps',
};

const useStyles = makeStyles((theme) => ({
  map: {
    backgroundColor: theme.palette.grey[50],
    position: 'relative',
    flex: '1 1 auto',
  },
}));

export default function Map({ layers }) {
  const basemap = useSelector((state) => BASEMAPS[state.carto.basemap]);
  const classes = useStyles();

  const mapsAvailable = {
    [BASEMAP_TYPES.mapbox]: () => <DeckGLComponent layers={layers} />,
    [BASEMAP_TYPES.gmaps]: () => <GoogleMapsComponent layers={layers} />,
  };

  let map = mapsAvailable[basemap.type] ? (
    mapsAvailable[basemap.type]()
  ) : (
    <div>Not a valid map provider</div>
  );

  return <div className={classes.map}>{map}</div>;
}
