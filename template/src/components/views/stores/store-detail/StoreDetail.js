import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectSourceById, setViewState, addLayer } from 'config/cartoSlice';
import { getStore, getRevenuePerMonth, getNearest } from 'models/StoreModel';

import { makeStyles } from '@material-ui/core/styles';
import {
  Breadcrumbs,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { WrapperWidgetUI, FormulaWidgetUI } from '../../../../lib/react-ui';

const useStyles = makeStyles((theme) => ({
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
    color: theme.palette.customGrey[900],
  },
  storesTable: {
    '& th, td': {
      padding: 8,
      borderColor: 'rgba(44, 48, 50, 0.05)',
    },
  },
  storeName: {
    lineHeight: 1.33,
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: 24,
    fontWeight: 600,
    color: theme.palette.customGrey[900],
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
    color: theme.palette.customGrey[900],
  },
}));

function StoreDetail(props) {
  const [storeDetail, setStoreDetail] = useState([]);
  const [revenuePerMonth, setRevenuePerMonth] = useState([]);
  const [nearestStores, setNearestStores] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const source = useSelector((state) => selectSourceById(state, 'storesSource'));

  const classes = useStyles();

  function storeName(store) {
    return `${store.address}, ${store.city}`;
  }

  function formattedRevenue(store) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
    return formatter.format(store.revenue);
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
      <div className={classes.storeDetail}>
        <Breadcrumbs
          className={classes.breadCrumbs}
          separator={<NavigateNextIcon />}
          aria-label='breadcrumb'
          color='inherit'
          gutterBottom
        >
          {/* <Link color='inherit' to='/stores' component={NavLink}>
          All stores
        </Link> */}
          <Typography className={classes.inactiveCrumb}>All stores</Typography>
          <Typography className={classes.activeCrumb}>Store detail</Typography>
        </Breadcrumbs>

        <Typography style={{ fontSize: 24 }} gutterBottom>
          {storeName(storeDetail)}
        </Typography>

        {/* {JSON.stringify(storeDetail)} */}
      </div>
      <Divider />

      <WrapperWidgetUI title='Total revenue'>
        <FormulaWidgetUI data={formattedRevenue(storeDetail)} />
      </WrapperWidgetUI>

      {/* {JSON.stringify(revenuePerMonth)} */}

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
                    <TableCell align='right' lassName={classes.nearestRevenue}>
                      {formattedRevenue(store)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </WrapperWidgetUI>
    </div>
  );
}

export default StoreDetail;
