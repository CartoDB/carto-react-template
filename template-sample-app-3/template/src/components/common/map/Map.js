import { lazy } from 'react';
import { useSelector } from 'react-redux';
import 'maplibre-gl/dist/maplibre-gl.css';
import { makeStyles } from '@material-ui/core';
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
  tooltip: {
    '& .content': {
      ...theme.typography.caption,
      position: 'relative',
      padding: theme.spacing(1, 1.5),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
      color: 'rgba(255, 255, 255, 0.75)',
      transform: `translate(-50%, calc(-100% - ${theme.spacing(2.5)}px))`,

      '& .arrow': {
        display: 'block',
        position: 'absolute',
        top: 'calc(100% - 1px)',
        left: '50%',
        width: 0,
        height: 0,
        marginLeft: theme.spacing(-1),
        borderLeft: `${theme.spacing(1)}px solid transparent`,
        borderRight: `${theme.spacing(1)}px solid transparent`,
        borderTop: `${theme.spacing(1)}px solid ${theme.palette.grey[900]}`,
      },
    },
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
