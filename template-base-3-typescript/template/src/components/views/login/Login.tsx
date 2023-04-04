import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as CartoLogoNegative } from 'assets/img/carto-logo-negative.svg';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import { RootState } from 'store/store';
import Content from './Content';

const GridLogin = styled(Grid)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: theme.palette.primary.main,
  height: '100%',

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 28, 0),
  },

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 5, 0),
  },
}));

const GridFooter = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  color: theme.palette.common.white,
}));

export default function Login() {
  const accessToken = useSelector(
    (state: RootState) => state.carto.credentials.accessToken,
  );

  if (accessToken) {
    return <Navigate to={ROUTE_PATHS.DEFAULT} />;
  }

  return (
    <GridLogin container>
      <Grid item>
        <CartoLogoNegative />
      </Grid>

      <Content />

      <GridFooter item>
        <Typography variant='caption' color='inherit'>
          &copy; CARTO 2023
        </Typography>
      </GridFooter>
    </GridLogin>
  );
}
