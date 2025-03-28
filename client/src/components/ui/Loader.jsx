import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
      }}
    >
      <CircularProgress size={50} thickness={4} />
      {text && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
