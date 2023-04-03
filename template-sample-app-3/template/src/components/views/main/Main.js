import { lazy } from 'react';
import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const MapContainer = lazy(() =>
  import(/* webpackChunkName: 'map-container' */ 'components/views/main/MapContainer')
);
const Sidebar = lazy(() =>
  import(/* webpackChunkName: 'sidebar' */ 'components/views/main/Sidebar')
);
const ErrorSnackbar = lazy(() =>
  import(/* webpackChunkName: 'error-snackbar' */ 'components/common/ErrorSnackbar')
);

const GridMain = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
  },
}));

export default function Main() {
  // [hygen] Add useEffect

  return (
    <GridMain container direction='row' alignItems='stretch' item xs>
      <LazyLoadComponent>
        <Sidebar />
        <MapContainer />
        <ErrorSnackbar />
      </LazyLoadComponent>
    </GridMain>
  );
}
