import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { setViewState, ViewState } from '@carto/react-redux';

interface Tooltip {
  layer: any;
  index: number;
  object: any;
  x: number;
  y: number;
  coordinate: number[];
  viewport: any;
}

const useStyles = makeStyles((theme) => ({
  tooltip: {
    '& .content': {
      ...theme.typography.caption,
      position: 'relative',
      padding: theme.spacing(1, 1.5),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
      color: 'rgba(255, 255, 255, 0.75)',
      transform: `translate(-50%, calc(-100% - ${theme.spacing(2.5)}px))`,

      '& .arrow': {
        display: 'block',
        position: 'absolute',
        top: 'calc(100% - 1px)',
        left: '50%',
        width: 0,
        height: 0,
        marginLeft: theme.spacing(-1),
        borderLeft: `${theme.spacing(1)}px solid transparent`,
        borderRight: `${theme.spacing(1)}px solid transparent`,
        borderTop: `${theme.spacing(1)}px solid ${theme.palette.grey[900]}`,
      },
    },
  },
}));

export function useMapHooks() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let isHovering = false;

  const handleViewStateChange = ({ viewState }: { viewState: ViewState }) => {
    dispatch(setViewState(viewState));
  };

  const handleSizeChange = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    dispatch(setViewState({ width, height }));
  };

  const handleHover = ({ object }: { object: Tooltip['object'] }) =>
    (isHovering = !!object);
  const handleCursor = ({ isDragging }: { isDragging: boolean }) =>
    isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';

  const handleTooltip = (info: Tooltip) => {
    if (info?.object) {
      return {
        html: `<div class='content'>${info.object.html}<div class='arrow'></div></div>`,
        className: classes.tooltip,
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
