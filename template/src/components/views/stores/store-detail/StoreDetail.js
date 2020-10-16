import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Divider, Typography } from '@material-ui/core';
import { selectSourceById, setViewState, addLayer } from 'config/cartoSlice';
import { getStore, getRevenuePerMonth, getNearest } from 'models/StoreModel';

function StoreDetail(props) {
  const [storeDetail, setStoreDetail] = useState([]);
  const [revenuePerMonth, setRevenuePerMonth] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const source = useSelector((state) => selectSourceById(state, 'storesSource'));

  useEffect(() => {
    let mounted = true;

    if (source) {
      // Highlight the selected store
      dispatch(
        addLayer({ id: 'storesLayer', source: 'storesSource', selectedStore: id })
      );

      const { credentials } = source;

      getStore({ id, credentials }).then((store) => {
        if (mounted) {
          const { latitude, longitude } = store;
          dispatch(
            setViewState({ latitude, longitude, zoom: 12, transitionDuration: 500 })
          );
          setStoreDetail(store);
        }
      });

      getRevenuePerMonth({ id, credentials }).then((data) => {
        if (mounted) {
          setRevenuePerMonth(data);
        }
      });

      // Search 3 nearest in a maximum radius of 50KM (based on mercator meters, acurracy will vary on latitudes because of mercator projection)
      const maxDistance = 50000;
      const limit = 3;
      getNearest({ id, maxDistance, limit, credentials }).then((data) => {
        console.log(data);
      });
    }

    return function cleanup() {
      mounted = false;
    };
  }, [dispatch, source, id]);

  return (
    <div>
      <Typography variant='h6'>Store detail</Typography>
      {JSON.stringify(storeDetail)}
      <Divider />
      <Typography variant='h6'>
        Store revenue per month, with the average per month of all stores
      </Typography>
      {JSON.stringify(revenuePerMonth)}
    </div>
  );
}

export default StoreDetail;
