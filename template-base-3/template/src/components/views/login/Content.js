import { Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginButton from './LoginButton';

const GridContent = styled(Grid)(({ theme }) => ({
  flexDirection: 'column',

  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(12),
  },
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(7),
  },
}));

const GridSubtitle = styled(Grid)(({ theme }) => ({
  color: theme.palette.common.white[60],
}));

const GridTitle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.common.white,
}));

const GridDescription = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxWidth: 485,
  color: theme.palette.common.white,
}));

const GridContact = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.common.white,
}));

export default function Content() {
  return (
    <GridContent item container>
      <GridSubtitle item>
        <Typography variant='subtitle1' color='inherit'>
          CARTO APPS
        </Typography>
      </GridSubtitle>

      <GridTitle item>
        <Typography variant='h3' color='inherit'>
          React Demo
        </Typography>
      </GridTitle>

      <GridDescription item>
        <Typography variant='h5' color='inherit'>
          Discover the power of developing with CARTO for React library
        </Typography>
      </GridDescription>

      <LoginButton />

      <GridContact item>
        <Typography variant='caption' color='inherit'>
          Don't have an account yet?{' '}
        </Typography>
        <Link variant='caption' href='https://carto.com' target='_blank' color='inherit'>
          Contact
        </Link>
      </GridContact>
    </GridContent>
  );
}
