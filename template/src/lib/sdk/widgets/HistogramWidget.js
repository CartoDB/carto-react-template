import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSourceById } from 'config/cartoSlice';
import { WrapperWidgetUI, HistogramWidgetUI } from '@carto/react-airship-ui';
import { getHistogram } from 'lib/sdk';

export default function HistogramWidget(props) {
  const [histogramData, setHistogramData] = useState([]);
  const viewport = useSelector(
    (state) => props['viewport-filter'] && state.carto.viewport
  );
  const source = useSelector(
    (state) => selectSourceById(state, props['data-source']) || {}
  );
  const { title, formatter, dataAxis } = props;
  const { data, credentials, filters } = source;

  useEffect(() => {
    if (
      data &&
      credentials &&
      (!props['viewport-filter'] || (props['viewport-filter'] && viewport))
    ) {
      getHistogram({ ...props, data, filters, credentials, viewport }).then(
        (data) => data && setHistogramData(data)
      );
    } else {
      setHistogramData([]);
    }
  }, [credentials, data, filters, viewport, props]);

  return (
    <WrapperWidgetUI title={title} expandable={true}>
      <HistogramWidgetUI
        data={histogramData}
        dataAxis={dataAxis}
        tooltipFormatter={formatter}
      />
    </WrapperWidgetUI>
  );
}
