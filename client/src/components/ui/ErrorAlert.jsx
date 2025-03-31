import React from 'react';
import { Alert, Box } from '@mui/material';

const ErrorAlert = ({ error }) => {
  return (
    <Box sx={{ my: 3 }}>
      <Alert severity="error" variant="outlined">
        {error || 'An error occurred. Please try again later.'}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
