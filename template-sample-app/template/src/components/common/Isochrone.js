import React, { useCallback, useEffect, useState } from 'react';

import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { getIsochrone, MODES, RANGES } from 'models/IsochroneModel';

import { addLayer, removeLayer, selectOAuthCredentials } from '@carto/react/redux';
import { setError, setIsolineResult } from 'config/appSlice';

const useStyles = makeStyles((theme) => ({
  launch: {
    marginTop: theme.spacing(1.5),
  },
  formWrapper: {
    padding: theme.spacing(1, 0, 0),
  },
  delete: {
    cursor: 'pointer',
  },
  divider: {
    margin: theme.spacing(1, 0, 4.5),
  },
  formControl: {
    flex: '1',
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
}));

export function Isochrone(props) {
  const dispatch = useDispatch();
  const oauthCredentials = useSelector(selectOAuthCredentials);
  const globalCredentials = useSelector((state) => state.carto.credentials);
  const credentials = oauthCredentials || globalCredentials;

  const [openIsochroneConfig, setOpenIsochroneConfig] = useState(false);
  const [selectedMode, setSelectedMode] = useState(MODES.CAR);
  const [selectedRange, setSelectedRange] = useState(RANGES.TEN);
  const { latLong } = props;
  const classes = useStyles();

  const handleChangeMode = ({ target }) => {
    setSelectedMode(target.value);
  };

  const handleChangeRange = ({ target }) => {
    setSelectedRange(target.value);
  };

  const updateIsochrone = useCallback(
    (isochrone) => {
      dispatch(setIsolineResult(isochrone));
    },
    [dispatch]
  );

  const clickCalculateHandle = () => {
    const open = !openIsochroneConfig;
    setOpenIsochroneConfig(open);

    if (!open) {
      updateIsochrone(null);
    }
  };

  useEffect(() => {
    dispatch(
      addLayer({
        id: 'isolineLayer',
      })
    );

    return function cleanup() {
      dispatch(removeLayer('isolineLayer'));
    };
  }, [dispatch]);

  useEffect(() => {
    const abortController = new AbortController();

    const handleCalculateIsochrone = async () => {
      try {
        const isochrone = await getIsochrone({
          credentials,
          geom: latLong,
          mode: selectedMode,
          range: selectedRange,
          opts: { abortController },
        });
        updateIsochrone(isochrone);
      } catch (error) {
        if (error.name === 'AbortError') return;

        dispatch(setError(`Isochrone error: ${error.message}`));
      }
    };

    if (openIsochroneConfig && selectedMode && selectedRange) {
      handleCalculateIsochrone();
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [
    dispatch,
    updateIsochrone,
    credentials,
    openIsochroneConfig,
    selectedMode,
    selectedRange,
    latLong,
  ]);

  return (
    <Grid container direction='column'>
      {!openIsochroneConfig ? (
        <Button
          className={classes.launch}
          onClick={clickCalculateHandle}
          variant='outlined'
          color='primary'
        >
          Calculate area of interest
        </Button>
      ) : (
        <Grid className={classes.formWrapper}>
          <Grid container justify='space-between' alignItems='center'>
            <Typography variant='subtitle2'>Isochrone</Typography>
            <Link
              className={classes.delete}
              variant='caption'
              onClick={clickCalculateHandle}
            >
              Delete
            </Link>
          </Grid>
          <Divider className={classes.divider} />
          <Grid>
            <Grid container direction='row' wrap='nowrap'>
              <FormControl className={classes.formControl} size='small'>
                <InputLabel id='mode-label'>Mode</InputLabel>
                <Select
                  labelId='mode-label'
                  value={selectedMode}
                  onChange={handleChangeMode}
                  variant='outlined'
                >
                  {Object.values(MODES).map((mode) => {
                    return (
                      <MenuItem key={mode} value={mode}>
                        {mode}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} size='small'>
                <InputLabel id='distance-label'>Distance</InputLabel>
                <Select
                  labelId='distance-label'
                  value={selectedRange}
                  onChange={handleChangeRange}
                  variant='outlined'
                >
                  {Object.entries(RANGES).map(([key, range]) => {
                    return (
                      <MenuItem key={key} value={range}>
                        {range} min.
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
