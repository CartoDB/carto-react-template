import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setBottomSheetOpen } from 'store/appSlice';
import { styled } from '@mui/material/styles';
import { SwipeableDrawer, Fab } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const BottomSheet = styled(SwipeableDrawer, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})(({ isOpen, theme }) => ({
  '& .MuiPaper-root': {
    maxHeight: `calc(100% - ${theme.spacing(6)})`,

    ...(!isOpen && {
      transform: `translateY(calc(100% - ${theme.spacing(12)})) !important`,
      visibility: 'visible !important',
    }),
  },
}));

const BottomSheetContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})(({ isOpen, theme }) => ({
  minHeight: theme.spacing(18),
  overflow: isOpen ? 'auto' : 'hidden',

  '& > *': {
    paddingBottom: theme.spacing(6),
  },
}));

const BottomSheetButton = styled(Fab, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})(({ isOpen, theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(5),
  right: theme.spacing(2),
  zIndex: theme.zIndex.drawer,
  transform: isOpen ? 'translateY(0)' : `translateY(${theme.spacing(3)})`,
  transition: `transform ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms`,
}));

const BottomSheetIcon = styled(ExpandLessIcon, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})(({ isOpen, theme }) => ({
  transform: isOpen ? 'rotate(0)' : 'rotate(180deg)',
}));

export default function MobileContent() {
  const dispatch = useDispatch();
  const bottomSheetOpen = useSelector((state) => state.app.bottomSheetOpen);

  const handleWidgetsDrawerToggle = () => {
    dispatch(setBottomSheetOpen(!bottomSheetOpen));
  };

  return (
    <>
      <BottomSheet
        variant='persistent'
        anchor='bottom'
        open={bottomSheetOpen}
        onOpen={handleWidgetsDrawerToggle}
        onClose={handleWidgetsDrawerToggle}
        PaperProps={{
          elevation: 8,
        }}
        isOpen={bottomSheetOpen}
      >
        <BottomSheetContent isOpen={bottomSheetOpen}>
          <Outlet />
        </BottomSheetContent>
      </BottomSheet>
      <BottomSheetButton
        variant='extended'
        size='small'
        color='default'
        aria-label={bottomSheetOpen ? 'Hide' : 'Show'}
        onClick={handleWidgetsDrawerToggle}
        isOpen={bottomSheetOpen}
      >
        <BottomSheetIcon isOpen={bottomSheetOpen} />
        {bottomSheetOpen ? 'Hide' : 'Show'}
      </BottomSheetButton>
    </>
  );
}
