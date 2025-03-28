import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.secondary',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              DhanBchao
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Making smart shopping decisions easier
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block">
              Home
            </Link>
            <Link component={RouterLink} to="/compare" color="inherit" display="block">
              Compare Products
            </Link>
            <Link component={RouterLink} to="/categories" color="inherit" display="block">
              Categories
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link component={RouterLink} to="/how-it-works" color="inherit" display="block">
              How It Works
            </Link>
            <Link component={RouterLink} to="/faq" color="inherit" display="block">
              FAQ
            </Link>
            <Link component={RouterLink} to="/blog" color="inherit" display="block">
              Blog
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link component={RouterLink} to="/privacy" color="inherit" display="block">
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" display="block">
              Terms of Service
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block">
              Contact Us
            </Link>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} DhanBchao. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
