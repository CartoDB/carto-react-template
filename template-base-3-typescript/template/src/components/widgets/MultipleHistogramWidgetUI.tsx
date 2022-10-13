import {
  Box,
  Button,
  darken,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { useMemo } from 'react';
import EchartsWrapper from './EchartsWrapper';
import { EChartOption } from 'echarts';

type TooltipParams = EChartOption.Tooltip.Formatter;

export type MultipleHistogramWidgetUIProps = {
  data: number[][];
  labels: string[]; // x axis labels
  names?: string[]; // names of each group of data
  colors?: string[];
  totals?: number[]; // used for percent calculations in tooltips
  height?: string;
  animation?: boolean;
  formatter?: (v: number) => void;
  tooltipFormatter?: (p: TooltipParams, totalValues: number[]) => string;
  filterable?: boolean;
  selectedBars?: number[];
  onSelectedBarsChange?: (bars: number[]) => void;
};

function defaultTooltipFormatter(params: TooltipParams, totalValues: number[]) {
  const titleStyle = `
    font-size: 12px;
    line-height: 1.33;
    font-weight: 600;
    margin: 4px 0 4px 0;
  `;
  const valueStyle = `
    font-size: 12px;
    line-height: 1.33;
    font-weight: normal;
    margin: 0 0 4px 0;
  `;
  const arrParams = Array.isArray(params) ? params : [params];
  const lines = arrParams
    .map((p, i) => {
      const percent = (((p.value as number) / totalValues[i]) * 100).toFixed(2);
      return `<p style="${valueStyle}">${p.marker} ${p.seriesName} (${percent} %)</p>`;
    })
    .join('');

  return `
    <div style="white-space: initial; max-width: 160px">
      <p style="${titleStyle}">${arrParams[0].name}</p>
      ${lines}
    </div>
  `;
}

const useStyles = makeStyles((theme) => ({
  selection: {
    marginBottom: theme.spacing(2),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary,
      lineHeight: '20px',
    },

    '& .MuiButton-label': {
      ...theme.typography.caption,
    },
  },
}));

export function MultipleHistogramWidgetUI({
  labels = [],
  data = [],
  names = [],
  colors = [],
  totals = [],
  animation,
  height = `${22 * 8}px`,
  formatter,
  tooltipFormatter = defaultTooltipFormatter,
  filterable,
  selectedBars,
  onSelectedBarsChange,
}: MultipleHistogramWidgetUIProps) {
  const theme = useTheme();
  const classes = useStyles();
  const maxValue = useMemo(() => {
    const values = data.flat().map((value) => value ?? Number.MIN_SAFE_INTEGER);
    return Math.max(...values);
  }, [data]);
  const totalValues = useMemo(() => {
    return data.map(
      (group, index) =>
        totals[index] || group.reduce((acum, next) => acum + next, 0),
    );
  }, [data, totals]);

  const options = useMemo(() => {
    const isMultiple = !!names[1];
    const grid = {
      left: theme.spacing(0.5),
      top: theme.spacing(2),
      right: theme.spacing(0.5),
      bottom: theme.spacing(isMultiple ? 3 : 0),
      containLabel: true,
    };
    const axisPointer = {
      lineStyle: { color: (theme as any).palette.charts.axisPointer },
    };
    const tooltip = {
      trigger: 'axis',
      padding: [theme.spacing(0.5), theme.spacing(1)],
      borderWidth: 0,
      textStyle: {
        ...theme.typography.caption,
        fontSize: 12,
        lineHeight: 16,
        color: theme.palette.common.white,
      },
      backgroundColor: (theme as any).palette.other.tooltip,
      valueFormatter: formatter,
      formatter: (v: TooltipParams) => tooltipFormatter(v, totalValues),
    };
    const xAxis = {
      type: 'category',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        ...(theme as any).typography.charts,
        padding: [theme.spacing(0.5), 0, 0, 0],
        interval: 0,
      },
      data: labels.filter(Boolean),
    };
    const yAxis = {
      type: 'value',
      axisLabel: {
        margin: 0,
        verticalAlign: 'bottom',
        padding: [0, 0, (theme as any).typography.charts.fontSize, 0],
        show: true,
        showMaxLabel: true,
        showMinLabel: false,
        inside: true,
        color: (value: number) =>
          value >= maxValue
            ? (theme as any).palette.charts.maxLabel
            : 'transparent',
        ...(theme as any).typography.charts,
        formatter,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        onZero: false,
        lineStyle: {
          color: (theme as any).palette.charts.axisLine,
        },
      },
    };
    const _series = data.map((group, groupIndex) => ({
      type: 'bar',
      name: names[groupIndex],
      animation,
      data: group.map((value, i) => {
        const isDisabled =
          selectedBars?.length && selectedBars.indexOf(i) === -1;
        const color = isDisabled
          ? theme.palette.text.disabled
          : colors[groupIndex];
        return { value, itemStyle: { color } };
      }),
      emphasis: {
        itemStyle: {
          color: darken(colors[groupIndex] || '#000', 0.25),
        },
      },
    }));
    const legend = {
      data: data.map((g, i) => names[i]),
      show: isMultiple,
      selectedMode: false,
      type: 'scroll',
      left: theme.spacing(1),
      bottom: -theme.spacing(0.5),
      icon: 'circle',
      itemGap: theme.spacing(3),
      itemWidth: theme.spacing(1),
      itemHeight: theme.spacing(1),
      // TODO: as prop?
      formatter: (name: string) => name.toUpperCase(),
      textStyle: {
        ...(theme as any).typography.charts,
        color: theme.palette.text.primary,
        lineHeight: 1,
        verticalAlign: 'bottom',
        padding: [0, 0, 0, theme.spacing(0.5)],
      },
      inactiveColor: (theme as any).palette.text.disabled,
      pageIcons: {
        horizontal: [
          'path://M15.41 7.41 14 6 8 12 14 18 15.41 16.59 10.83 12z',
          'path://M9 16.59 13.3265857 12 9 7.41 10.3319838 6 16 12 10.3319838 18z',
        ],
      },
      pageIconSize: theme.spacing(1.5),
      pageIconColor: theme.palette.text.secondary,
      pageIconInactiveColor: theme.palette.text.disabled,
      pageTextStyle: {
        fontFamily: (theme as any).typography.charts.fontFamily,
        fontSize: theme.spacing(1.5),
        lineHeight: theme.spacing(1.75),
        fontWeight: 'normal',
        color: theme.palette.text.primary,
      },
    };

    return {
      grid,
      axisPointer,
      color: colors,
      tooltip,
      series: _series,
      xAxis,
      yAxis,
      legend,
    };
  }, [
    theme,
    maxValue,
    totalValues,
    colors,
    names,
    data,
    labels,
    animation,
    formatter,
    tooltipFormatter,
    selectedBars,
  ]);

  const barCount = data?.[0]?.length;
  const events = useMemo(() => {
    function onClick(params: TooltipParams) {
      if (onSelectedBarsChange) {
        const p = Array.isArray(params) ? params[0] : params;
        const index = p.dataIndex;
        const newSelectedBars = new Set(selectedBars);

        const alreadyAdded = newSelectedBars.has(index);
        if (alreadyAdded) {
          newSelectedBars.delete(index);
        } else {
          newSelectedBars.add(index);
        }

        const newBars =
          newSelectedBars.size === barCount ? [] : Array.from(newSelectedBars);
        onSelectedBarsChange(newBars);
      }
    }

    return filterable ? { click: onClick } : undefined;
  }, [onSelectedBarsChange, selectedBars, barCount, filterable]);

  return (
    <div>
      {filterable && (
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          className={classes.selection}
        >
          <Typography variant='caption'>
            {selectedBars?.length ? selectedBars.length : 'All'} selected
          </Typography>
          {selectedBars?.length ? (
            <Button
              size='small'
              variant='text'
              color='primary'
              onClick={() => onSelectedBarsChange?.([])}
            >
              Clear
            </Button>
          ) : null}
        </Box>
      )}
      <EchartsWrapper
        notMerge
        onEvents={events}
        option={options}
        style={{ height }}
      />
    </div>
  );
}
