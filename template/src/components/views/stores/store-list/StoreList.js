import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Divider, Typography } from '@material-ui/core';
import { FormulaWidget } from 'components/common/widgets/FormulaWidget';
import { CategoryWidget } from 'components/common/widgets/CategoryWidget';
import { AggregationTypes } from '@carto/airship-api';
import { setViewState, addLayer } from 'config/cartoSlice';

function StoreList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 2,
        transitionDuration: 500,
      })
    );
    dispatch(
      addLayer({ id: 'storesLayer', source: 'storesSource', selectedStore: null })
    );
  });

  return (
    <div>
      <Typography variant='h6'>Total revenue</Typography>
      <FormulaWidget
        data-source='storesSource'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        viewport-filter
      ></FormulaWidget>
      <Divider />
      <Typography variant='h6'>Revenue by store type</Typography>
      <CategoryWidget
        data-source='storesSource'
        column='storetype'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        viewport-filter
      />
    </div>
  );
}

export default StoreList;
