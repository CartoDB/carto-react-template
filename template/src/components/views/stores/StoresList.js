import React from 'react';
import Divider from '@material-ui/core/Divider';
import {
  AggregationTypes,
  FormulaWidget,
  CategoryWidget,
  HistogramWidget,
} from 'lib/sdk';
import { LayerStyle } from 'components/layers/StoresLayer';

import { SOURCE_ID } from './constants';
import { currencyFormatter, numberFormatter } from 'utils/formatter';

export default function StoresList() {
  return (
    <div>
      <FormulaWidget
        title='Total revenue'
        data-source={SOURCE_ID}
        column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewport-filter
      ></FormulaWidget>

      <Divider />

      <CategoryWidget
        id='revenueByStoreType'
        title='Revenue by store type'
        data-source={SOURCE_ID}
        column='storetype'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        labels={LayerStyle.labels}
        viewport-filter
      />

      <Divider />

      <HistogramWidget
        id='storesByRevenue'
        title='Stores by revenue'
        data-source={SOURCE_ID}
        formatter={numberFormatter}
        xAxisFormatter={currencyFormatter}
        operation={AggregationTypes.COUNT}
        column='revenue'
        ticks={[1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000]}
        viewport-filter
      ></HistogramWidget>
    </div>
  );
}
