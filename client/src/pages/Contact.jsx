import React, { useState } from 'react';
import { 
  Container, Typography, Paper, Box, Grid, TextField, 
  Button, Divider, Alert, Snackbar, Card, CardContent,
  List, ListItem, ListItemIcon, ListItemText 
} from '@mui/material';
import { 
  Email, Phone, LocationOn, Send, AccessTime, Language
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // In a real application, you would send the form data to your backend
      console.log('Form submitted with data:', formData);
      
      // Show success message
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom fontWeight="bold">
        Contact Us
      </Typography>
      
      <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
        Have questions or feedback? We'd love to hear from you. Fill out the form below 
        or use our contact information to get in touch.
      </Typography>
      
      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={5}>
          <Box sx={{ height: '100%' }}>
            <Card elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Contact Information
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
                  Reach out to our friendly support team through any of these channels:
                </Typography>
                
                <List sx={{ p: 0 }}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email"
                      secondary={
                        <Typography 
                          component="a" 
                          href="mailto:support@MahaLoot.com" 
                          color="primary"
                          sx={{ textDecoration: 'none' }}
                        >
                          support@MahaLoot.com
                        </Typography>
                      } 
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Phone" 
                      secondary={
                        <Typography 
                          component="a" 
                          href="tel:+911234567890" 
                          color="primary"
                          sx={{ textDecoration: 'none' }}
                        >
                          +91 1234 567 890
                        </Typography>
                      }
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Address" 
                      secondary="123 Tech Park, Sector 15, Gurugram, Haryana 122001, India" 
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon>
                      <AccessTime color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Business Hours" 
                      secondary="Monday - Friday: 9:00 AM - 6:00 PM IST" 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <Box
                component="iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2233610384613!2d77.03902221508285!3d28.4674416824886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18df885332b5%3A0x682e66165dce9f96!2sSector%2015%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1643290823245!5m2!1sen!2sin"
                sx={{ border: 0, width: '100%', height: 250, borderRadius: '8px 8px 0 0' }}
                allowFullScreen=""
                loading="lazy"
                title="Office Location"
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Language sx={{ mr: 1, color: 'primary.main' }} fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    Our office is centrally located and easily accessible via public transportation
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        
        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Send us a Message
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              We'll get back to you as quickly as possible. Most inquiries receive a response within 24 hours.
            </Typography>
            
            {Object.keys(errors).length > 0 && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Please correct the errors below to submit the form.
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    type="email"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    error={Boolean(errors.subject)}
                    helperText={errors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="message"
                    label="Message"
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    multiline
                    rows={5}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                  />
                </Grid>
              </Grid>
              
              <Button 
                type="submit" 
                variant="contained" 
                size="large" 
                startIcon={<Send />} 
                sx={{ mt: 3, px: 4, py: 1.5, borderRadius: 2 }}
              >
                Send Message
              </Button>
            </Box>
          </Paper>
          
          {/* FAQ Link */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Have general questions? Check out our 
              <Button 
                component="a" 
                href="/faq" 
                color="primary" 
                sx={{ textTransform: 'none', fontWeight: 'bold', ml: 0.5 }}
              >
                Frequently Asked Questions
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      {/* Success Message Snackbar */}
      <Snackbar 
        open={submitted} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Thank you for your message! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
