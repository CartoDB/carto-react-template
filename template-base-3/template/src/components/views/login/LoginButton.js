import { useState } from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as CartoIcon } from 'assets/img/icon-carto-symbol.svg';
import SvgIcon from '@mui/material/SvgIcon';
import { useAuth0 } from '@auth0/auth0-react';

const GridLoginButton = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(9),
}));

export default function LoginButton() {
  const [loading, setLoading] = useState(false);
  const { loginWithRedirect } = useAuth0();

  const logInWithCarto = () => {
    setLoading(true);
    loginWithRedirect();
  };

  return (
    <GridLoginButton item>
      <Button
        variant='contained'
        color='secondary'
        size='large'
        onClick={logInWithCarto}
        startIcon={
          loading ? (
            <CircularProgress size={24} />
          ) : (
            <SvgIcon component={CartoIcon}></SvgIcon>
          )
        }
      >
        Login with CARTO
      </Button>
    </GridLoginButton>
  );
}
