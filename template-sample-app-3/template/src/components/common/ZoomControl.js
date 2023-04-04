import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { setViewState } from '@carto/react-redux';

const GridZoomControl = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 'auto',
  flexDirection: 'row',
  alignItems: 'center',
}));

const MINIMUN_ZOOM_LEVEL = 0;
const MAXIMUM_ZOOM_LEVEL = 20;

export default function ZoomControl({ className, showCurrentZoom }) {
  const dispatch = useDispatch();
  const zoomLevel = useSelector((state) => Math.floor(state.carto.viewState.zoom));

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
    <GridZoomControl container className={className}>
      <IconButton onClick={decreaseZoom} aria-label='Decrease zoom'>
        <RemoveOutlinedIcon />
      </IconButton>
      <Divider orientation='vertical' flexItem />
      {showCurrentZoom && (
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
      <IconButton onClick={increaseZoom} aria-label='Increase zoom'>
        <AddOutlinedIcon />
      </IconButton>
    </GridZoomControl>
  );
}
