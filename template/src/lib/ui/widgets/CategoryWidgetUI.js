import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Link, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body2,
  },

  element: {
    cursor: 'pointer',

    '&$unselected': {
      color: theme.palette.text.disabled,

      '& $progressbar div': {
        backgroundColor: theme.palette.text.disabled,
      },
    },

    '&:hover $progressbar div': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },

  label: {
    fontWeight: theme.typography.fontWeightMedium,
  },

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
      backgroundColor: theme.palette.secondary.main,
      transition: `background-color ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms,
                   width ${theme.transitions.easing.sharp} ${theme.transitions.duration.complex}ms`,
    },
  },

  unselected: {},

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

function CategoryWidgetUI(props) {
  const { data, formatter, labels, maxItems, order, selectedCategories } = props;
  const [sortedData, setSortedData] = useState([]);
  const [maxValue, setMaxValue] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const classes = useStyles();

  const categoryClicked = (category) => {
    let categories;

    if (selectedCategories.indexOf(category) < 0) {
      categories = [...selectedCategories, category];
    } else {
      categories = selectedCategories.filter((c) => c !== category);
    }

    if (props.onSelectedCategoriesChange) {
      props.onSelectedCategoriesChange(categories);
    }
  };

  const clearCategories = () => {
    props.onSelectedCategoriesChange([]);
  };

  useEffect(() => {
    if (data && data.length) {
      const compressList = (list) => {
        if (!showAll && list.length > maxItems) {
          const main = list.slice(0, maxItems);
          const rest = list.slice(maxItems).reduce(
            (acum, elem) => {
              acum.value += elem.value;
              return acum;
            },
            { category: 'Others', value: 0 }
          );
          return [...main, rest];
        } else {
          return list;
        }
      };

      if (order === CategoryWidgetUI.ORDER_TYPES.RANKING) {
        const sorted = [...data].sort((a, b) => b.value - a.value);
        const compressed = compressList(sorted);
        setMaxValue(
          Math.max(compressed[0].value, compressed[compressed.length - 1].value)
        );
        setSortedData(compressed);
      } else if (order === CategoryWidgetUI.ORDER_TYPES.FIXED) {
        const compressed = compressList(data);
        setMaxValue(
          Math.max.apply(
            Math,
            compressed.map((e) => e.value)
          )
        );
        setSortedData(compressed);
      }
    }
  }, [data, order, maxItems, showAll]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        className={classes.optionsSelectedBar}
      >
        <Typography variant='caption'>
          {selectedCategories.length ? selectedCategories.length : 'All'} selected
        </Typography>
        {selectedCategories.length > 0 && (
          <Link className={classes.selectAllButton} onClick={() => clearCategories()}>
            All
          </Link>
        )}
      </Grid>
      {sortedData.map((d, i) => {
        const value = formatter(d.value || 0);
        return (
          <Grid
            container
            onClick={() => categoryClicked(d.category)}
            key={i}
            className={`${classes.element}
               ${
                 selectedCategories.length > 0 &&
                 selectedCategories.indexOf(d.category) === -1
                   ? classes.unselected
                   : ''
               }`}
          >
            <Grid container item direction='row' justify='space-between'>
              <span className={classes.label}>
                {labels[d.category] ? labels[d.category] : d.category}
              </span>
              {typeof value === 'object' && value !== null ? (
                <span>
                  {value.preffix}
                  {value.value}
                  {value.suffix}
                </span>
              ) : (
                <span>{value}</span>
              )}
            </Grid>
            <Grid item className={classes.progressbar}>
              <div style={{ width: `${((d.value || 0) * 100) / maxValue}%` }}></div>
            </Grid>
          </Grid>
        );
      })}
      {data.length > maxItems ? (
        showAll ? (
          <Button size='small' color='primary' onClick={() => setShowAll(false)}>
            Cancel
          </Button>
        ) : (
          <Button size='small' color='primary' onClick={() => setShowAll(true)}>
            View {data.length - maxItems} elements
          </Button>
        )
      ) : null}
    </div>
  );
}

CategoryWidgetUI.ORDER_TYPES = {
  RANKING: 'ranking',
  FIXED: 'fixed',
};

CategoryWidgetUI.defaultProps = {
  data: [],
  formatter: (v) => v,
  labels: {},
  maxItems: 5,
  order: CategoryWidgetUI.ORDER_TYPES.RANKING,
  selectedCategories: [],
};

CategoryWidgetUI.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      value: PropTypes.number,
    })
  ).isRequired,
  formatter: PropTypes.func,
  labels: PropTypes.object,
  maxItems: PropTypes.number,
  selectedCategories: PropTypes.array,
  onSelectedCategoriesChange: PropTypes.func,
  order: PropTypes.oneOf(Object.values(CategoryWidgetUI.ORDER_TYPES)),
};

export default CategoryWidgetUI;
