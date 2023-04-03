import { useEffect } from 'react';
import tilesetSource from 'data/sources/tilesetSource';
import { TILESET_LAYER_ID } from 'components/layers/TilesetLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
  setViewState,
} from '@carto/react-redux';
import { setError } from 'store/appSlice';

import { styled } from '@mui/material/styles';
import { Grid, Divider, Typography } from '@mui/material';

import { FormulaWidget, HistogramWidget } from '@carto/react-widgets';
import { numberFormatter, intervalsFormatter } from 'utils/formatter';
import { AggregationTypes } from '@carto/react-core';

const Title = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(3, 3, 1.5),
}));

export default function Tileset() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 0,
        longitude: 0,
        zoom: 1,
        transitionDuration: 500,
      })
    );
    dispatch(addSource(tilesetSource));

    dispatch(
      addLayer({
        id: TILESET_LAYER_ID,
        source: tilesetSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(TILESET_LAYER_ID));
      dispatch(removeSource(tilesetSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  const onTotalWidgetError = (error) => {
    dispatch(setError(`Error obtaining aggregated sum: ${error.message}`));
  };

  const onHistogramCountWidgetError = (error) => {
    dispatch(setError(`Error obtaining aggregated count: ${error.message}`));
  };

  return (
    <Grid container direction='column'>
      <Title variant='h5' gutterBottom>
        OSM Buildings Analysis
      </Title>

      <Divider />

      <FormulaWidget
        id='aggTotalFormulaSum'
        title='Total aggregated sum'
        dataSource={tilesetSource.id}
        column='aggregated_total'
        operation={AggregationTypes.SUM}
        formatter={numberFormatter}
        onError={onTotalWidgetError}
      />

      <Divider />

      <HistogramWidget
        id='aggTotalHistogramCount'
        title='Total aggregated count'
        dataSource={tilesetSource.id}
        xAxisFormatter={numberFormatter}
        formatter={intervalsFormatter}
        operation={AggregationTypes.COUNT}
        column='aggregated_total'
        onError={onHistogramCountWidgetError}
      />

      <Divider />
    </Grid>
  );
}
