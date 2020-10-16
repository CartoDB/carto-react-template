import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSourceById } from 'config/cartoSlice';
import { FormulaWidgetUI } from '@carto/react-airship-ui';
import { getValue } from '@carto/airship-api';

export function FormulaWidget(props) {
  const [formulaData, setFormulaData] = useState([]);
  const viewport = useSelector(
    (state) => props['viewport-filter'] && state.carto.viewport
  );
  const source = useSelector(
    (state) => selectSourceById(state, props['data-source']) || {}
  );
  const { data, credentials, filters } = source;

  useEffect(() => {
    if (
      data &&
      credentials &&
      (!props['viewport-filter'] || (props['viewport-filter'] && viewport))
    ) {
      getValue({ ...props, data, filters, credentials, viewport }).then(
        (data) => data && data[0] && setFormulaData(data[0].value)
      );
    } else {
      setFormulaData(null);
    }
  }, [credentials, data, filters, viewport, props]);

  return <FormulaWidgetUI data={formulaData} />;
}
