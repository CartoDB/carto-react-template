import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Breadcrumbs,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  Link,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { WrapperWidgetUI, FormulaWidgetUI, HistogramWidgetUI } from '@carto/react/ui';
import { updateLayer, selectSourceById, setViewState } from '@carto/react/redux';

import { getStore, getRevenuePerMonth } from 'models/StoreModel';
import { LAYER_ID, MONTHS_LABELS } from './constants';
import { Isochrone } from 'components/common/Isochrone';
import { currencyFormatter } from 'utils/formatter';
import { setBottomSheetOpen, setError } from 'config/appSlice';

export default function StoresDetail() {
  const [storeDetail, setStoreDetail] = useState(null);
  const [revenuePerMonth, setRevenuePerMonth] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const source = useSelector((state) => selectSourceById(state, 'storesSource'));
  const location = useLocation();

  const classes = useStyles();

  const histogramData = (revenuePerMonth || []).map((month) => month.revenue);

  const tooltipFormatter = ([serie]) => {
    const formattedValue = currencyFormatter(serie.value);
    return `${formattedValue.prefix}${formattedValue.value}`;
  };

  const storeLatLong = useMemo(() => {
    if (!storeDetail) {
      return [];
    }
    return [storeDetail.latitude, storeDetail.longitude];
  }, [storeDetail]);

  useEffect(() => {
    if (!source) return;
    const { credentials } = source;

    const abortController = new AbortController();
    getStore({ id, credentials, opts: { abortController } })
      .then((store) => {
        const { latitude, longitude } = store;
        const viewState = { latitude, longitude, transitionDuration: 500, zoom: 12 };

        dispatch(setViewState(viewState));
        setStoreDetail(store);
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        dispatch(setError(`getStore error: ${error.message}`));
      });

    getRevenuePerMonth({ id, credentials, opts: { abortController } })
      .then(setRevenuePerMonth)
      .catch((error) => {
        if (error.name === 'AbortError') return;
        dispatch(setError(`getRevenuePerMonth error: ${error.message}`));
      });

    // Set selected store on the layer
    dispatch(updateLayer(
      {
        id: LAYER_ID,
        layerAttributes: { selectedStore: id }
      }
    ));

    dispatch(setBottomSheetOpen(true));

    return () => {
      dispatch(updateLayer(
        {
          id: LAYER_ID,
          layerAttributes: { selectedStore: null }
        }
      ));
      abortController.abort();
    };
  }, [dispatch, source, id, location.state]);

  if (revenuePerMonth === null || storeDetail === null) {
    return (
      <Grid container item justify='center' alignItems='center' style={{ flexGrow: 1 }}>
        <CircularProgress />
      </Grid>
    );
  }

  const onTotalRevenueWidgetError = (error) => {
    dispatch(setError(`Error obtaining total revenue: ${error.message}`));
  };

  const onRevenuePerMonthWidgetError = (error) => {
    dispatch(setError(`Error obtaining revenue per month: ${error.message}`));
  };

  return (
    <div>
      <div className={classes.storeDetail}>
        <Breadcrumbs
          separator={<NavigateNextIcon />}
          aria-label='breadcrumb'
          gutterBottom
        >
          <Link color='inherit' component={NavLink} to='/stores'>
            All stores
          </Link>
          <Typography color='textPrimary'>Store detail</Typography>
        </Breadcrumbs>
        <Typography variant='h5' gutterBottom className={classes.title}>
          {storeName(storeDetail)}
        </Typography>
        <Isochrone latLong={storeLatLong}></Isochrone>
      </div>

      <Divider />

      <WrapperWidgetUI title='Total revenue'>
        <FormulaWidgetUI
          formatter={currencyFormatter}
          data={storeDetail.revenue}
          onError={onTotalRevenueWidgetError}
        />
      </WrapperWidgetUI>

      <Divider />

      <WrapperWidgetUI title='Revenue per month'>
        <HistogramWidgetUI
          name='Store'
          data={histogramData}
          dataAxis={MONTHS_LABELS}
          yAxisFormatter={currencyFormatter}
          tooltipFormatter={tooltipFormatter}
          onError={onRevenuePerMonthWidgetError}
        ></HistogramWidgetUI>
      </WrapperWidgetUI>

      <Divider />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  storeDetail: {
    padding: theme.spacing(3.25, 3),

    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(2),
    },
  },
  title: {
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  isochrone: {
    width: '100%',
  },
  storesTable: {
    '& th, td': {
      padding: theme.spacing(1),
      borderColor: theme.palette.action.hover,
    },
  },
  nearestDistance: {
    color: theme.palette.grey[500],
    whiteSpace: 'nowrap',
  },
}));

function storeName(store) {
  return `${store.address}, ${store.city}`.toLowerCase();
}
