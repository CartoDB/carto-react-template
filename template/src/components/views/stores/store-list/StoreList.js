import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
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
        zoom: 3,
        transitionDuration: 500,
      })
    );
    dispatch(
      addLayer({ id: 'storesLayer', source: 'storesSource', selectedStore: null })
    );
  });

  const formulaWidgetFormatter = (v) => {
    const moneyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const formattedParts = moneyFormatter.formatToParts(v);
    const valueParted = formattedParts.reduce(
      (acum, part) => {
        switch (part.type) {
          case 'currency':
            acum.unit = part.value;
            break;
          case 'integer':
          case 'group':
          case 'decimal':
          case 'fraction':
            acum.value += part.value;
            break;
          default: // do nothing
        }
        return acum;
      },
      { unit: '', value: '' }
    );
    return [valueParted.unit, valueParted.value];
  };

  return (
    <div>
      <FormulaWidget
        title='Total revenue'
        data-source='storesSource'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={formulaWidgetFormatter}
        viewport-filter
      ></FormulaWidget>
      <Divider />
      <CategoryWidget
        title='Revenue by store type'
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
