import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Grid, Link, Typography, useTheme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  optionsSelectedBar: {
    marginBottom: theme.spacing(2),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary,
    },

    '& .MuiButton-label': {
      ...theme.typography.caption,
    },
  },

  selectAllButton: {
    ...theme.typography.caption,
    cursor: 'pointer',
  },
}));

function __dataEqual(optionPrev, optionNext) {
  const dataPrev = optionPrev.series[0].data;
  const dataNext = optionNext.series[0].data;
  if (dataPrev && dataNext && dataPrev.length === dataNext.length) {
    return !dataNext.some(({ value }, index) => {
      return !(value === dataPrev[index].value);
    });
  }
  return false;
}

function __generateDefaultConfig(
  { dataAxis, tooltipFormatter, xAxisFormatter = (v) => v, yAxisFormatter = (v) => v },
  data,
  theme
) {
  return {
    grid: {
      left: theme.spacing(0),
      top: theme.spacing(2),
      right: theme.spacing(0),
      bottom: theme.spacing(3),
    },
    axisPointer: {
      lineStyle: {
        color: theme.palette.charts.axisPointer,
      },
    },
    tooltip: {
      trigger: 'axis',
      padding: [theme.spacing(0.5), theme.spacing(1)],
      textStyle: {
        ...theme.typography.caption,
        fontSize: 12,
        lineHeight: 16,
      },
      backgroundColor: theme.palette.other.tooltip,
      position: function (point, params, dom, rect, size) {
        const position = { top: 0 };

        if (size.contentSize[0] < size.viewSize[0] - point[0]) {
          position.left = point[0];
        } else {
          position.right = size.viewSize[0] - point[0];
        }
        return position;
      },
      ...(tooltipFormatter ? { formatter: tooltipFormatter } : {}),
    },
    color: [theme.palette.secondary.main],
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        ...theme.typography.charts,
        padding: [theme.spacing(0.5), 0, 0, 0],
        formatter: (v) => {
          const formatted = xAxisFormatter(v);
          return typeof formatted === 'object'
            ? `${formatted.preffix || ''}${formatted.value}${formatted.suffix || ''}`
            : formatted;
        },
      },
      data: dataAxis,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        margin: 0,
        padding: [
          0,
          0,
          theme.typography.charts.fontSize * theme.typography.charts.lineHeight + 4,
          0,
        ],
        show: true,
        showMaxLabel: true,
        showMinLabel: false,
        inside: true,
        color: (value) => {
          // FIXME: Workaround to show only maxlabel
          let col = 'transparent';
          const maxValue = Math.max(...data.map((d) => d || Number.MIN_SAFE_INTEGER));
          if (value > maxValue) {
            col = theme.palette.charts.maxLabel;
          }

          return col;
        },
        ...theme.typography.charts,
        formatter: (v) => {
          const formatted = yAxisFormatter(v);
          return typeof formatted === 'object'
            ? `${formatted.preffix}${formatted.value}${formatted.suffix || ''}`
            : formatted;
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        onZero: false,
        lineStyle: {
          color: theme.palette.charts.axisLine,
        },
      },
    },
  };
}

function __generateSerie(name, data, selectedBars = [], theme) {
  return [
    {
      type: 'bar',
      name,
      data: data.map((value, index) => {
        const bar = { value };
        if (selectedBars.length && !selectedBars.some((i) => i === index)) {
          __disableBar(bar, theme);
        }
        return bar;
      }),
      barCategoryGap: 1,
      barMinWidth: '95%',
      ...(theme
        ? {
            emphasis: {
              itemStyle: {
                color: '#31996b', // FIXME: This color don't appears in carto-theme. Secondary dark is red instead of green. It is correct?
              },
            },
          }
        : {}),
    },
  ];
}

function __disableBar(bar, theme) {
  bar.disabled = true;
  bar.itemStyle = { color: theme.palette.charts.disabled };
}

function __clearFilter(serie) {
  serie.data.forEach((bar) => {
    bar.disabled = false;
    delete bar.itemStyle;
  });
}

function __applyFilter(serie, clickedBarIndex, theme) {
  const anyDisabled = serie.data.find((d) => d.disabled);

  if (!anyDisabled) {
    serie.data.forEach((bar, index) => {
      if (index !== clickedBarIndex) {
        __disableBar(bar, theme);
      }
    });
  } else {
    const clickedData = serie.data[clickedBarIndex];
    clickedData.disabled = !clickedData.disabled;
    if (clickedData.disabled) {
      __disableBar(clickedData, theme);

      const anyActive = serie.data.find((d) => !d.disabled);

      if (!anyActive) {
        __clearFilter(serie);
      }
    } else {
      delete clickedData.itemStyle;
    }
  }

  return serie;
}

const EchartsWrapper = React.memo(
  ReactEcharts,
  ({ option: optionPrev }, { option: optionNext }) => __dataEqual(optionPrev, optionNext)
);

function HistogramWidgetUI(props) {
  const theme = useTheme();
  const {
    name,
    data = [],
    dataAxis,
    onSelectedBarsChange,
    selectedBars,
    tooltipFormatter,
    xAxisFormatter,
    yAxisFormatter,
    height = theme.spacing(22),
  } = props;

  const classes = useStyles();
  const chartInstance = useRef();
  const options = useMemo(() => {
    const config = __generateDefaultConfig(
      { dataAxis, tooltipFormatter, xAxisFormatter, yAxisFormatter },
      data,
      theme
    );
    const series = __generateSerie(name, data, selectedBars, theme);
    return Object.assign({}, config, { series });
  }, [
    data,
    dataAxis,
    name,
    theme,
    tooltipFormatter,
    xAxisFormatter,
    yAxisFormatter,
    selectedBars,
  ]);

  const clearBars = () => {
    const echart = chartInstance.current.getEchartsInstance();

    const option = echart.getOption();
    const serie = option.series[0];
    __clearFilter(serie);
    echart.setOption(option);
    onSelectedBarsChange({ bars: [], chartInstance });
  };

  const clickEvent = (params) => {
    if (onSelectedBarsChange) {
      const echart = chartInstance.current.getEchartsInstance();

      const option = echart.getOption();
      const serie = option.series[params.seriesIndex];
      __applyFilter(serie, params.dataIndex, theme);
      echart.setOption(option);

      const activeBars = [];
      serie.data.forEach((d, index) => {
        if (!d.disabled) {
          activeBars.push(index);
        }
      });
      onSelectedBarsChange({
        bars: activeBars.length === serie.data.length ? [] : activeBars,
        chartInstance,
      });
    }
  };

  const onEvents = {
    click: clickEvent,
  };

  return (
    <div>
      {onSelectedBarsChange && (
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          className={classes.optionsSelectedBar}
        >
          <Typography variant='caption'>
            {selectedBars && selectedBars.length ? selectedBars.length : 'All'} selected
          </Typography>
          {selectedBars && selectedBars.length > 0 && (
            <Link className={classes.selectAllButton} onClick={() => clearBars()}>
              Clear
            </Link>
          )}
        </Grid>
      )}
      {!!options && (
        <EchartsWrapper
          ref={chartInstance}
          option={options}
          lazyUpdate={true}
          onEvents={onEvents}
          style={{ height }}
        />
      )}
    </div>
  );
}

HistogramWidgetUI.defaultProps = {
  tooltipFormatter: (v) => v,
  xAxisFormatter: (v) => v,
  yAxisFormatter: (v) => v,
  dataAxis: [],
  name: null,
  onSelectedBarsChange: null,
};

HistogramWidgetUI.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  tooltipFormatter: PropTypes.func,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func,
  dataAxis: PropTypes.array,
  name: PropTypes.string,
  onSelectedBarsChange: PropTypes.func,
  height: PropTypes.number,
};

export default HistogramWidgetUI;
