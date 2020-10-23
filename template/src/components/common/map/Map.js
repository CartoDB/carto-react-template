import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { makeStyles } from '@material-ui/core';

import { setViewState } from 'config/cartoSlice';
import { baseMaps } from 'config/baseMaps';
import { GoogleMap } from './GoogleMap';
import { StoresLayer } from './layers/StoresLayer';
import { RevenueByStateLayer } from './layers/RevenueByStateLayer';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    '& .content': {
      ...theme.typography.caption,
      position: 'relative',
      padding: theme.spacing(1, 1.5),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.customGrey[900],
      color: 'rgba(255, 255, 255, 0.75)', // TODO: Add emphasis colors to theme
      transform: `translate(-50%, calc(-100% - ${theme.spacing(2.5)}px))`,

      '& .arrow': {
        display: 'block',
        position: 'absolute',
        top: 'calc(100% - 1px)',
        left: '50%',
        width: 0,
        height: 0,
        marginLeft: theme.spacing(-0.5),
        borderLeft: `${theme.spacing(1)}px solid transparent`,
        borderRight: `${theme.spacing(1)}px solid transparent`,
        borderTop: `${theme.spacing(1)}px solid ${theme.palette.customGrey[900]}`,
      },
    },
  },
}));

export function Map() {
  const viewState = useSelector((state) => state.carto.viewState);
  const [extraViewState, setExtraViewState] = useState({});
  const baseMap = useSelector((state) => baseMaps[state.carto.baseMap]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const layers = [StoresLayer(), RevenueByStateLayer()];

  const handleViewStateChange = ({ viewState }) => {
    const {
      longitude,
      latitude,
      zoom,
      pitch,
      bearing,
      transitionDuration,
      ...others
    } = viewState;
    setExtraViewState(others);
    dispatch(
      setViewState({ longitude, latitude, zoom, pitch, bearing, transitionDuration })
    );
  };

  const handleSizeChange = ({ width, height }) => {
    dispatch(setViewState({ width, height }));
  };

  if (baseMap.type === 'mapbox') {
    return (
      <DeckGL
        viewState={{ ...viewState, ...extraViewState }}
        controller={true}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        onResize={handleSizeChange}
        getTooltip={(info) => {
          if (info && info.object) {
            return {
              html: `<div class='content'>${info.object.html}<div class='arrow'></div></div>`,
              className: classes.tooltip,
              style: {
                padding: 0,
                background: 'none',
              },
            };
          }
        }}
      >
        <StaticMap reuseMaps mapStyle={baseMap.options.mapStyle} preventStyleDiffing />
      </DeckGL>
    );
  } else if (baseMap.type === 'gmaps') {
    return (
      <GoogleMap
        baseMap={baseMap}
        viewState={{ ...viewState, ...extraViewState }}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        onResize={handleSizeChange}
      ></GoogleMap>
    );
  } else {
    return <div>Not a valid map provider</div>;
  }
}
