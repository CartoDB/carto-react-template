import React from 'react';
import Typography from '@material-ui/core/Typography';
import { CategoryWidget } from 'components/common/widgets/CategoryWidget';
import { AggregationTypes } from '@carto/airship-api';

function KpiInfo() {
  return (
    <div>
      <Typography variant='h6'>Total revenue</Typography>
      <CategoryWidget
        data-source='revenueByStateSource'
        column='name'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        viewport-filter
      />
    </div>
  );
}

export default KpiInfo;
