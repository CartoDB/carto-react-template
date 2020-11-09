import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { geocodeStreetPoint } from 'lib/sdk';

import { selectOAuthCredentials } from 'config/oauthSlice';

import { setViewState } from 'config/cartoSlice';

import { Grid, Paper, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_COUNTRY = ''; // 'SPAIN', 'USA'

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 24,
    padding: 16,
    color: theme.palette.primary.main,
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

export function Geocoder(props) {
  const oauthCredentials = useSelector(selectOAuthCredentials);

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState();
  const [geocodingResult, setGeocodingResult] = useState(null);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (oauthCredentials && e.keyCode === 13) {
      const result = await geocodeStreetPoint(oauthCredentials, {
        searchText,
        country: DEFAULT_COUNTRY,
      });
      if (result) {
        setGeocodingResult(result);

        dispatch(
          setViewState({
            longitude: result.longitude,
            latitude: result.latitude,
            zoom: 16,
            transitionDuration: 500,
          })
        );
      } else {
        setGeocodingResult('No results');
      }
    }
  };

  const classes = useStyles();
  return (
    <Paper className={props.className}>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item className={classes.icon}>
          <SearchIcon />
        </Grid>
        <Grid item className={classes.search}>
          {oauthCredentials ? (
            <TextField
              id='standard-search'
              label='Search address'
              type='search'
              value={searchText}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className={classes.inputSearch}
            />
          ) : (
            <Typography>OAuth required for geocoding!</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
