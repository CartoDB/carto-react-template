import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Divider, Grid, Typography } from '@material-ui/core';
import { CategoryWidget } from 'components/common/widgets/CategoryWidget';
import { FormulaWidget } from 'components/common/widgets/FormulaWidget';
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
      <FormulaWidget
        data-source='revenueByStateSource'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        viewport-filter
      ></FormulaWidget>
      <Divider />
      <Typography variant='h6'>Revenue by state</Typography>
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
