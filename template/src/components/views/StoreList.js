import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { AggregationTypes } from 'lib/sdk';
import { FormulaWidget, CategoryWidget } from 'components/common/widgets';
import { LayerStyle } from 'components/layers/StoresLayer';
import { setViewState, addLayer } from 'config/cartoSlice';
import { currencyFormatter } from 'utils/numberFormatters';

export default function StoreList() {
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
      addLayer({ id: 'storesLayer', source: 'storesSource', selectedStore: null })
    );
  }, [dispatch]);

  return (
    <div>
      <FormulaWidget
        title='Total revenue'
        data-source='storesSource'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewport-filter
      ></FormulaWidget>
      <Divider />
      <CategoryWidget
        title='Revenue by store type'
        data-source='storesSource'
        column='storetype'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        labels={LayerStyle.labels}
        viewport-filter
      />
    </div>
  );
}
