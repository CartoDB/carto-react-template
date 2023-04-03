import { Button, Container, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import background404 from 'assets/img/404.svg';
import { ROUTE_PATHS } from 'routes';

const ContainerNotFound = styled(Container)(() => ({
  flex: '1 1 auto',
  display: 'flex',
}));

const GridContentWrapper = styled(Grid)(() => ({
  backgroundImage: `url("${background404}")`,
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  height: '100%',
}));

const GridActionWrapper = styled(Grid)(() => ({
  marginTop: '24px',
}));

export default function NotFound() {
  return (
    <ContainerNotFound>
      <GridContentWrapper
        container
        direction='column'
        spacing={2}
        justifyContent='center'
        alignContent='space-between'
      >
        <Grid item>
          <Typography variant='h5'>Error 404</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h3'>
            Whoops!
            <br />
            You’re lost at sea
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1'>
            The map you’re looking for doesn’t exist.
            <br />
            Use Location Intelligence to find your way home.
          </Typography>
        </Grid>
        <GridActionWrapper item>
          <Link to={ROUTE_PATHS.DEFAULT} component={NavLink} underline='none'>
            <Button variant='contained' color='primary' size='large'>
              Take me home
            </Button>
          </Link>
        </GridActionWrapper>
      </GridContentWrapper>
    </ContainerNotFound>
  );
}
