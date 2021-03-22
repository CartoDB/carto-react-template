import { useSelector, useDispatch } from 'react-redux';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StaticMap } from 'react-map-gl';
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import { setViewState } from '@carto/react-redux';
import { BASEMAPS, GoogleMap } from '@carto/react-basemaps';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    position: 'relative',
    height: `calc(100% - ${theme.spacing(2)}px)`,

    [theme.breakpoints.down('xs')]: {
      height: `calc(100% - ${theme.spacing(12) - 1}px)`, // Minus 1 to fix that weirdly sometimes the bottom sheet is 1px lower than needed
    },

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),

      '& .mapboxgl-map, & #deckgl-overlay, & > div': {
        borderRadius: theme.spacing(0.5),
      },
    },
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

function Map({ layers }) {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.carto.viewState);
  const basemap = useSelector((state) => BASEMAPS[state.carto.basemap]);
  const googleApiKey = useSelector((state) => state.carto.googleApiKey);
  let isHovering = false;

  const handleViewStateChange = ({ viewState }) => {
    dispatch(setViewState(viewState));
  };

  const handleSizeChange = ({ width, height }) => {
    dispatch(setViewState({ width, height }));
  };

  const handleHover = ({ object }) => (isHovering = !!object);
  const handleCursor = ({ isDragging }) =>
    isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';

  const handleTooltip = (info) => {
    if (info?.object) {
      return {
        html: `<div class='content'>${info.object.html}<div class='arrow'></div></div>`,
        className: classes.tooltip,
        style: {
          padding: 0,
          background: 'none',
        },
      };
    }
  };

  let map = <div>Not a valid map provider</div>;

  if (basemap.type === 'mapbox') {
    map = (
      <DeckGL
        viewState={{ ...viewState }}
        controller={true}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        onResize={handleSizeChange}
        onHover={handleHover}
        getCursor={handleCursor}
        getTooltip={handleTooltip}
        pickingRadius={isMobile ? 10 : 0}
      >
        <StaticMap reuseMaps mapStyle={basemap.options.mapStyle} preventStyleDiffing />
      </DeckGL>
    );
  } else if (basemap.type === 'gmaps') {
    map = (
      <GoogleMap
        basemap={basemap}
        apiKey={googleApiKey}
        viewState={{ ...viewState }}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        onResize={handleSizeChange}
        getTooltip={handleTooltip}
      />
    );
  }

  return <div className={classes.root}>{map}</div>;
}

export default Map;
