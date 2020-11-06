import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSourceById, addFilter, removeFilter } from 'config/cartoSlice';
import { WrapperWidgetUI, HistogramWidgetUI } from '@carto/react-airship-ui';
import { getHistogram, FilterTypes } from 'lib/sdk';

export default function HistogramWidget(props) {
  const { column } = props;
  const [histogramData, setHistogramData] = useState([]);
  const dispatch = useDispatch();
  const viewport = useSelector(
    (state) => props['viewport-filter'] && state.carto.viewport
  );
  const source = useSelector(
    (state) => selectSourceById(state, props['data-source']) || {}
  );
  const { title, formatter, dataAxis } = props;
  const { data, credentials, filters } = source;
  const { filters: _filters = {} } = source,
    { [column]: _column = {} } = _filters,
    { [FilterTypes.IN]: selectedBars = [] } = _column;

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

  const handleSelectedBarsChange = ({ bars }) => {
    if (bars && bars.length) {
      dispatch(
        addFilter({
          id: props['data-source'],
          column,
          type: FilterTypes.IN,
          values: bars,
        })
      );
    } else {
      dispatch(
        removeFilter({
          id: props['data-source'],
          column,
        })
      );
    }
  };

  return (
    <WrapperWidgetUI title={title} expandable={true}>
      <HistogramWidgetUI
        data={histogramData}
        dataAxis={dataAxis}
        selectedBars={selectedBars}
        onSelectedBarsChange={handleSelectedBarsChange}
        tooltipFormatter={formatter}
      />
    </WrapperWidgetUI>
  );
}
