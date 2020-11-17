import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Link,
  Divider,
  SvgIcon,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Alert, AlertTitle, Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body2,
  },

  categoriesWrapper: {
    maxHeight: theme.spacing(40),
    overflow: 'auto',
    padding: theme.spacing(0, 1, 1, 0),
  },

  element: {
    cursor: 'pointer',

    '&$unselected': {
      color: theme.palette.text.disabled,

      '& $progressbar div': {
        backgroundColor: theme.palette.text.disabled,
      },
    },

    '&$rest $progressbar div': {
      backgroundColor: theme.palette.text.disabled,
    },

    '&:hover $progressbar div': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },

  label: {
    fontWeight: theme.typography.fontWeightBold,
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

  skeletonProgressbar: {
    height: theme.spacing(1),
    width: '100%',
    margin: theme.spacing(0.5, 0, 1, 0),
  },

  unselected: {},

  rest: {},

  optionsSelectedBar: {
    marginBottom: theme.spacing(2),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary,
    },

    '& .MuiButton-label': {
      ...theme.typography.caption,
    },
  },

  linkAsButton: {
    ...theme.typography.caption,
    cursor: 'pointer',

    '& + hr': {
      margin: theme.spacing(0, 1),
    },
  },

  searchInput: {
    marginTop: theme.spacing(-0.5),
  },
}));

const REST_CATEGORY = '__rest__';

const SearchIcon = () => (
  <SvgIcon>
    <path
      d='M11,4 C14.8659932,4 18,7.13400675 18,11 C18,12.7003211 17.3937669,14.2590489 16.3856562,15.4718279 L19.4748737,18.5606602 L18.0606602,19.9748737 L14.8998887,16.8138615 C13.7854137,17.5629194 12.4437497,18 11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 Z M11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 Z'
      id='-↳Color'
      fill='inherit'
    ></path>
  </SvgIcon>
);

function CategoryWidgetUI(props) {
  const { data, formatter, labels, loading, maxItems, order, selectedCategories } = props;
  const [sortedData, setSortedData] = useState([]);
  const [maxValue, setMaxValue] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [blockedCategories, setBlockedCategories] = useState([]);
  const [tempBlockedCategories, setTempBlockedCategories] = useState(false);
  const classes = useStyles();

  const handleCategorySelected = (category) => {
    if (category !== REST_CATEGORY) {
      let categories;

      if (selectedCategories.indexOf(category) < 0) {
        categories = [...selectedCategories, category];
      } else {
        categories = selectedCategories.filter((c) => c !== category);
      }

      if (props.onSelectedCategoriesChange) {
        props.onSelectedCategoriesChange(categories);
      }
    }
  };

  const handleClearClicked = () => {
    props.onSelectedCategoriesChange([]);
  };

  const handleUnblockClicked = () => {
    props.onSelectedCategoriesChange([]);
    setBlockedCategories([]);
  };

  const handleBlockClicked = () => {
    setBlockedCategories([...selectedCategories]);
  };

  const handleApplyClicked = () => {
    props.onSelectedCategoriesChange([...tempBlockedCategories]);
    setBlockedCategories([...tempBlockedCategories]);
    setTempBlockedCategories([]);
    setShowAll(false);
    setSearchValue('');
  };

  const handleCancelClicked = () => {
    setSearchValue('');
    setShowAll(false);
  };

  const handleCategoryBlocked = (category) => {
    if (category !== REST_CATEGORY) {
      let categories;

      if (tempBlockedCategories.indexOf(category) < 0) {
        categories = [...tempBlockedCategories, category];
      } else {
        categories = tempBlockedCategories.filter((c) => c !== category);
      }

      setTempBlockedCategories(categories);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleShowAllCategoriesClicked = () => {
    setShowAll(true);
    setTempBlockedCategories([...selectedCategories]);
  };

  const compressList = useCallback(
    (list) => {
      if (!showAll) {
        // Showing top or selected categories
        if (!blockedCategories.length) {
          const main = list.slice(0, maxItems);
          if (main.length < list.length) {
            const rest = list.slice(maxItems).reduce(
              (acum, elem) => {
                acum.value += elem.value;
                return acum;
              },
              { category: REST_CATEGORY, value: 0 }
            );
            return [...main, rest];
          } else {
            return main;
          }

          // Showing only blocked categories
        } else {
          const main = blockedCategories.reduce((acum, category) => {
            const categoryElem = list.find((elem) => elem.category === category);
            acum.push({
              category,
              value: categoryElem ? categoryElem.value : null,
            });
            return acum;
          }, []);
          return main;
        }

        // Showing all categories to block
      } else {
        return searchValue
          ? list.filter((elem) =>
              elem.category.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
              labels[elem.category]
                ? labels[elem.category]
                    .toLowerCase()
                    .indexOf(searchValue.toLowerCase()) !== -1
                : false
            )
          : list;
      }
    },
    [blockedCategories, labels, maxItems, searchValue, showAll]
  );

  const getCategoryLabel = useCallback(
    (category) => {
      if (category === REST_CATEGORY) {
        return 'Others';
      } else {
        return labels[category] || category;
      }
    },
    [labels]
  );

  const getProgressbarLength = useCallback(
    (value) => {
      return value >= maxValue
        ? value != null
          ? '100%'
          : 0
        : `${(value || 0 * 100) / maxValue}%`;
    },
    [maxValue]
  );

  useEffect(() => {
    if (data) {
      // Ranking
      if (order === CategoryWidgetUI.ORDER_TYPES.RANKING) {
        const sorted = [...data].sort((a, b) => b.value - a.value);
        const compressed = compressList(sorted);
        compressed.length ? setMaxValue(compressed[0].value) : setMaxValue(1);
        setSortedData(compressed);

        // Fixed order
      } else if (order === CategoryWidgetUI.ORDER_TYPES.FIXED) {
        setMaxValue(
          Math.max.apply(
            Math,
            data.map((e) => e.value)
          )
        );
        const compressed = compressList(data);
        setSortedData(compressed);
      }
    }
  }, [
    blockedCategories,
    compressList,
    data,
    labels,
    maxItems,
    order,
    searchValue,
    showAll,
  ]);

  // Separated to simplify the widget layout but inside the main component to avoid passing all dependencies
  const CategoryItem = (props) => {
    const { data, onCategoryClick } = props;
    const value = formatter(data.value || 0);

    return (
      <Grid
        container
        direction='row'
        spacing={1}
        onClick={onCategoryClick}
        className={`
          ${classes.element}
          ${
            !showAll &&
            selectedCategories.length > 0 &&
            selectedCategories.indexOf(data.category) === -1
              ? classes.unselected
              : ''
          }
          ${data.category === REST_CATEGORY ? classes.rest : ''}
        `}
      >
        {showAll && (
          <Grid item>
            <Checkbox checked={tempBlockedCategories.indexOf(data.category) !== -1} />
          </Grid>
        )}
        <Grid container item xs>
          <Grid container item direction='row' justify='space-between'>
            <span className={classes.label}>{getCategoryLabel(data.category)}</span>
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
            <div style={{ width: getProgressbarLength(data.value) }}></div>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const CategoryItemSkeleton = () => (
    <React.Fragment>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        className={classes.optionsSelectedBar}
      >
        <Typography variant='caption'>
          <Skeleton variant='text' width={100} />
        </Typography>
      </Grid>
      <Grid container item className={classes.categoriesWrapper}>
        {[...Array(4)].map((e, i) => (
          <Grid key={i} container direction='row' spacing={1} className={classes.element}>
            <Grid container item xs>
              <Grid container item direction='row' justify='space-between'>
                <Typography variant='body2'>
                  <Skeleton variant='text' width={100} />
                </Typography>
                <Typography variant='body2'>
                  <Skeleton variant='text' width={70} />
                </Typography>
              </Grid>
              <Skeleton variant='text' className={classes.skeletonProgressbar} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      {data && (data.length > 0 || !loading) ? (
        <React.Fragment>
          {sortedData.length > 0 && (
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
              {showAll ? (
                <Link className={classes.linkAsButton} onClick={handleApplyClicked}>
                  Apply
                </Link>
              ) : blockedCategories.length > 0 ? (
                <Link className={classes.linkAsButton} onClick={handleUnblockClicked}>
                  Unblock
                </Link>
              ) : (
                selectedCategories.length > 0 && (
                  <Grid container direction='row' justify='flex-end' spacing={1} item xs>
                    <Link className={classes.linkAsButton} onClick={handleBlockClicked}>
                      Block
                    </Link>
                    <Divider orientation='vertical' flexItem />
                    <Link className={classes.linkAsButton} onClick={handleClearClicked}>
                      Clear
                    </Link>
                  </Grid>
                )
              )}
            </Grid>
          )}
          {data.length > maxItems && showAll && (
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
              className={classes.optionsSelectedBar}
            >
              <TextField
                size='small'
                placeholder='Search'
                onChange={handleSearchChange}
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
          <Grid container item className={classes.categoriesWrapper}>
            {sortedData.length
              ? sortedData.map((d, i) => (
                  <CategoryItem
                    key={i}
                    data={d}
                    onCategoryClick={() =>
                      showAll
                        ? handleCategoryBlocked(d.category)
                        : handleCategorySelected(d.category)
                    }
                  />
                ))
              : data.length === 0 && (
                  <Alert severity='warning'>
                    <AlertTitle>NO DATA AVAILABLE</AlertTitle>
                    There are no results for the combination of filters applied to your
                    data. Try tweaking your filters, or zoom and pan the map to adjust the
                    Map View.
                  </Alert>
                )}
          </Grid>
          {data.length > maxItems ? (
            showAll ? (
              <Button size='small' color='primary' onClick={handleCancelClicked}>
                Cancel
              </Button>
            ) : (
              <Button
                size='small'
                color='primary'
                onClick={handleShowAllCategoriesClicked}
              >
                Search in {data.length - maxItems} elements
              </Button>
            )
          ) : null}
        </React.Fragment>
      ) : (
        <CategoryItemSkeleton />
      )}
    </div>
  );
}

CategoryWidgetUI.ORDER_TYPES = {
  RANKING: 'ranking',
  FIXED: 'fixed',
};

CategoryWidgetUI.defaultProps = {
  data: null,
  formatter: (v) => v,
  labels: {},
  loading: false,
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
  ),
  formatter: PropTypes.func,
  labels: PropTypes.object,
  loading: PropTypes.bool,
  maxItems: PropTypes.number,
  selectedCategories: PropTypes.array,
  onSelectedCategoriesChange: PropTypes.func,
  order: PropTypes.oneOf(Object.values(CategoryWidgetUI.ORDER_TYPES)),
};

export default CategoryWidgetUI;
