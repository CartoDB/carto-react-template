import {
  Box,
  lighten,
  makeStyles,
  Tooltip,
  Typography,
  useTheme,
} from '@material-ui/core';
import { useMemo } from 'react';
import AnimatedNumber, { AnimationOptions } from './AnimatedNumber';

type CategoryData = {
  name: string;
  value: number;
};

export enum ORDER_TYPES {
  RANKING = 'ranking',
  FIXED = 'fixed',
}

const IDENTITY_FN = (v: any) => v;
const EMPTY_ARRAY = [] as any[];

type TransposedCategoryItem = {
  key: string;
  label: string;
  data: { color: string; value: number }[];
};

function transposeData(
  data: CategoryData[][],
  colors: string[],
  labels: string[],
  selectedCategories: string[],
  order: ORDER_TYPES,
) {
  const reference = data[0];
  const transposed = reference.map((item, itemIndex) => {
    const isDisabled =
      selectedCategories.length > 0 &&
      selectedCategories.indexOf(item.name) === -1;

    const label = labels[itemIndex] || item.name;
    const indexData = data.map((group, groupIndex) => ({
      color: isDisabled ? lighten(colors[groupIndex], 0.8) : colors[groupIndex],
      value: group[itemIndex].value,
    }));

    return {
      label,
      key: item.name,
      data: indexData,
    };
  }) as TransposedCategoryItem[];

  // only sort the list if order type is 'RANKING'
  // if order type is 'FIXED' keep the sort order from data
  if (order === ORDER_TYPES.RANKING) {
    transposed.sort((a, b) => {
      const aMax = Math.max(...a.data.map((d) => d.value));
      const bMax = Math.max(...b.data.map((d) => d.value));
      return bMax - aMax;
    });
  }

  return transposed;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2, 0),
  },
  categoriesList: {},
  label: {},
  positive: {},
  negative: {},
  progressbar: {
    height: theme.spacing(0.5),
    width: '100%',
    margin: theme.spacing(0.5, 0, 1, 0),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.action.disabledBackground,

    '& div': {
      width: 0,
      height: '100%',
      borderRadius: theme.spacing(0.5),
      // backgroundColor: theme.palette.secondary.main,
      transition: `background-color ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms,
                   width ${theme.transitions.easing.sharp} ${theme.transitions.duration.complex}ms`,
    },
  },
}));

type MultipleCategoryWidgetUIProps = {
  names: string[];
  data: CategoryData[][];
  labels?: string[];
  maxItems?: number;
  order?: ORDER_TYPES;
  colors?: string[];
  animation?: boolean;
  animationOptions?: AnimationOptions;
  searchable?: boolean;
  filterable?: boolean;
  selectedCategories?: string[];
  onSelectedCategoriesChange?: (categories: string[]) => any;
  formatter?: (v: any) => string;
};

const OTHERS_KEY = 'others';

export function MultipleCategoryWidgetUI({
  names = EMPTY_ARRAY,
  data = EMPTY_ARRAY,
  labels = EMPTY_ARRAY,
  colors,
  maxItems = 5,
  order = ORDER_TYPES.FIXED,
  animation = true,
  animationOptions,
  searchable = true,
  filterable = true,
  selectedCategories = EMPTY_ARRAY,
  onSelectedCategoriesChange = IDENTITY_FN,
  formatter = IDENTITY_FN,
}: MultipleCategoryWidgetUIProps) {
  const classes = useStyles();
  const theme = useTheme();
  const processedData = useMemo(() => {
    const _colors = colors || [
      theme.palette.secondary.main,
      theme.palette.primary.main,
      theme.palette.info.main,
    ];
    return transposeData(data, _colors, labels, selectedCategories, order);
  }, [data, colors, labels, theme, selectedCategories, order]);

  const maxValue = useMemo(() => {
    return Math.max(...data.map((group) => group.map((g) => g.value)).flat());
  }, [data]);

  const compressedData = useMemo(() => {
    const visibleItems = processedData.slice(0, maxItems);
    const otherItems = processedData.slice(maxItems);

    const otherSum = [] as number[];
    for (const item of otherItems) {
      item.data.forEach((d, i) => {
        otherSum[i] = otherSum[i] || 0;
        otherSum[i] += d.value;
      });
    }
    const combinedOther = {
      key: OTHERS_KEY,
      label: 'Others',
      data: otherSum.map((sum) => ({
        value: sum,
        color: theme.palette.divider,
      })),
    };

    return [...visibleItems, combinedOther] as TransposedCategoryItem[];
  }, [processedData, maxItems, theme.palette.divider]);

  return (
    <div className={classes.wrapper}>
      <Box
        display='flex'
        flexDirection='column'
        className={classes.categoriesList}
      >
        {compressedData.map((d) => (
          <CategoryItem
            key={d.key}
            item={d}
            animation={animation}
            animationOptions={animationOptions}
            maxValue={maxValue}
            formatter={formatter}
          />
        ))}
      </Box>
    </div>
  );
}

type CategoryItemProps = {
  item: TransposedCategoryItem;
  animation: boolean;
  animationOptions?: AnimationOptions;
  maxValue: number;
  formatter: MultipleCategoryWidgetUIProps['formatter'];
};

function CategoryItem({
  item,
  animation,
  animationOptions,
  maxValue,
  formatter,
}: CategoryItemProps) {
  const classes = useStyles();
  const theme = useTheme();
  const compareValue = useMemo(() => {
    const reference = item.data[0].value;
    const max = Math.max(...item.data.map((d) => d.value));
    return reference - max;
  }, [item]);

  const valueColor =
    Math.sign(compareValue) === -1
      ? theme.palette.error.main
      : theme.palette.success.main;

  const numberColor =
    item.key === OTHERS_KEY ? theme.palette.text.disabled : valueColor;

  function getProgressbarLength(value: number) {
    return `${Math.min(100, ((value || 0) / maxValue) * 100)}%`;
  }

  return (
    <Box py={1}>
      <Box display='flex' justifyContent='space-between' flexWrap='nowrap'>
        <Tooltip title={item.label}>
          <Typography className={classes.label} variant='body2' noWrap>
            {item.label}
          </Typography>
        </Tooltip>
        <Typography style={{ color: numberColor }} variant='body2'>
          <AnimatedNumber
            value={compareValue || 0}
            enabled={animation}
            options={animationOptions}
            formatter={formatter!}
          />
        </Typography>
      </Box>
      {item.data.map((d, i) => (
        <div key={`${item.key}_${i}`} className={classes.progressbar}>
          <div
            style={{
              backgroundColor: d.color,
              width: getProgressbarLength(d.value),
            }}
          ></div>
        </div>
      ))}
    </Box>
  );
}
