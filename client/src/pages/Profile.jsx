import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Grid, Paper, Box, 
  Avatar, Button, TextField, Divider, List,
  ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction,
  Tab, Tabs, IconButton, Chip, Switch, FormControlLabel, MenuItem,
  Alert, CircularProgress
} from '@mui/material';
import { 
  Edit, Notifications, Favorite, 
  History, Delete, ShoppingBag, Save, Cancel 
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateProfile, 
  updatePassword, 
  fetchWatchlist, 
  removeFromWatchlist 
} from '../redux/actions/userActions';
import { showToast } from '../redux/actions/uiActions';
import Loader from '../components/ui/Loader';
import ErrorAlert from '../components/ui/ErrorAlert';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user data from Redux store
  const { user } = useSelector(state => state.auth);
  const { 
    profile, 
    watchlist, 
    history: browsingHistory, 
    loading, 
    success, 
    error 
  } = useSelector(state => state.user);

  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    preferences: {
      favoriteCategories: [],
      favoriteStores: [],
      priceAlerts: true,
      emailNotifications: true
    }
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

  // Initialize profile data from Redux state
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        preferences: user.preferences || {
          favoriteCategories: [],
          favoriteStores: [],
          priceAlerts: true,
          emailNotifications: true
        }
      });
    }
  }, [user]);

  // Fetch watchlist when component mounts or when tab changes to watchlist
  useEffect(() => {
    if (tabValue === 1) {
      dispatch(fetchWatchlist());
    }
  }, [dispatch, tabValue]);

  // Reset form data when exiting edit mode
  useEffect(() => {
    if (!editMode && user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        preferences: user.preferences || {
          favoriteCategories: [],
          favoriteStores: [],
          priceAlerts: true,
          emailNotifications: true
        }
      });
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordError('');
    }
  }, [editMode, user]);

  // Show toast notification when profile update is successful
  useEffect(() => {
    if (success.profile) {
      dispatch(showToast('Profile updated successfully', 'success'));
      setEditMode(false);
    }
    if (success.password) {
      dispatch(showToast('Password updated successfully', 'success'));
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [dispatch, success]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileUpdate = () => {
    dispatch(updateProfile(profileData));
  };

  const handlePasswordUpdate = () => {
    // Validate password fields
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    
    dispatch(updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    // Clear error when typing
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setProfileData({
      ...profileData,
      preferences: {
        ...profileData.preferences,
        [name]: checked
      }
    });
  };

  const handleCategoryChange = (event) => {
    setProfileData({
      ...profileData,
      preferences: {
        ...profileData.preferences,
        favoriteCategories: event.target.value
      }
    });
  };

  const handleStoreChange = (event) => {
    setProfileData({
      ...profileData,
      preferences: {
        ...profileData.preferences,
        favoriteStores: event.target.value
      }
    });
  };

  const handleRemoveFromWatchlist = (productId) => {
    dispatch(removeFromWatchlist(productId));
  };

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Loader text="Loading user profile..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<Avatar sx={{ width: 24, height: 24 }} />} iconPosition="start" label="Profile" />
          <Tab icon={<Favorite sx={{ width: 24, height: 24 }} />} iconPosition="start" label="Watchlist" />
          <Tab icon={<History sx={{ width: 24, height: 24 }} />} iconPosition="start" label="History" />
          <Tab icon={<Notifications sx={{ width: 24, height: 24 }} />} iconPosition="start" label="Notifications" />
        </Tabs>
      </Box>

      {/* Profile Tab */}
      {tabValue === 0 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                src={user.avatar || '/default-avatar.png'}
                alt={user.name}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since: {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={editMode ? <Cancel /> : <Edit />}
                sx={{ mt: 2 }}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel Editing' : 'Edit Profile'}
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            {/* Personal Information */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Personal Information</Typography>
                {editMode && (
                  <Button 
                    variant="contained" 
                    onClick={handleProfileUpdate}
                    startIcon={<Save />}
                    disabled={loading.profile}
                  >
                    {loading.profile ? 'Saving...' : 'Save Changes'}
                  </Button>
                )}
              </Box>
              <Divider sx={{ mb: 3 }} />

              {error && <ErrorAlert error={error} />}

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!editMode}
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!editMode}
                    margin="normal"
                    required
                    type="email"
                  />
                </Grid>
              </Grid>

              {/* Password Change Section */}
              {editMode && (
                <>
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Change Password</Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  {passwordError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {passwordError}
                    </Alert>
                  )}
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                        required
                        helperText="Minimum 6 characters"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handlePasswordUpdate}
                        disabled={loading.password}
                      >
                        {loading.password ? 'Updating Password...' : 'Update Password'}
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Preferences</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Favorite Categories"
                    name="favoriteCategories"
                    value={profileData.preferences.favoriteCategories || []}
                    onChange={handleCategoryChange}
                    SelectProps={{
                      multiple: true,
                      renderValue: (selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      ),
                    }}
                    disabled={!editMode}
                    fullWidth
                    margin="normal"
                  >
                    {['Electronics', 'Books', 'Fashion', 'Home', 'Beauty'].map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Favorite Stores"
                    name="favoriteStores"
                    value={profileData.preferences.favoriteStores || []}
                    onChange={handleStoreChange}
                    SelectProps={{
                      multiple: true,
                      renderValue: (selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      ),
                    }}
                    disabled={!editMode}
                    fullWidth
                    margin="normal"
                  >
                    {['Amazon', 'Flipkart', 'Myntra', 'Croma', 'Reliance Digital'].map((store) => (
                      <MenuItem key={store} value={store}>
                        {store}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={profileData.preferences.priceAlerts}
                        onChange={handleToggleChange}
                        name="priceAlerts"
                        disabled={!editMode}
                      />
                    }
                    label="Price Drop Alerts"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={profileData.preferences.emailNotifications}
                        onChange={handleToggleChange}
                        name="emailNotifications"
                        disabled={!editMode}
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Watchlist Tab */}
      {tabValue === 1 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>My Watchlist</Typography>
          <Divider sx={{ mb: 2 }} />
          
          {loading.watchlist ? (
            <Loader text="Loading watchlist..." />
          ) : (
            <>
              {watchlist && watchlist.length > 0 ? (
                <List>
                  {watchlist.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar sx={{ minWidth: 80 }}>
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            variant="square"
                            sx={{ width: 60, height: 60 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={
                            <React.Fragment>
                              <Typography variant="body2" component="span">
                                Current Price: ₹{item.currentPrice} at {item.store}
                              </Typography>
                              <br />
                              <Typography
                                variant="body2"
                                component="span"
                                color={item.currentPrice < item.initialPrice ? 'success.main' : 'text.secondary'}
                              >
                                {item.currentPrice < item.initialPrice
                                  ? `Price dropped by ₹${item.initialPrice - item.currentPrice}`
                                  : 'No price change'}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleRemoveFromWatchlist(item.id)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <ShoppingBag sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Your watchlist is empty
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add products to your watchlist to track price changes.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Paper>
      )}

      {/* Browsing History Tab */}
      {tabValue === 2 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Browsing History</Typography>
          <Divider sx={{ mb: 2 }} />
          
          {loading.history ? (
            <Loader text="Loading browsing history..." />
          ) : (
            <>
              {browsingHistory && browsingHistory.length > 0 ? (
                <List>
                  {browsingHistory.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar sx={{ minWidth: 80 }}>
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            variant="square"
                            sx={{ width: 60, height: 60 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={
                            <Typography variant="body2" component="span">
                              Viewed on: {new Date(item.viewedDate).toLocaleDateString()}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <History sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No browsing history yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Products you view will appear here.
                  </Typography>
                </Box>
              )}
            </>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" color="secondary" startIcon={<Delete />}>
              Clear History
            </Button>
          </Box>
        </Paper>
      )}

      {/* Notifications Tab */}
      {tabValue === 3 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Notification Settings</Typography>
          <Divider sx={{ mb: 3 }} />
          
          <List>
            <ListItem>
              <ListItemText 
                primary="Price Drop Alerts" 
                secondary="Get notified when products in your watchlist drop in price"
              />
              <Switch
                edge="end"
                checked={profileData.preferences.priceAlerts}
                onChange={handleToggleChange}
                name="priceAlerts"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Email Notifications" 
                secondary="Receive updates via email"
              />
              <Switch
                edge="end"
                checked={profileData.preferences.emailNotifications}
                onChange={handleToggleChange}
                name="emailNotifications"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Deal Alerts" 
                secondary="Get notified about trending deals"
              />
              <Switch edge="end" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Back in Stock" 
                secondary="Get notified when out-of-stock items return"
              />
              <Switch edge="end" />
            </ListItem>
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default Profile;
