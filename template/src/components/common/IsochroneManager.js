import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import { selectOAuthCredentials } from 'config/oauthSlice';
import { launchIsochrone, MODES } from 'lib/sdk';
import React from 'react';
import { useSelector } from 'react-redux';

export default function IsochroneManager(props) {
  // I'm not sure if this should be here or maybe in his parent
  const credentials = useSelector(selectOAuthCredentials);

  const [openIsochroneConfig, setOpenIsochroneConfig] = useState(false)
  const { open = false, latLong, onClose } = props;
  const classes = useStyles();

  const clickLaunchHandle = () => {
    // TODO
    launchIsochrone({
      geom: latLong,
      mode: 'walk',
      range: 5
    }, credentials).then(d => {
      console.log(d)
    })
  }

  return (
    <Grid container direction="column">
      <Button
          onClick={clickLaunchHandle}
          className={classes.launch}
          variant='outlined'
          color='primary'
          disabled={!credentials}
        >
          Launch isochrone
      </Button>
      {
        if ()
      }
      <Grid container direction="row" wrap="nowrap">
        <FormControl className={classes.formControl} size="small">
          <InputLabel id='age-native-simple-label'>Mode</InputLabel>
          <Select labelId='age-native-simple-label' variant='outlined'>
            {Object.values(MODES).map(mode => {
              return <MenuItem key={mode} value={mode}>{mode}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} size="small">
          <InputLabel id='age-native-simple-label'>Distance</InputLabel>
          <Select labelId='age-native-simple-label' variant='outlined'>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    flex: '1',
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    }
  }
}));
