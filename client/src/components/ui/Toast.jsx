import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast } from '../../redux/actions/uiActions';

const Toast = () => {
  const dispatch = useDispatch();
  const { open, message, severity, duration } = useSelector(state => state.ui.toast);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity || 'info'} 
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
