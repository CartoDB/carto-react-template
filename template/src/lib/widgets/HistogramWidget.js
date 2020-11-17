import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSourceById } from 'lib/sdk/slice/cartoSlice';
import { WrapperWidgetUI, HistogramWidgetUI } from 'lib/ui';
import { getHistogram, FilterTypes } from 'lib/sdk/models';
import { getApplicableFilters } from '../models/FilterQueryBuilder';

export default function HistogramWidget(props) {
  const { column } = props;
  const [histogramData, setHistogramData] = useState([]);
  const [selectedBars, setSelectedBars] = useState([]);
  const dispatch = useDispatch();
  const viewport = useSelector((state) => props.viewportFilter && state.carto.viewport);
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const { title, formatter, xAxisFormatter, dataAxis, ticks } = props;
  const { data, credentials } = source;
  // const selectedBars = getSelectBars(column, source.filters, ticks);

  const tooltipFormatter = ([serie]) => {
    const formattedValue = formatter
      ? formatter(serie.value)
      : { preffix: '', value: serie.value };

    return `${
      typeof formattedValue === 'object'
        ? `${formattedValue.preffix}${formattedValue.value}`
        : formattedValue
    }`;
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (
      data &&
      credentials &&
      (!props.viewportFilter || (props.viewportFilter && viewport))
    ) {
      const filters = getApplicableFilters(source.filters, props.id);
      getHistogram({
        ...props,
        data,
        filters,
        credentials,
        viewport,
        opts: { abortController },
      })
        .then((data) => data && setHistogramData(data))
        .catch((error) => {
          if (error.name === 'AbortError') return;

          dispatch(setError(`Histogram widget error: ${error.message}`));
        });
    } else {
      setHistogramData([]);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [credentials, data, source.filters, viewport, props, dispatch]);

  const handleSelectedBarsChange = ({ bars }) => {
    setSelectedBars(bars);
    if (bars && bars.length) {
      const thresholds = bars.map((i) => {
        return [ticks[i - 1], ticks.length !== i + 1 ? ticks[i] : undefined];
      });
      dispatch(
        {
          type: 'carto/addFilter',
          payload: {
            id: props.dataSource,
            column,
            type: FilterTypes.BETWEEN,
            values: thresholds,
            owner: props.id,
          },
        }
        // addFilter({
        //   id: props.dataSource,
        //   column,
        //   type: FilterTypes.BETWEEN,
        //   values: thresholds,
        //   owner: props.id,
        // })
      );
    } else {
      dispatch(
        {
          type: 'carto/removeFilter',
          payload: {
            id: props.dataSource,
            column,
          },
        }
        // removeFilter({
        //   id: props.dataSource,
        //   column,
        // })
      );
    }
  };

  return (
    <WrapperWidgetUI title={title} expandable={true}>
      <HistogramWidgetUI
        data={histogramData}
        dataAxis={dataAxis || [...ticks, `> ${ticks[ticks.length - 1]}`]}
        selectedBars={selectedBars}
        onSelectedBarsChange={handleSelectedBarsChange}
        tooltipFormatter={tooltipFormatter}
        xAxisFormatter={xAxisFormatter}
        yAxisFormatter={formatter}
      />
    </WrapperWidgetUI>
  );
}
