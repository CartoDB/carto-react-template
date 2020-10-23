import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { selectSourceById, setViewState, addLayer } from 'config/cartoSlice';
import { getStore, getRevenuePerMonth, getNearest } from 'models/StoreModel';
import { currencyFormatter } from 'utils/numberFormatters';
import ReactEcharts from 'echarts-for-react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Breadcrumbs,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import { WrapperWidgetUI, FormulaWidgetUI } from 'lib/react-ui';

const useStyles = makeStyles((theme) => ({
  closeDetail: {
    position: 'absolute',
    top: 14,
    right: 14,
    color: theme.palette.primary.main,
  },
  storeDetail: {
    paddingTop: 26,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 26,
  },
  breadCrumbs: {
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: 0.25,
    fontFamily: theme.typography.body1.fontFamily,
  },
  inactiveCrumb: {
    fontSize: 14,
    color: theme.palette.customGrey[500],
  },
  activeCrumb: {
    fontSize: 14,
    color: theme.palette.text.primary,
  },
  storesTable: {
    '& th, td': {
      padding: 8,
      borderColor: 'rgba(44, 48, 50, 0.05)',
    },
  },
  storeName: {
    ...theme.typography.h5,
  },
  nearestStoreLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  nearestDistance: {
    color: theme.palette.customGrey[500],
    whiteSpace: 'nowrap',
  },
  nearestRevenue: {
    color: theme.palette.text.primary,
  },
}));

function StoreDetail() {
  const [storeDetail, setStoreDetail] = useState([]);
  const [revenuePerMonth, setRevenuePerMonth] = useState([]);
  const [nearestStores, setNearestStores] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const source = useSelector((state) => selectSourceById(state, 'storesSource'));
  const navigate = useNavigate();

  const classes = useStyles();

  function goToStores() {
    navigate('/stores');
  }

  function storeName(store) {
    return `${store.address}, ${store.city}`;
  }

  function getChartData() {
    return {
      tooltip: {
        trigger: 'axis',
        position: [0, 0],
      },
      grid: {
        left: 8,
        top: 20,
        right: 8,
        bottom: 60,
      },
      legend: {
        bottom: 0,
        left: 0,
        data: [
          {
            name: 'STORE',
            textStyle: {
              fontSize: 10,
              fontFamily: 'OpenSans, sans-serif',
            },
          },
          {
            name: 'AVERAGE',
            textStyle: {
              fontSize: 10,
              fontFamily: 'OpenSans, sans-serif',
            },
          },
        ],
        backgroundColor: '#f4f4f5',
        itemGap: 15,
        padding: 10,
        borderRadius: 5,
      },
      xAxis: {
        type: 'category',
        data: [
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAY',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'OCT',
          'NOV',
          'DEC',
        ],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 10,
          fontFamily: 'OpenSans, sans-serif',
        },
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          name: 'STORE',
          type: 'bar',
          data: revenuePerMonth.map((month) => month.revenue),
          color: '#47db99',
          barMinWidth: '95%',
        },
        {
          name: 'AVERAGE',
          type: 'line',
          data: revenuePerMonth.map((month) => month.avg),
          symbol: 'none',
          color: '#ff4081',
        },
      ],
    };
  }

  useEffect(() => {
    let mounted = true;

    if (source) {
      // Highlight the selected store
      dispatch(
        addLayer({ id: 'storesLayer', source: 'storesSource', selectedStore: id })
      );

      const { credentials } = source;

      // Get store detail
      getStore({ id, credentials }).then((store) => {
        if (mounted) {
          const { latitude, longitude } = store;
          dispatch(
            setViewState({ latitude, longitude, zoom: 12, transitionDuration: 500 })
          );
          setStoreDetail(store);
        }
      });

      // Get reveneue per month
      getRevenuePerMonth({ id, credentials }).then((data) => {
        if (mounted) {
          setRevenuePerMonth(data);
        }
      });

      // Search 3 nearest in a maximum radius of 50KM (based on mercator meters, acurracy will vary on latitudes because of mercator projection)
      const maxDistance = 50000;
      const limit = 3;
      getNearest({ id, maxDistance, limit, credentials }).then((data) => {
        if (mounted) {
          setNearestStores(data);
        }
      });
    }

    return function cleanup() {
      mounted = false;
    };
  }, [dispatch, source, id]);

  return (
    <div className={classes.root}>
      <IconButton onClick={goToStores} className={classes.closeDetail}>
        <CloseIcon />
      </IconButton>

      <div className={classes.storeDetail}>
        <Breadcrumbs
          className={classes.breadCrumbs}
          separator={<NavigateNextIcon />}
          aria-label='breadcrumb'
          color='inherit'
          gutterBottom
        >
          <Typography className={classes.inactiveCrumb}>All stores</Typography>
          <Typography className={classes.activeCrumb}>Store detail</Typography>
        </Breadcrumbs>

        <Typography className={classes.storeName} gutterBottom>
          {storeName(storeDetail)}
        </Typography>

        {/* {JSON.stringify(storeDetail)} */}
      </div>

      <Divider />

      <WrapperWidgetUI title='Total revenue'>
        <FormulaWidgetUI formatter={currencyFormatter} data={storeDetail.revenue} />
      </WrapperWidgetUI>

      <Divider />

      <WrapperWidgetUI title='Nearest 3 stores'>
        <TableContainer>
          <Table aria-label='table with nearest stores' className={classes.storesTable}>
            <TableBody>
              {nearestStores.map((store) => {
                return (
                  <TableRow key={store.store_id}>
                    <TableCell component='th' scope='row'>
                      <Link
                        to={`/stores/${store.store_id}`}
                        component='button'
                        className={classes.nearestStoreLink}
                      >
                        {storeName(store)}
                      </Link>
                    </TableCell>
                    <TableCell
                      align='right'
                      className={classes.nearestDistance}
                    >{`${Math.round(store.distance / 1000)} km`}</TableCell>
                    <TableCell align='right' className={classes.nearestRevenue}>
                      {currencyFormatter(store.revenue)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </WrapperWidgetUI>

      <Divider />

      <WrapperWidgetUI title='Revenue per month'>
        <ReactEcharts
          option={getChartData()}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: 200 }}
        />
      </WrapperWidgetUI>
    </div>
  );
}

export default StoreDetail;
