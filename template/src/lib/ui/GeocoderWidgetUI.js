import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';

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

function GeocoderWidgetUI(props) {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInput = (e) => {
    if (e.target.value === '') {
      props.onClear();
    }
  };

  const handleKeyPress = async (e) => {
    if (props.credentials && e.keyCode === 13) {
      try {
        const searchParams = { searchText, ...props.defaultSearchParams };
        setLoading(true);
        const result = await props.geocodingMethod(props.credentials, searchParams);
        props.onResult(result);
      } catch (e) {
        props.onError(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container direction='row' justify='center' alignItems='center'>
      <Grid item className={classes.icon}>
        {loading ? <CircularProgress color='inherit' size={20} /> : <SearchIcon />}
      </Grid>
      <Grid item className={classes.search}>
        {props.credentials ? (
          <TextField
            id='geocoding-standard-search'
            label={props.label || 'Search address'}
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
  );
}

export default GeocoderWidgetUI;
