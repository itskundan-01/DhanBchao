import React from 'react';
import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import { Security } from '@mui/icons-material';

const Privacy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Security fontSize="large" color="primary" sx={{ mr: 2 }} />
          <Typography variant="h3" component="h1" fontWeight="bold">
            Privacy Policy
          </Typography>
        </Box>
        
        <Typography variant="subtitle1" paragraph color="text.secondary">
          Last updated: October 1, 2023
        </Typography>

        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            MahaLoot ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our price comparison services.
          </Typography>
          <Typography variant="body1" paragraph>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            2. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We may collect information about you in various ways. The information we may collect via the Site includes:
          </Typography>
          <Typography variant="body1" paragraph fontWeight="medium">
            Personal Data
          </Typography>
          <Typography variant="body1" paragraph>
            Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
          </Typography>
          <Typography variant="body1" paragraph fontWeight="medium">
            Derivative Data
          </Typography>
          <Typography variant="body1" paragraph>
            Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            3. Use of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </Typography>
          <ul>
            <Typography component="li" variant="body1" paragraph>
              Create and manage your account.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Process your transactions.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Send you price alerts and deals that match your interests.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Assist law enforcement and respond to subpoenas.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Compile anonymous statistical data for research purposes.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Deliver targeted advertising, newsletters, and other promotional materials.
            </Typography>
          </ul>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            4. Cookies and Web Beacons
          </Typography>
          <Typography variant="body1" paragraph>
            We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            5. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            MahaLoot<br />
            Email: privacy@MahaLoot.com<br />
            Phone: +91 1234567890
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Privacy;
