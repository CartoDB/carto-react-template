import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CategoryWidget } from 'components/common/widgets/CategoryWidget';
import { AggregationTypes } from '@carto/airship-api';
import { setViewState, addLayer } from 'config/cartoSlice';

function KpiInfo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 3,
        transitionDuration: 500,
      })
    );
    dispatch(
      addLayer({
        id: 'revenueByStateLayer',
        source: 'revenueByStateSource',
        selectedStore: null,
      })
    );
  });

  return (
    <Grid container wrap='nowrap' direction='column'>
      <Typography variant='h6'>Total revenue</Typography>
      <CategoryWidget
        data-source='revenueByStateSource'
        column='name'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        viewport-filter
      />
    </Grid>
  );
}

export default KpiInfo;
