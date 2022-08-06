import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { setViewState } from '@carto/react-redux';
import { RootState } from 'store/store';

const useStyles = makeStyles((theme) => ({
  zoomControl: {
    backgroundColor: theme.palette.background.paper,
    width: 'auto',
  },
}));

const MINIMUN_ZOOM_LEVEL = 0;
const MAXIMUM_ZOOM_LEVEL = 20;

export default function ZoomControl({
  className,
  showCurrentZoom,
}: {
  className?: string;
  showCurrentZoom?: boolean;
}) {
  const dispatch = useDispatch();
  const zoomLevel = useSelector((state: RootState) =>
    Math.floor(state.carto.viewState.zoom),
  );
  const classes = useStyles();

  const increaseZoom = useCallback(() => {
    const nextZoom = zoomLevel + 1;
    if (nextZoom <= MAXIMUM_ZOOM_LEVEL) {
      dispatch(setViewState({ zoom: nextZoom }));
    }
  }, [dispatch, zoomLevel]);

  const decreaseZoom = useCallback(() => {
    const nextZoom = zoomLevel - 1;
    if (nextZoom >= MINIMUN_ZOOM_LEVEL) {
      dispatch(setViewState({ zoom: nextZoom }));
    }
  }, [dispatch, zoomLevel]);

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      className={`${className} ${classes.zoomControl}`}
    >
      <IconButton
        onClick={decreaseZoom}
        aria-label='Decrease zoom'
        size='large'
      >
        <RemoveOutlinedIcon />
      </IconButton>
      <Divider orientation='vertical' flexItem />
      {showCurrentZoom && (
        // @ts-ignore
        <Box px={1} minWidth={36}>
          <Typography
            display='block'
            align='center'
            color='textSecondary'
            variant='overline'
          >
            {zoomLevel}
          </Typography>
        </Box>
      )}
      <Divider orientation='vertical' flexItem />
      <IconButton
        onClick={increaseZoom}
        aria-label='Increase zoom'
        size='large'
      >
        <AddOutlinedIcon />
      </IconButton>
    </Grid>
  );
}
