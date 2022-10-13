import AnimatedNumber, { AnimationOptions } from './AnimatedNumber';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core';

export type FormulaLabels = {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  note?: React.ReactNode;
};

export type FormulaColors = {
  [key in keyof FormulaLabels]?: string;
} & {
  value?: string;
};

export type FormulaProps = {
  data: number[];
  labels?: FormulaLabels[];
  colors?: FormulaColors[];
  animated?: boolean;
  animationOptions?: AnimationOptions;
  formatter?: (n: number) => React.ReactNode;
};

const IDENTITY_FN = (v: number) => v;
const EMPTY_ARRAY = [] as any[];

const useStyles = makeStyles((theme: Theme) => ({
  formulaChart: {},
  formulaGroup: {
    '& + $formulaGroup': {
      marginTop: theme.spacing(2),
    },
  },
  firstLine: {
    margin: 0,
    ...theme.typography.h5,
    fontWeight: Number(theme.typography.fontWeightMedium),
    color: theme.palette.text.primary,
    display: 'flex',
  },
  unit: {
    marginLeft: theme.spacing(0.5),
  },
  unitBefore: {
    marginLeft: 0,
    marginRight: theme.spacing(0.5),
  },
  note: {
    display: 'inline-block',
    marginTop: theme.spacing(0.5),
  },
}));

export function MultipleFormulaWidgetUI({
  data = EMPTY_ARRAY,
  labels = EMPTY_ARRAY,
  colors = EMPTY_ARRAY,
  animated = true,
  animationOptions,
  formatter = IDENTITY_FN,
}: FormulaProps) {
  const theme = useTheme<Theme>();
  const classes = useStyles();

  function getColor(i: number) {
    return colors[i] || {};
  }
  function getLabel(i: number) {
    return labels[i] || {};
  }

  return (
    <div className={classes.formulaChart}>
      {data
        .filter((n) => n !== undefined)
        .map((d, i) => (
          <div className={classes.formulaGroup} key={i}>
            <div className={classes.firstLine}>
              {getLabel(i).prefix ? (
                <Box color={getColor(i).prefix || theme.palette.text.secondary}>
                  <Typography
                    color='inherit'
                    component='span'
                    variant='subtitle2'
                    className={[classes.unit, classes.unitBefore].join(' ')}
                  >
                    {getLabel(i).prefix}
                  </Typography>
                </Box>
              ) : null}
              <Box color={getColor(i).value}>
                <AnimatedNumber
                  value={d || 0}
                  enabled={animated}
                  options={animationOptions}
                  formatter={formatter}
                />
              </Box>
              {getLabel(i).suffix ? (
                <Box color={getColor(i).suffix || theme.palette.text.secondary}>
                  <Typography
                    color='inherit'
                    component='span'
                    variant='subtitle2'
                    className={classes.unit}
                  >
                    {getLabel(i).suffix}
                  </Typography>
                </Box>
              ) : null}
            </div>
            {getLabel(i).note ? (
              <Box color={getColor(i).note}>
                <Typography
                  className={classes.note}
                  color='inherit'
                  variant='caption'
                >
                  {getLabel(i).note}
                </Typography>
              </Box>
            ) : null}
          </div>
        ))}
    </div>
  );
}
