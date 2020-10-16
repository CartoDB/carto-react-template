import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Divider, Typography } from '@material-ui/core';
import { selectSourceById, setViewState, addLayer } from 'config/cartoSlice';
import { getStoreDetails, getRevenuePerMonth } from 'models/storeModel';

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

      getStoreDetails({ id, source }).then((store) => {
        if (mounted) {
          const { latitude, longitude } = store;
          dispatch(
            setViewState({ latitude, longitude, zoom: 12, transitionDuration: 500 })
          );
          setStoreDetail(store);
        }
      });

      getRevenuePerMonth({ id, source }).then((data) => {
        if (mounted) {
          setRevenuePerMonth(data);
        }
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
