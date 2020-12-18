import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { setViewState } from '@carto/react/redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-contained': {
      maxWidth: theme.spacing(4.5),
      minWidth: 'auto',
      backgroundColor: theme.palette.common.white,
      borderRightColor: theme.palette.other.divider,

      '&.Mui-disabled': {
        ...theme.typography.caption,
        color: theme.palette.text.secondary,
        borderRightColor: theme.palette.other.divider,
      },
    },
  },
}));

export function ZoomControl(props) {
  const dispatch = useDispatch();
  const zoomLevel = useSelector((state) => Math.floor(state.carto.viewState.zoom));
  const classes = useStyles();

  const increaseZoom = useCallback(() => {
    dispatch(setViewState({ zoom: zoomLevel + 1 }));
  }, [dispatch, zoomLevel]);

  const decreaseZoom = useCallback(() => {
    dispatch(setViewState({ zoom: zoomLevel - 1 }));
  }, [dispatch, zoomLevel]);

  return (
    <ButtonGroup
      variant='contained'
      color='inherit'
      disableRipple={true}
      className={`${props.className} ${classes.root}`}
    >
      <Button onClick={decreaseZoom} aria-label='Decrease zoom'>
        <RemoveOutlinedIcon />
      </Button>
      <Button disabled>{zoomLevel}</Button>
      <Button onClick={increaseZoom} aria-label='Increase zoom'>
        <AddOutlinedIcon />
      </Button>
    </ButtonGroup>
  );
}
