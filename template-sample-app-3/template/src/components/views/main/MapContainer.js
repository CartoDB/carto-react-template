import { lazy } from 'react';
import { BASEMAPS } from '@carto/react-basemaps';
import ZoomControl from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { ReactComponent as CartoLogoMap } from 'assets/img/carto-logo-map.svg';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { FeatureSelectionWidget, LegendWidget } from '@carto/react-widgets';
import { Box, Grid, Hidden, MenuItem, OutlinedInput, Select, Typography } from '@material-ui/core';
import { LAYER_OPTIONS, PALETTE_OPTIONS } from 'components/layers/StoresLayer';
import { useDispatch } from 'react-redux';
import { updateLayer } from '@carto/react-redux';

const Map = lazy(() => import(/* webpackChunkName: 'map' */ 'components/common/map/Map'));

const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',

    // [theme.breakpoints.down('xs')]: {
    //   height: `calc(100% - ${theme.spacing(12) - 1}px)`, // Minus 1 to fix that weirdly sometimes the bottom sheet is 1px lower than needed
    // },

    // Fix Mapbox attribution button not clickable
    '& #deckgl-wrapper': {
      '& #deckgl-overlay': {
        zIndex: 1,
      },
      '& #view-default-view > div': {
        zIndex: 'auto !important',
      },
    },
  },
  zoomControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  drawingTool: {
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  cartoLogoMap: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',
  },
  gmaps: {
    '& $zoomControl': {
      left: theme.spacing(4),
      bottom: theme.spacing(5),
    },
  },
  legend: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(10),
      right: theme.spacing(2),
    },

    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(18.5),
      right: theme.spacing(2),
    },
  },
  paletteSelector: {
    '& .MuiSelect-outlined.MuiSelect-outlined': {
      paddingTop: theme.spacing(1),
      fontSize: theme.typography.body2.fontSize,
    },
  },
}));

const LAYER_OPTIONS_COMPONENTS = {
  [LAYER_OPTIONS.PALETTE_SELECTOR]: PaletteSelector,
};

function PaletteSelector({ layer }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selected = layer?.palette || PALETTE_OPTIONS[0];

  function handleChange(ev) {
    const palette = ev.target.value;
    dispatch(
      updateLayer({
        id: layer.id,
        layerAttributes: {
          palette,
          legend: {
            ...layer.legend,
            colors: palette.value,
          },
        },
      })
    );
  }

  return (
    <Box p={2} className={classes.paletteSelector}>
      <Typography variant='caption'>Palette</Typography>
      <Select
        fullWidth
        value={selected}
        input={<OutlinedInput />}
        onChange={handleChange}
        margin='dense'
        MenuProps={{
          transformOrigin: { vertical: 'bottom', horizontal: 'left' },
          anchorOrigin: { vertical: 'top', horizontal: 'left' },
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              maxHeight: 240,
            },
          },
        }}
      >
        {PALETTE_OPTIONS.map((opt) => (
          <MenuItem key={opt.label} value={opt}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default function MapContainer() {
  const isGmaps = useSelector((state) => BASEMAPS[state.carto.basemap].type === 'gmaps');
  const classes = useStyles();

  const layers = getLayers();

  return (
    <Grid item className={`${classes.mapWrapper} ${isGmaps ? classes.gmaps : ''}`}>
      <Map layers={layers} />
      <Hidden xsDown>
        <ZoomControl className={classes.zoomControl} showCurrentZoom />
        <FeatureSelectionWidget className={classes.drawingTool} />
      </Hidden>
      {!isGmaps && <CartoLogoMap className={classes.cartoLogoMap} />}
      <LegendWidget
        customLayerOptions={LAYER_OPTIONS_COMPONENTS}
        className={classes.legend}
      />
    </Grid>
  );
}
