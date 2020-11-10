import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { geocodeStreetPoint } from 'lib/sdk';
import { addLayer, setViewState, setGeocoderResult, setError } from 'config/cartoSlice';
import { selectOAuthCredentials } from 'config/oauthSlice';

import { Paper } from '@material-ui/core';
import GeocoderWidgetUI from 'lib/ui/GeocoderWidgetUI'; // TODO extract

export default function GeocoderWidget(props) {
  // credentials for geocoding
  const dataServicesCredentials = useSelector(
    (state) => state.carto.dataServicesCredentials
  );
  const oauthCredentials = useSelector(selectOAuthCredentials);
  const getCredentials = () => {
    if (dataServicesCredentials) return dataServicesCredentials;
    if (oauthCredentials) return oauthCredentials;
    return null;
  };

  const dispatch = useDispatch();
  const handleGeocodeResult = (result) => {
    if (result) {
      zoomToResult(result);
      updateMarker(result);
    } else {
      console.log('No results');
    }
  };

  const zoomToResult = (result) => {
    dispatch(
      setViewState({
        longitude: result.longitude,
        latitude: result.latitude,
        zoom: 16,
        transitionDuration: 500,
      })
    );
  };

  const updateMarker = (result) => {
    dispatch(setGeocoderResult(result));
  };

  const handleGeocodeError = (error) => {
    dispatch(setError(error));
  };

  useEffect(() => {
    // layer to display the geocoded direction marker
    dispatch(
      addLayer({
        id: 'geocoderLayer',
      })
    );
  });

  // { country: 'USA'}
  return (
    <Paper className={props.className}>
      <GeocoderWidgetUI
        credentials={getCredentials()}
        geocodingMethod={geocodeStreetPoint}
        defaultSearchParams={{ country: 'Spain' }}
        onResult={handleGeocodeResult}
        onClear={() => updateMarker(null)}
        onError={handleGeocodeError}
      />
    </Paper>
  );
}
