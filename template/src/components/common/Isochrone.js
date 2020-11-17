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
import { selectOAuthCredentials } from 'lib/sdk/slice/oauthSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsochrone, MODES, RANGES } from 'models/IsochroneModel';
import { addLayer, removeLayer } from 'lib/sdk/slice/cartoSlice';

const useStyles = makeStyles((theme) => ({
  launch: {
    marginTop: theme.spacing(1.5),
  },
  formWrapper: {
    padding: theme.spacing(1.5, 2, 0, 2),
  },
  delete: {
    display: 'block',
    cursor: 'pointer',
    marginBottom: theme.spacing(3.5),
  },
  divider: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    flex: '1',
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
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
      // dispatch(setIsolineResult(isochrone));
    },
    []
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
        <Grid>
          <Typography variant='subtitle2'>Isochrone</Typography>
          <Divider className={classes.divider} />
          <Grid className={classes.formWrapper}>
            <Link className={classes.delete} onClick={clickCalculateHandle}>
              <Typography variant='body2'>Delete</Typography>
            </Link>
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
