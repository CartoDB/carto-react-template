import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { setViewState } from '@carto/react-redux';
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

  let isHovering = false;

  const handleViewStateChange = ({ viewState }) => {
    dispatch(setViewState(viewState));
  };

  const handleSizeChange = ({ width, height }) => {
    dispatch(setViewState({ width, height }));
  };

  const handleHover = ({ object }) => (isHovering = !!object);
  const handleCursor = ({ isDragging }) =>
    isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';

  const handleTooltip = (info) => {
    // This is a very custom solution, to keep react working with the current deck.gl native tooltip, but other solutions could be done. Check tooltip documentation https://deck.gl/docs/api-reference/core/deck#gettooltip
    function createMarkup() {
      return { __html: info.object.html };
    }

    if (info?.object?.html) {
      return {
        /*
          This is a classic approach to set innerHtml.
          There are other options to consider though as https://deck.gl/docs/developer-guide/interactivity/#using-react
        */
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
        style: info.object.style,
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
