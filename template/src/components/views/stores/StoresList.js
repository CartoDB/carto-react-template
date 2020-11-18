import React from 'react';
import { useDispatch } from 'react-redux';
import { setError } from 'config/appSlice';

import Divider from '@material-ui/core/Divider';
import { AggregationTypes, FormulaWidget, CategoryWidget, HistogramWidget } from 'lib';
import { SOURCE_ID } from './constants';
import { currencyFormatter, numberFormatter } from 'utils/formatter';

export default function StoresList() {
  const dispatch = useDispatch();

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
        dataSource={SOURCE_ID}
        column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewportFilter
        onError={onTotalRevenueWidgetError}
      ></FormulaWidget>

      <Divider />

      <CategoryWidget
        id='revenueByStoreType'
        title='Revenue by store type'
        dataSource={SOURCE_ID}
        column='storetype'
        operationColumn='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewportFilter
        onError={onRevenuePerTypeWidgetError}
      />

      <Divider />

      <HistogramWidget
        id='storesByRevenue'
        title='Stores by revenue'
        dataSource={SOURCE_ID}
        formatter={numberFormatter}
        xAxisFormatter={currencyFormatter}
        operation={AggregationTypes.COUNT}
        column='revenue'
        ticks={[1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000]}
        viewportFilter
        onError={onStoresByRevenueWidgetError}
      ></HistogramWidget>
    </div>
  );
}
