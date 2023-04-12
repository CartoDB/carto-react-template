import { lazy } from 'react';
import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const MapContainer = lazy(
  () =>
    import(
      /* webpackChunkName: 'map-container' */ 'components/views/main/MapContainer'
    ),
);
const Sidebar = lazy(
  () =>
    import(
      /* webpackChunkName: 'sidebar' */ 'components/views/main/sidebar/Sidebar'
    ),
);
const ErrorSnackbar = lazy(
  () =>
    import(
      /* webpackChunkName: 'error-snackbar' */ 'components/common/ErrorSnackbar'
    ),
);

const GridMain = styled(Grid)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'stretch',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
  },
}));

export default function Main() {
  // [hygen] Add useEffect

  return (
    <GridMain container item xs>
      <LazyLoadComponent>
        <Sidebar />
        <MapContainer />
        <ErrorSnackbar />
      </LazyLoadComponent>
    </GridMain>
  );
}
