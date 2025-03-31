import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        py: 6
      }}
    >
      <CircularProgress />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
