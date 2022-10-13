import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from '@material-ui/core';
import EchartsWrapper from './EchartsWrapper';
import { EChartsInstance } from 'echarts-for-react';
import { EChartOption } from 'echarts';
import { lighten } from '@material-ui/core'

function processData(
  data: PieData[],
  colors: string[] = [],
  labels: string[] = [],
  theme: any,
  selectedCategories: string[],
) {
  const isYesNo = labels[0] === 'No' && labels[1] === 'Yes';
  const sorted = isYesNo
    ? data
        .map((d, i) => ({ ...d, originalIndex: i }))
        .slice()
        .reverse()
    : data;
  return sorted.map((item, index) => {
    const isDisabled =
      selectedCategories.length > 0 &&
      selectedCategories.indexOf(item.name) === -1;
    const palette = colors?.length ? colors : theme.palette.qualitative.bold;
    const originalIndex =
      'originalIndex' in item ? (item as any).originalIndex : index;
    return {
      ...item,
      key: item.name,
      itemStyle: {
        color: isDisabled ? lighten(palette[index], 0.8) : palette[index],
      },
      name: labels[originalIndex] || item.name,
    };
  });
}

type TooltipParams = EChartOption.Tooltip.Format & {
  formatter: (a: any) => string;
  isMultiple: boolean;
};

function defaultTooltipFormatter(params: TooltipParams) {
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
  const singleParams = (
    Array.isArray(params) ? params[0] : params
  ) as TooltipParams;
  const data = singleParams.data as PieData;
  const value = params.formatter(data.value);
  const label = params.isMultiple ? singleParams.seriesName : value;
  return `
    <p style="${titleStyle}">${data.name}</p>
    <p style="${valueStyle}">${
    singleParams.marker
  } ${label} (${params.formatter(singleParams.percent)} %)</p>
  `.trim();
}

export type PieData = {
  name: string;
  value: number;
};

export type MultiplePieWidgetUIProps = {
  names: string[];
  data: PieData[][];
  labels?: string[][];
  colors?: string[][];
  height?: string;
  animation?: boolean;
  formatter?: (v: number) => string;
  tooltipFormatter?: (v: TooltipParams) => string;
  selectedCategories?: string[];
  onCategorySelected?: (categories: string[]) => any;
};

const IDENTITY_FN = (v: any) => v;
const EMPTY_ARRAY = [] as any[];

export function MultiplePieWidgetUI({
  names = EMPTY_ARRAY,
  data = EMPTY_ARRAY,
  labels = EMPTY_ARRAY,
  colors = EMPTY_ARRAY,
  height = '260px',
  animation,
  formatter = IDENTITY_FN,
  tooltipFormatter = defaultTooltipFormatter,
  selectedCategories = [],
  onCategorySelected = IDENTITY_FN,
}: MultiplePieWidgetUIProps) {
  const theme = useTheme();
  // const [showLabel, setShowLabel] = useState(false)
  // const [showTooltip, setShowTooltip] = useState(true)
  const showLabel = false;
  const showTooltip = true;
  const chartRef = useRef<any>();

  const processedData = useMemo(() => {
    return data.map((d, i) =>
      processData(d, colors[i], labels[i], theme, selectedCategories),
    );
  }, [data, colors, labels, theme, selectedCategories]);

  const options = useMemo(() => {
    const isMultiple = processedData.length > 1;

    const tooltip = {
      trigger: 'item',
      show: showTooltip,
      backgroundColor: (theme as any).palette.other.tooltip,
      textStyle: { color: theme.palette.common.white },
      confine: true,
      borderWidth: 0,
      formatter:
        !!tooltipFormatter &&
        ((params: EChartOption.Tooltip.Formatter) =>
          tooltipFormatter({
            ...params,
            formatter,
            isMultiple,
          })),
    };

    const legendData = isMultiple
      ? processedData.map((d, i) => names[i])
      : (processedData[0] || []).map((d) => d.name);

    const legend = {
      data: legendData,
      selectedMode: false,
      type: 'scroll',
      left: theme.spacing(1),
      bottom: -theme.spacing(0.5),
      itemGap: theme.spacing(3),
      icon: 'circle',
      itemWidth: theme.spacing(1),
      itemHeight: theme.spacing(1),
      // TODO: as prop?
      // formatter: (name: string) => name.toUpperCase(),
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
    const labelOptions = {
      formatter: ({ name, percent }: { name: string; percent: number }) =>
        `{per|${formatter(percent)}%}\n{b|${name}}`,
      position: 'center',
      rich: {
        b: {
          fontFamily: (theme as any).typography.charts.fontFamily,
          fontSize: theme.spacing(1.75),
          lineHeight: theme.spacing(1.75),
          fontWeight: 'normal',
          color: theme.palette.text.primary,
        },
        per: {
          ...(theme as any).typography.charts,
          fontSize: theme.spacing(3),
          lineHeight: theme.spacing(4.5),
          fontWeight: 600,
          color: theme.palette.text.primary,
        },
      },
    };
    const series = processedData.map((data, i) => ({
      type: 'pie',
      name: names[i],
      itemStyle: data[0]?.itemStyle,
      animation,
      data,
      radius: i === 0 ? ['75%', '90%'] : ['56%', '72%'],
      selectedOffset: 0,
      hoverOffset: 5,
      bottom: theme.spacing(2.5),
      avoidLabelOverlap: true,
      label: { show: showLabel && !isMultiple, ...labelOptions },
      emphasis: {
        label: {
          show: true,
          formatter: labelOptions.formatter,
          rich: labelOptions.rich,
        },
      },
    }));
    const grid = {
      left: theme.spacing(0),
      top: theme.spacing(0),
      right: theme.spacing(0),
      bottom: theme.spacing(0),
    };
    return { grid, tooltip, legend, series };
  }, [
    theme,
    names,
    animation,
    processedData,
    showLabel,
    showTooltip,
    formatter,
    tooltipFormatter,
  ]);

  const onEvents = {
    mouseover: (selected: EChartOption.Tooltip.Format, chart: any) => {
      if (processedData.length === 1) {
        if (selected.seriesIndex !== 0 || selected.dataIndex !== 0) {
          chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: 0,
          });
        }
      }
    },
    mouseout: (selected: EChartOption.Tooltip.Format, chart: any) => {
      if (processedData.length === 1) {
        chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0,
        });
      }
    },
    click: (ev: EChartOption.Tooltip.Format) => {
      const item = processedData[ev.seriesIndex!][ev.dataIndex!];
      const category = item.key;
      const isSelected = selectedCategories.indexOf(category) !== -1;
      const set = new Set(selectedCategories);
      if (isSelected) {
        set.delete(category);
      } else {
        set.add(category);
      }

      const dataLength = processedData[0].length;
      let newCategories = Array.from(set);
      if (newCategories.length === dataLength) {
        newCategories = [];
      }

      onCategorySelected(newCategories);
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.dispatchAction({
        type: processedData.length === 1 ? 'highlight' : 'downplay',
        seriesIndex: 0,
        dataIndex: 0,
      });
    }
  }, [processedData]);

  function onChartReady(chart: EChartsInstance) {
    chartRef.current = chart;
  }

  if (!processedData.length) {
    return null;
  }

  return (
    <EchartsWrapper
      onChartReady={onChartReady}
      notMerge
      option={options}
      onEvents={onEvents}
      style={{ maxHeight: height, width: '100%' }}
    />
  );
}
