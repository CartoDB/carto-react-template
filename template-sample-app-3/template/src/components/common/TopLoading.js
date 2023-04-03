import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const LinearProgressTopLoading = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: theme.spacing(0.35),
  zIndex: 9999,
}));

export default function TopLoading() {
  return <LinearProgressTopLoading color='secondary' />;
}
