import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Divider, IconButton, Typography, Link } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';

// CARTO imports
import {
  WrapperWidgetUI,
  FormulaWidgetUI,
  HistogramWidgetUI,
} from '@carto/react-airship-ui';
import {
  selectSourceById,
  setViewState,
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from 'config/cartoSlice';
import { getStore, getRevenuePerMonth } from 'models/StoreModel';
import { currencyFormatter } from 'lib/sdk';
import { SOURCE_ID, LAYER_ID, MONTHS_LABELS } from './constants';

export default function StoresDetail() {
  const [storeDetail, setStoreDetail] = useState(null);
  const [revenuePerMonth, setRevenuePerMonth] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const source = useSelector((state) => selectSourceById(state, 'storesSource'));
  const navigate = useNavigate();

  const classes = useStyles();

  const histogramData = (revenuePerMonth || []).map((month) => ({
    value: month.revenue,
    tick: month.date,
  }));

  const tooltipFormatter = ([serie]) => {
    const formattedValue = currencyFormatter(serie.value);
    return `${formattedValue.unit}${formattedValue.value}`;
  };

  useEffect(() => {
    dispatch(addLayer({ id: LAYER_ID, source: SOURCE_ID, selectedStore: id }));

    dispatch(
      addSource({
        id: SOURCE_ID,
        data:
          'SELECT store_id, zip, storetype, state, revenue, the_geom_webmercator FROM mcdonalds',
      })
    );

    // Clean up when leave
    return function cleanup() {
      // mounted = false;
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(SOURCE_ID));
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!source) return;
    const { credentials } = source;

    // Get store detail
    getStore({ id, credentials }).then((store) => {
      const { latitude, longitude } = store;
      dispatch(setViewState({ latitude, longitude, zoom: 12, transitionDuration: 500 }));
      setStoreDetail(store);
    });

    // Get reveneue per month
    getRevenuePerMonth({ id, credentials }).then(setRevenuePerMonth);
  }, [dispatch, source, id]);

  if (revenuePerMonth === null || storeDetail === null) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <IconButton onClick={() => navigate('/stores')} className={classes.closeDetail}>
        <CloseIcon />
      </IconButton>

      <div className={classes.storeDetail}>
        <Breadcrumbs
          separator={<NavigateNextIcon />}
          aria-label='breadcrumb'
          gutterBottom
        >
          <Link color='inherit' href='/stores'>
            All stores
          </Link>
          <Typography color='textPrimary'>Store detail</Typography>
        </Breadcrumbs>
        <Typography variant='h5' gutterBottom>
          {storeName(storeDetail)}
        </Typography>
      </div>

      <Divider />

      <WrapperWidgetUI title='Total revenue'>
        <FormulaWidgetUI formatter={currencyFormatter} data={storeDetail.revenue} />
      </WrapperWidgetUI>

      <Divider />

      <WrapperWidgetUI title='Revenue per month'>
        <HistogramWidgetUI
          name='Store'
          data={histogramData}
          dataAxis={MONTHS_LABELS}
          tooltipFormatter={tooltipFormatter}
        ></HistogramWidgetUI>
      </WrapperWidgetUI>
    </div>
  );
}

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
  storesTable: {
    '& th, td': {
      padding: 8,
      borderColor: 'rgba(44, 48, 50, 0.05)',
    },
  },
  nearestDistance: {
    color: theme.palette.customGrey[500],
    whiteSpace: 'nowrap',
  },
}));

function storeName(store) {
  return `${store.address}, ${store.city}`;
}
