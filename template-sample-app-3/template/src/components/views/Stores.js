import { AggregationTypes } from '@carto/react-core';
import { CategoryWidget, TableWidget } from '@carto/react-widgets';
import { currencyFormatter } from 'utils/formatter';

import { useEffect } from 'react';
import storesSource from 'data/sources/storesSource';
import { STORES_LAYER_ID } from 'components/layers/StoresLayer';
import { useDispatch } from 'react-redux';
import { setError } from 'store/appSlice';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
  setViewState,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
}));

export default function Stores() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 3,
        transitionDuration: 500,
      })
    );

    dispatch(addSource(storesSource));

    dispatch(
      addLayer({
        id: STORES_LAYER_ID,
        source: storesSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(STORES_LAYER_ID));
      dispatch(removeSource(storesSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  const onRevenuePerTypeWidgetError = (error) => {
    dispatch(setError(`Error obtaining revenue per type: ${error.message}`));
  };

  return (
    <Grid container direction='column' className={classes.stores}>
      <Grid item>
        <Typography variant='h5' gutterBottom className={classes.title}>
          Store Analysis
        </Typography>

        <TableWidget
          title='Feature table'
          id='storesTable'
          dataSource={storesSource.id}
          columns={[
            {
              field: 'storetype',
              headerName: 'Store',
            },
            {
              field: 'address',
              headerName: 'Address',
            },
            {
              field: 'revenue',
              headerName: 'Revenue',
              align: 'right',
            },
          ]}
          onError={/* onTableWidgetError */ console.log}
        />

        <Divider />

        <CategoryWidget
          id='revenueByStoreType'
          title='Revenue by store type'
          dataSource={storesSource.id}
          column='storetype'
          operationColumn='revenue'
          operation={AggregationTypes.SUM}
          formatter={currencyFormatter}
          onError={onRevenuePerTypeWidgetError}
        />

        <Divider />
      </Grid>
    </Grid>
  );
}
