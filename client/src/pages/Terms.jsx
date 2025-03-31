import React from 'react';
import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import { Gavel } from '@mui/icons-material';

const Terms = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Gavel fontSize="large" color="primary" sx={{ mr: 2 }} />
          <Typography variant="h3" component="h1" fontWeight="bold">
            Terms of Service
          </Typography>
        </Box>
        
        <Typography variant="subtitle1" paragraph color="text.secondary">
          Last updated: October 1, 2023
        </Typography>

        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            1. Agreement to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms of Service constitute a legally binding agreement made between you and MahaLoot concerning your access to and use of our website and services. You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service.
          </Typography>
          <Typography variant="body1" paragraph>
            IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            2. Intellectual Property Rights
          </Typography>
          <Typography variant="body1" paragraph>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and their selection and arrangement are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </Typography>
          <Typography variant="body1" paragraph>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of MahaLoot.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            3. User Representations
          </Typography>
          <Typography variant="body1" paragraph>
            By using the Site, you represent and warrant that:
          </Typography>
          <ul>
            <Typography component="li" variant="body1" paragraph>
              All registration information you submit will be true, accurate, current, and complete.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              You will maintain the accuracy of such information and promptly update it as necessary.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              You have the legal capacity to understand and agree to these Terms of Service.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              You are not a minor in the jurisdiction in which you reside.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              You will not use the Site for any illegal or unauthorized purpose.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Your use of the Site will not violate any applicable law or regulation.
            </Typography>
          </ul>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            4. Prohibited Activities
          </Typography>
          <Typography variant="body1" paragraph>
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            5. Disclaimer
          </Typography>
          <Typography variant="body1" paragraph>
            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            6. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            In order to resolve a complaint or to receive further information regarding the use of the Site, please contact us at:
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            MahaLoot<br />
            Email: terms@MahaLoot.com<br />
            Phone: +91 1234567890
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Terms;
