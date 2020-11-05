import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSourceById } from 'config/cartoSlice';
import { WrapperWidgetUI, FormulaWidgetUI } from '@carto/react-airship-ui';
import { getValue } from 'lib/sdk';

export default function FormulaWidget(props) {
  const [formulaData, setFormulaData] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      getValue({ ...props, data, filters, credentials, viewport }).then((data) => {
        data && data[0] && setFormulaData(data[0].value);
        setLoading(false);
      });
    } else {
      setFormulaData(null);
    }
  }, [credentials, data, filters, viewport, props]);

  return (
    <WrapperWidgetUI title={props.title} expandable={true} loading={loading}>
      <FormulaWidgetUI data={formulaData} formatter={props.formatter} />
    </WrapperWidgetUI>
  );
}
