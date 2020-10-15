import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { FormulaWidget } from 'components/common/widgets/FormulaWidget';
import { CategoryWidget } from 'components/common/widgets/CategoryWidget';
import { AggregationTypes } from 'lib/models/AggregationTypes';

function StoreList() {
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
