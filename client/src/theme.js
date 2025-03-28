import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee', // Modern blue - more soothing than the previous blue
      light: '#738eec',
      dark: '#2e3eb3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff7d00', // Warmer orange for call-to-actions
      light: '#ffac42',
      dark: '#cc6400',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef476f', // Softer red
      light: '#ff7a98',
      dark: '#b80046',
    },
    success: {
      main: '#06d6a0', // Mint green - more soothing
      light: '#79ffcf',
      dark: '#00a373',
    },
    info: {
      main: '#118ab2', // Teal blue
      light: '#5cbae1',
      dark: '#005e82',
    },
    warning: {
      main: '#ffd166', // Soft gold
      light: '#ffff97',
      dark: '#caa136',
    },
    background: {
      default: '#f8f9fb', // Slightly blue tinted background
      paper: '#ffffff',
    },
    text: {
      primary: '#2b2d42', // Softer black
      secondary: '#5a5c69', // Medium gray
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '8px 24px',
          boxShadow: 'none',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
