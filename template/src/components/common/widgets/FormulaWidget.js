import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSourceById } from 'config/cartoSlice';
import { WrapperWidgetUI, FormulaWidgetUI } from 'lib/react-ui';
import { getValue } from '@carto/airship-api';

const FAKE_OPTIONS = [
  { id: 'o0', name: 'Option 1', action: null },
  { id: 'o1', name: 'Option 2', action: null },
  { id: 'o2', name: 'Option 3', action: null },
  { id: 'o3', name: 'Option 4', action: null },
  { id: 'o4', name: 'Option 5', action: null },
  { id: 'o5', name: 'Option 6', action: null },
];

const FAKE_ACTIONS = [
  { id: 'a0', name: 'Autostyle', icon: 'icon-content-autostyle.svg', action: null },
];

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

  return (
    <WrapperWidgetUI title={props.title}>
      <FormulaWidgetUI data={formulaData} formatter={props.formatter} />
    </WrapperWidgetUI>
  );
}
