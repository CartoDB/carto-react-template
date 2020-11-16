import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSourceById } from 'lib/sdk/slice/cartoSlice';
import { WrapperWidgetUI, FormulaWidgetUI } from 'lib/ui';
import { getValue } from 'lib/sdk/models';

export default function FormulaWidget(props) {
  const [formulaData, setFormulaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const viewport = useSelector((state) => props.viewportFilter && state.carto.viewport);
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const { data, credentials, filters } = source;

  useEffect(() => {
    if (
      data &&
      credentials &&
      (!props.viewportFilter || (props.viewportFilter && viewport))
    ) {
      setLoading(true);
      getValue({ ...props, data, filters, credentials, viewport }).then((data) => {
        data && data[0] && setFormulaData(data[0].value);
        setLoading(false);
      });
    } else {
      setFormulaData(undefined);
    }
  }, [credentials, data, filters, viewport, props]);

  return (
    <WrapperWidgetUI title={props.title} expandable={true} loading={loading}>
      <FormulaWidgetUI data={formulaData} formatter={props.formatter} unitBefore={true} />
    </WrapperWidgetUI>
  );
}
