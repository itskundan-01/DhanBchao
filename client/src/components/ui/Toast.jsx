import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { clearToast } from '../../redux/actions/uiActions';

/**
 * Toast component that displays notifications
 * Uses MUI Snackbar and Alert components
 */
const Toast = () => {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector(state => state.ui.toast);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(clearToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={type || 'info'} 
        variant="filled" 
        elevation={6}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
