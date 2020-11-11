import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { geocodeStreetPoint } from 'lib/sdk';

import { selectOAuthCredentials } from 'config/oauthSlice';
import { addLayer, setError, setGeocoderResult, setViewState } from 'config/cartoSlice';

import { CircularProgress, Grid, Paper, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_COUNTRY = ''; // 'SPAIN', 'USA'

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 24,
    padding: 16,
    color: theme.palette.secondary.text,
  },
  search: {
    paddingLeft: 24,
    width: 'calc(100% - 40px)',
    heigth: 40,
  },
  inputSearch: {
    width: '100%',
  },
}));

export default function GeocoderWidget(props) {
  const oauthCredentials = useSelector(selectOAuthCredentials);
  const credentials = useSelector((state) => state.carto.credentials);
  const getDataServicesCredentials = () => {
    if (oauthCredentials) {
      return oauthCredentials;
    }
    return credentials;
  };

  // Component local state and events handling
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInput = (e) => {
    if (e.target.value === '') {
      updateMarker(null);
    }
  };

  const handleKeyPress = async (e) => {
    const credentials = getDataServicesCredentials();
    if (credentials && e.keyCode === 13) {
      try {
        setLoading(true);
        const result = await geocodeStreetPoint(credentials, {
          searchText,
          country: DEFAULT_COUNTRY,
        });
        if (result) {
          zoomToResult(result);
          updateMarker(result);
        }
      } catch (e) {
        console.log(e);
        handleGeocodeError(e);
      } finally {
        setLoading(false);
      }
    }
  };

  // Actions dispatched
  const dispatch = useDispatch();

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
    dispatch(setError(`Geocoding error: ${error.message}`));
  };

  useEffect(() => {
    // layer to display the geocoded direction marker
    dispatch(
      addLayer({
        id: 'geocoderLayer',
      })
    );
  });

  const classes = useStyles();
  return (
    <Paper className={props.className}>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item className={classes.icon}>
          {loading ? (
            <CircularProgress color='inherit' size={20} />
          ) : (
            <SearchIcon color='inherit' />
          )}
        </Grid>
        <Grid item className={classes.search}>
          {getDataServicesCredentials() ? (
            <TextField
              id='standard-search'
              label='Search address'
              type='search'
              value={searchText}
              onChange={handleChange}
              onInput={handleInput}
              onKeyDown={handleKeyPress}
              className={classes.inputSearch}
            />
          ) : (
            <Typography>Credentials required!</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
