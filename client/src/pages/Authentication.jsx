import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import { 
  Person, 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Google,
  Facebook,
  Twitter
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../redux/actions/authActions';
import { showToast } from '../redux/actions/uiActions';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the return URL from location state or default to homepage
  const from = location.state?.from || '/';
  
  // Get auth state from Redux
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(showToast(
        isLogin ? 'Successfully logged in!' : 'Account created successfully!', 
        'success'
      ));
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from, isLogin, dispatch]);

  const handleTabChange = (event, newValue) => {
    setIsLogin(newValue === 0);
    // Reset form data and errors on tab change
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      if (isLogin) {
        dispatch(login(formData.email, formData.password));
      } else {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        dispatch(register(userData));
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 } }}>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Tabs
            value={isLogin ? 0 : 1}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="authentication tabs"
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>

        <Typography variant="h5" component="h1" align="center" gutterBottom>
          {isLogin ? 'Sign In to Your Account' : 'Create a New Account'}
        </Typography>
        
        {/* Error display area */}
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            Please correct the errors below.
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Name field - only for registration */}
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          )}
          
          {/* Email field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          
          {/* Password field */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {/* Confirm Password - only for registration */}
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          )}
          
          {/* Forgot Password link - only for login */}
          {isLogin && (
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Typography 
                variant="body2" 
                color="primary"
                sx={{ cursor: 'pointer' }}
              >
                Forgot password?
              </Typography>
            </Box>
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </Button>
          
          <Box sx={{ mt: 3, mb: 3 }}>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
          </Box>
          
          {/* Social login options */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{ borderColor: '#DB4437', color: '#DB4437' }}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                sx={{ borderColor: '#4267B2', color: '#4267B2' }}
              >
                Facebook
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Twitter />}
                sx={{ borderColor: '#1DA1F2', color: '#1DA1F2' }}
              >
                Twitter
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Authentication;
