import React from 'react';
import { CategoryWidget } from 'components/common/widgets/CategoryWidget';
import { AggregationTypes } from 'lib/models/AggregationTypes';

function StoreIndex() {
  return (
    <CategoryWidget
      data-source='storesSource'
      column='storetype'
      operation-column='cartodb_id'
      operation={AggregationTypes.SUM}
      viewport-filter
    />
  );
}

export default StoreIndex;
