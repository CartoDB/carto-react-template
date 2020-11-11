import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import {
  Breadcrumbs,
  CircularProgress,
  Divider,
  IconButton,
  Grid,
  Typography,
  Link,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';

// CARTO imports
import {
  WrapperWidgetUI,
  FormulaWidgetUI,
  HistogramWidgetUI,
} from '@carto/react-airship-ui';
import { selectSourceById, setViewState } from 'config/cartoSlice';
import { getStore, getRevenuePerMonth } from 'models/StoreModel';
import { currencyFormatter } from 'lib/sdk';
import { MONTHS_LABELS } from './constants';

export default function StoresDetail() {
  const [storeDetail, setStoreDetail] = useState(null);
  const [revenuePerMonth, setRevenuePerMonth] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const source = useSelector((state) => selectSourceById(state, 'storesSource'));
  const location = useLocation();
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
    if (!source) return;
    const { credentials } = source;

    // Get store detail
    getStore({ id, credentials }).then((store) => {
      const { latitude, longitude } = store;
      const viewState = { latitude, longitude, transitionDuration: 500 };
      if (!location.state || !location.state.fromStoreList) {
        viewState.zoom = 12;
      }
      dispatch(setViewState(viewState));
      setStoreDetail(store);
    });

    // Get reveneue per month
    getRevenuePerMonth({ id, credentials }).then(setRevenuePerMonth);
  }, [dispatch, source, id, location.state]);

  if (revenuePerMonth === null || storeDetail === null) {
    return (
      <Grid container item justify='center' alignItems='center' style={{ flexGrow: 1 }}>
        <CircularProgress />
      </Grid>
    );
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
          <Link color='inherit' component={NavLink} to='/stores'>
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
    top: theme.spacing(1.75),
    right: theme.spacing(1.75),
    color: theme.palette.primary.main,
  },
  storeDetail: {
    padding: theme.spacing(3.25, 3),
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
  return `${store.address}, ${store.city}`;
}
