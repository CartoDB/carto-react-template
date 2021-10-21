import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from 'store/appSlice';

export default function ErrorSnackbar() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.app.error);

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={() => dispatch(setError(null))}
    >
      <Alert severity='error'>{error}</Alert>
    </Snackbar>
  );
}
