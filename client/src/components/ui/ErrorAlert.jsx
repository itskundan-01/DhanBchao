import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

const ErrorAlert = ({ error }) => {
  // Don't render if there's no error
  if (!error) return null;

  return (
    <Box sx={{ my: 2 }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {typeof error === 'string' ? error : 'An unexpected error occurred.'}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
