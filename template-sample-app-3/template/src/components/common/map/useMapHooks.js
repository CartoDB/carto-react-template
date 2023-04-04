import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { setViewState } from '@carto/react-redux';
import { DRAW_MODES } from '@carto/react-core';
import { Typography } from '@carto/react-ui';
import { renderToStaticMarkup } from 'react-dom/server';

const TooltipContent = styled('div')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[900],
  transform: `translate(-50%, calc(-100% - ${theme.spacing(2.5)}))`,
}));

const TooltipArrow = styled('div')(({ theme }) => ({
  display: 'block',
  position: 'absolute',
  top: 'calc(100% - 1px)',
  left: '50%',
  width: 0,
  height: 0,
  marginLeft: theme.spacing(-1),
  borderLeft: `${theme.spacing(1)} solid transparent`,
  borderRight: `${theme.spacing(1)} solid transparent`,
  borderTop: `${theme.spacing(1)} solid ${theme.palette.grey[900]}`,
}));

export function useMapHooks() {
  const dispatch = useDispatch();
  const drawingToolMode = useSelector((state) => state.carto.drawingToolMode);
  const drawingToolEnabled = useSelector((state) => state.carto.drawingToolEnabled);

  let isHovering = false;

  const handleViewStateChange = ({ viewState }) => {
    dispatch(setViewState(viewState));
  };

  const handleSizeChange = ({ width, height }) => {
    dispatch(setViewState({ width, height }));
  };

  const handleHover = ({ object }) => (isHovering = !!object);

  const getDrawingToolCursor = () => {
    if (drawingToolEnabled && Object.values(DRAW_MODES).indexOf(drawingToolMode) !== -1) {
      return 'crosshair';
    }
  };

  const handleCursor = ({ isDragging }) => {
    return (
      getDrawingToolCursor() ||
      (isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab')
    );
  };

  const handleTooltip = (info) => {
    // This is a very custom solution, to keep react working with the current deck.gl native tooltip, but other solutions could be done. Check tooltip documentation https://deck.gl/docs/api-reference/core/deck#gettooltip
    function createMarkup() {
      return { __html: info.object.html };
    }

    if (info?.object?.html) {
      return {
        html: renderToStaticMarkup(
          <TooltipContent>
            <Typography
              variant='caption'
              component='div'
              dangerouslySetInnerHTML={createMarkup()}
            />
            <TooltipArrow />
          </TooltipContent>
        ),
        style: {
          padding: 0,
          background: 'none',
        },
      };
    }
  };

  return {
    handleViewStateChange,
    handleSizeChange,
    handleHover,
    handleCursor,
    handleTooltip,
  };
}
