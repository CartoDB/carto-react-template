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
import React from 'react';

export default function IsochroneManager(props) {
  const { open = false, onClose } = props;
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Paper className={classes.paper}>
        <Typography variant='subtitle1'>Launch isochrone</Typography>
        <Typography variant='body2'>Set the properties</Typography>
        <Grid>
          <FormControl className={classes.formControl}>
            <InputLabel id='age-native-simple-label'>Mode</InputLabel>
            <Select labelId='age-native-simple-label' variant='filled'>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id='age-native-simple-label'>Distance</InputLabel>
            <Select labelId='age-native-simple-label' variant='filled'>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Button variant='text' color='primary' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='contained' color='primary'>
              Ok
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  paper: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    width: 400,
    padding: 24,
  },
}));
