import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from '@material-ui/core';
import { AggregationTypes } from 'lib/sdk';
import { CategoryWidget } from 'components/common/widgets/CategoryWidget';
import { FormulaWidget } from 'components/common/widgets/FormulaWidget';
import { setViewState, addLayer } from 'config/cartoSlice';
import { currencyFormatter } from 'utils/numberFormatters';

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
    <div>
      <FormulaWidget
        title='Total revenue'
        data-source='revenueByStateSource'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewport-filter
      ></FormulaWidget>
      <Divider />
      <CategoryWidget
        title='Revenue by state'
        data-source='revenueByStateSource'
        column='name'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewport-filter
      />
    </div>
  );
}

export default KpiInfo;
