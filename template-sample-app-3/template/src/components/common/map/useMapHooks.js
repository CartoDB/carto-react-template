import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { setViewState } from '@carto/react-redux';
import { DRAW_MODES } from '@carto/react-core';
import { renderToStaticMarkup } from 'react-dom/server';

const TooltipContainer = styled('div')(({ theme }) => ({
  padding: 0,
  background: 'none',

  '& .content': {
    ...theme.typography.caption,
    position: 'relative',
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[900],
    color: 'rgba(255, 255, 255, 0.75)',
    transform: `translate(-50%, calc(-100% - ${theme.spacing(2.5)}))`,

    '& .arrow': {
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
    },
  },
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
    if (info?.object?.html) {
      function createMarkup() {
        return { __html: info.object.html };
      }

      return {
        html: renderToStaticMarkup(
          <TooltipContainer>
            <div className='content'>
              <div dangerouslySetInnerHTML={createMarkup()} />
              <div className='arrow'></div>
            </div>
          </TooltipContainer>
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
