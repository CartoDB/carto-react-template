import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import animateValue from '../utils/animateValue';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.h5,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
  },
  unit: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(0.5),

    '&$before': {
      marginLeft: 0,
      marginRight: theme.spacing(0.5),
    },
  },
  before: {},
}));

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function FormulaWidgetUI(props) {
  const classes = useStyles();
  const { data, formatter } = props;
  const [value, setValue] = useState('-');
  const prevValue = usePrevious(value);

  useEffect(() => {
    if (typeof data === 'number') {
      animateValue(prevValue, data, 500, (val) => setValue(val));
    } else if (
      typeof data === 'object' &&
      data != null &&
      data.value !== null &&
      data.value !== undefined
    ) {
      animateValue(prevValue.value, data.value, 1000, (val) =>
        setValue({ value: val, unit: data.preffix })
      );
    } else {
      setValue(data);
    }
    // eslint-disable-next-line
  }, [data, setValue]);

  const formattedValue = formatter(value);

  return (
    <Box className={classes.root}>
      {typeof formattedValue === 'object' && formattedValue !== null ? (
        <span>
          <span className={`${classes.unit} ${classes.before}`}>
            {formattedValue.preffix}
          </span>
          {formattedValue.value}
          <span className={classes.suffix}>{formattedValue.suffix}</span>
        </span>
      ) : (
        <span>{formattedValue}</span>
      )}
    </Box>
  );
}

FormulaWidgetUI.defaultProps = {
  data: '-',
  formatter: (v) => v,
  unitBefore: false,
};

FormulaWidgetUI.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      unit: PropTypes.string,
    }),
  ]),
  unitBefore: PropTypes.bool,
  formatter: PropTypes.func,
};

export default FormulaWidgetUI;
