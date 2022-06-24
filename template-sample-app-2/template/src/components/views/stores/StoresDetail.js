import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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
import { WrapperWidgetUI, FormulaWidgetUI, HistogramWidgetUI } from '@carto/react-ui';
import {
  clearFilters,
  updateLayer,
  selectSourceById,
  setViewState,
} from '@carto/react-redux';
import { getStore, getRevenuePerMonth } from 'data/models/storeModel';
import Isochrone from 'components/common/Isochrone';
import { currencyFormatter } from 'utils/formatter';
import { setBottomSheetOpen, setError } from 'store/appSlice';
import storesSource from 'data/sources/storesSource';
import { STORES_LAYER_ID } from 'components/layers/StoresLayer';

const useStyles = makeStyles((theme) => ({
  storeDetail: {
    padding: theme.spacing(3.25, 3),
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

function StoresDetail() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, storesSource.id));
  const [storeDetail, setStoreDetail] = useState(null);
  const [revenuePerMonth, setRevenuePerMonth] = useState(null);

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
    dispatch(
      updateLayer({
        id: STORES_LAYER_ID,
        layerAttributes: { selectedStore: id },
      })
    );

    dispatch(setBottomSheetOpen(true));

    return () => {
      dispatch(
        updateLayer({
          id: STORES_LAYER_ID,
          layerAttributes: { selectedStore: null },
        })
      );
      abortController.abort();
    };
  }, [dispatch, source, id, location.state]);

  // [hygen] Add useEffect

  const navigateToStores = () => {
    dispatch(clearFilters(storesSource.id));
    navigate('/stores');
  };

  return (
    <>
      {revenuePerMonth === null || storeDetail === null ? (
        <Grid
          container
          item
          justifyContent='center'
          alignItems='center'
          style={{ flexGrow: 1 }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid item xs>
          <div className={classes.storeDetail}>
            <Breadcrumbs
              separator={<NavigateNextIcon />}
              aria-label='breadcrumb'
              gutterBottom
            >
              <Link color='inherit' component='button' onClick={navigateToStores}>
                All stores
              </Link>
              <Typography color='textPrimary'>Store detail</Typography>
            </Breadcrumbs>
            <Typography variant='h5' gutterBottom className={classes.title}>
              {storeName(storeDetail)}
            </Typography>
            <Isochrone latLong={storeLatLong} />
          </div>

          <Divider />

          <WrapperWidgetUI title='Total revenue'>
            <FormulaWidgetUI data={storeDetail.revenue} formatter={currencyFormatter} />
          </WrapperWidgetUI>

          <Divider />

          <WrapperWidgetUI title='Revenue per month' isLoading={revenuePerMonth === null}>
            {!!revenuePerMonth && (
              <HistogramWidgetUI
                data={revenuePerMonth.data}
                min={revenuePerMonth.min}
                max={revenuePerMonth.max}
                ticks={revenuePerMonth.ticks}
                xAxisFormatter={currencyFormatter}
                yAxisFormatter={(value) => value + ' months'}
              ></HistogramWidgetUI>
            )}
          </WrapperWidgetUI>

          <Divider />
        </Grid>
      )}
    </>
  );
}

export default StoresDetail;

function storeName(store) {
  return `${store.address}, ${store.city}`.toLowerCase();
}
