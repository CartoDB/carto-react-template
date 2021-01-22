import React from 'react';
import { useDispatch } from 'react-redux';
import { setError } from 'config/appSlice';

import Divider from '@material-ui/core/Divider';

import { AggregationTypes } from '@carto/react/widgets';
import { FormulaWidget, CategoryWidget, HistogramWidget } from '@carto/react/widgets';

import { currencyFormatter, numberFormatter } from 'utils/formatter';
import { STORES_SOURCE_COLUMNS, storesSource } from 'data/sources/StoresSource'

export default function StoresList() {
  const dispatch = useDispatch();

  // Auto import useEffect

  const onTotalRevenueWidgetError = (error) => {
    dispatch(setError(`Error obtaining total revenue: ${error.message}`));
  };

  const onRevenuePerTypeWidgetError = (error) => {
    dispatch(setError(`Error obtaining revenue per type: ${error.message}`));
  };

  const onStoresByRevenueWidgetError = (error) => {
    dispatch(setError(`Error obtaining stores per revenue: ${error.message}`));
  };

  return (
    <div>
      <FormulaWidget
        title='Total revenue'
        dataSource={storesSource.id}
        column={STORES_SOURCE_COLUMNS.REVENUE}
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewportFilter
        onError={onTotalRevenueWidgetError}
      ></FormulaWidget>

      <Divider />

      <CategoryWidget
        id='revenueByStoreType'
        title='Revenue by store type'
        dataSource={storesSource.id}
        column={STORES_SOURCE_COLUMNS.STORE_TYPE}
        operationColumn={STORES_SOURCE_COLUMNS.REVENUE}
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewportFilter
        onError={onRevenuePerTypeWidgetError}
      />

      <Divider />

      <HistogramWidget
        id='storesByRevenue'
        title='Stores by revenue'
        dataSource={storesSource.id}
        formatter={numberFormatter}
        xAxisFormatter={currencyFormatter}
        operation={AggregationTypes.COUNT}
        column={STORES_SOURCE_COLUMNS.REVENUE}
        ticks={[1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000]}
        viewportFilter
        onError={onStoresByRevenueWidgetError}
      ></HistogramWidget>
    </div>
  );
}
