import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, makeStyles, SvgIcon } from '@material-ui/core';
import { setViewState } from '@carto/react/redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-contained': {
      maxWidth: theme.spacing(4.5),
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

const PlusIcon = (props) => (
  <SvgIcon width='24' height='24' viewBox='0 0 24 24' className={props.className}>
    <path d='m19 13h-6v6h-2v-6h-6v-2h6v-6h2v6h6z' fill='inherit' />
  </SvgIcon>
);

const MinusIcon = (props) => (
  <SvgIcon width='24' height='24' viewBox='0 0 24 24' className={props.className}>
    <path d='m19 13h-14v-2h14z' fill='inherit' />
  </SvgIcon>
);

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
        <MinusIcon />
      </Button>
      <Button disabled>{zoomLevel}</Button>
      <Button onClick={increaseZoom} aria-label='Increase zoom'>
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
}
