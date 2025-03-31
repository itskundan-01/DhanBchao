import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  alpha,
  SwipeableDrawer,
  List,
  ListItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Favorite,
  CompareArrows,
  Logout as LogoutIcon,
  Dashboard,
  Settings,
  PersonOutline,
  History,
  KeyboardArrowDown,
  Category,
  LocalFireDepartment,
  ChevronRight,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import SearchBar from '../ui/SearchBar';

const pages = [
  { name: 'Dashboard', path: '/dashboard', icon: <Dashboard fontSize="small" /> },
  { name: 'Compare', path: '/compare', icon: <CompareArrows fontSize="small" /> },
  { name: 'Categories', path: '/categories', icon: <Category fontSize="small" /> },
  { name: 'Loot Deals', path: '/loot-deals', icon: <LocalFireDepartment fontSize="small" color="error" /> },
];

const settings = [
  { name: 'Dashboard', path: '/dashboard', icon: <Dashboard fontSize="small" /> },
  { name: 'Profile', path: '/profile', icon: <PersonOutline fontSize="small" /> },
  { name: 'Watchlist', path: '/profile?tab=1', icon: <Favorite fontSize="small" /> },
  { name: 'Browsing History', path: '/profile?tab=2', icon: <History fontSize="small" /> },
  { name: 'Settings', path: '/profile?tab=3', icon: <Settings fontSize="small" /> },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  // We keep the isMobile variable for potential future use
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = (open) => () => {
    setMobileMenuOpen(open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    setLogoutDialogOpen(false);
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backdropFilter: 'blur(10px)',
          backgroundColor: alpha(theme.palette.primary.main, 0.95),
          borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 64 }}>
            {/* Logo - Desktop */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                mr: { xs: 0, md: 3 },
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  background: `linear-gradient(45deg, ${theme.palette.common.white} 30%, ${theme.palette.secondary.light} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                MahaLoot
              </Typography>
            </Box>

            {/* Mobile menu toggle */}
            <IconButton
              size="large"
              aria-label="menu"
              onClick={toggleMobileMenu(true)}
              color="inherit"
              sx={{
                mr: 2,
                display: { md: 'none' },
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.15),
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  startIcon={page.icon}
                  sx={{
                    mx: 0.5,
                    py: 1,
                    px: 2,
                    color: isActive(page.path) 
                      ? theme.palette.common.white 
                      : alpha(theme.palette.common.white, 0.7),
                    display: 'flex',
                    borderRadius: 2,
                    position: 'relative',
                    fontWeight: isActive(page.path) ? 700 : 500,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    overflow: 'hidden',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                      color: theme.palette.common.white,
                    },
                    '&::after': isActive(page.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '3px',
                      backgroundColor: theme.palette.secondary.main,
                    } : {},
                    transition: 'all 0.3s ease',
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Search Bar - Grows to fill space */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <SearchBar />
            </Box>

            {/* Action Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Removing the duplicate Compare icon and keeping only the Watchlist icon */}
              {isAuthenticated && (
                <Tooltip title="Your Watchlist">
                  <IconButton 
                    color="inherit" 
                    component={RouterLink} 
                    to="/profile?tab=1"
                    sx={{
                      position: 'relative',
                      ml: 1,
                      color: isActive('/profile?tab=1') 
                        ? theme.palette.common.white 
                        : alpha(theme.palette.common.white, 0.8),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.common.white, 0.15),
                      },
                      '&::after': isActive('/profile?tab=1') ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: theme.palette.secondary.main,
                      } : {},
                    }}
                  >
                    <Badge 
                      badgeContent={watchlist?.length || 0} 
                      color="error" 
                      max={9}
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.65rem',
                          height: 18,
                          minWidth: 18,
                          padding: '0 4px',
                        }
                      }}
                    >
                      <Favorite />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* User Menu */}
              <Box sx={{ ml: 1 }}>
                <Tooltip title={isAuthenticated ? 'Account settings' : 'Sign in'}>
                  <Button
                    onClick={handleOpenUserMenu}
                    sx={{
                      textTransform: 'none',
                      color: theme.palette.common.white,
                      borderRadius: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      px: 1.5,
                      py: 0.5,
                      ml: 0.5,
                      border: '1px solid',
                      borderColor: alpha(theme.palette.common.white, 0.3),
                      backgroundColor: isActive('/profile') ? alpha(theme.palette.common.white, 0.1) : 'transparent',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.common.white, 0.15),
                        borderColor: alpha(theme.palette.common.white, 0.5),
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {isAuthenticated ? (
                      <>
                        <Avatar 
                          alt={user?.name} 
                          src={user?.avatar} 
                          sx={{ 
                            width: 32, 
                            height: 32,
                            mr: 1,
                            border: '1px solid',
                            borderColor: alpha(theme.palette.common.white, 0.5),
                          }}
                        />
                        <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {user?.name?.split(' ')[0]}
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <Typography>Sign In</Typography>
                    )}
                    <KeyboardArrowDown fontSize="small" sx={{ ml: 0.5, opacity: 0.8 }} />
                  </Button>
                </Tooltip>
                <Menu
                  sx={{ 
                    mt: '45px',
                    '& .MuiPaper-root': {
                      overflow: 'visible',
                      borderRadius: 2,
                      minWidth: 250,
                      boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                      mt: 1.5,
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: -10,
                        right: 14,
                        width: 20,
                        height: 20,
                        backgroundColor: 'background.paper',
                        transform: 'rotate(45deg)',
                        zIndex: 0,
                      },
                      '& .MuiMenu-list': {
                        p: 2,
                        zIndex: 1,
                        position: 'relative',
                      },
                      '& .MuiMenuItem-root': {
                        p: 1.5,
                        borderRadius: 1.5,
                        mb: 0.5,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        },
                      },
                    }
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {isAuthenticated ? (
                    <>
                      <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {user?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user?.email}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 1.5 }} />
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting.name}
                          component={RouterLink}
                          to={setting.path}
                          onClick={handleCloseUserMenu}
                          sx={{
                            borderRadius: 1.5,
                            mb: 0.5,
                            backgroundColor: isActive(setting.path) ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {setting.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={setting.name}
                            primaryTypographyProps={{
                              fontWeight: isActive(setting.path) ? 600 : 400
                            }}
                          />
                          {isActive(setting.path) && (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                mr: 1
                              }}
                            />
                          )}
                        </MenuItem>
                      ))}
                      <Divider sx={{ my: 1.5 }} />
                      <MenuItem 
                        onClick={handleLogoutClick} 
                        sx={{ 
                          borderRadius: 1.5,
                          color: theme.palette.error.main,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.error.main, 0.08),
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </MenuItem>
                    </>
                  ) : (
                    <Box>
                      <MenuItem 
                        component={RouterLink} 
                        to="/auth" 
                        onClick={handleCloseUserMenu}
                        sx={{ 
                          borderRadius: 1.5,
                          mb: 1,
                          py: 1.5,
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <AccountCircle fontSize="small" sx={{ color: theme.palette.primary.contrastText }} />
                        </ListItemIcon>
                        <ListItemText primary="Sign In / Register" />
                      </MenuItem>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ px: 2, py: 1.5, textAlign: 'center' }}
                      >
                        Sign in to track prices, create alerts, and access personalized recommendations
                      </Typography>
                    </Box>
                  )}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile navigation drawer */}
      <SwipeableDrawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu(false)}
        onOpen={toggleMobileMenu(true)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            borderRadius: '0 16px 16px 0',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MahaLoot
          </Typography>
          <IconButton onClick={toggleMobileMenu(false)} edge="end">
            <ChevronRight />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ px: 2, py: 1 }}>
          {pages.map((page) => (
            <ListItem
              button
              key={page.name}
              component={RouterLink}
              to={page.path}
              onClick={toggleMobileMenu(false)}
              sx={{
                mb: 1,
                borderRadius: 2,
                backgroundColor: isActive(page.path) 
                  ? alpha(theme.palette.primary.main, 0.1)
                  : 'transparent',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: isActive(page.path) ? theme.palette.primary.main : 'inherit' }}>
                {page.icon}
              </ListItemIcon>
              <ListItemText 
                primary={page.name} 
                primaryTypographyProps={{
                  fontWeight: isActive(page.path) ? 600 : 400,
                  color: isActive(page.path) ? theme.palette.primary.main : 'inherit'
                }}
              />
              {isActive(page.path) && (
                <Box
                  sx={{
                    width: 4,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    ml: 1
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List sx={{ px: 2, py: 1 }}>
          {isAuthenticated ? (
            <>
              <ListItem sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Avatar 
                    alt={user?.name}
                    src={user?.avatar}
                    sx={{ mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              {settings.map((setting) => (
                <ListItem
                  button
                  key={setting.name}
                  component={RouterLink}
                  to={setting.path}
                  onClick={toggleMobileMenu(false)}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: isActive(setting.path) 
                      ? alpha(theme.palette.primary.main, 0.1)
                      : 'transparent',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: isActive(setting.path) ? theme.palette.primary.main : 'inherit' }}>
                    {setting.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={setting.name}
                    primaryTypographyProps={{
                      fontWeight: isActive(setting.path) ? 600 : 400,
                      color: isActive(setting.path) ? theme.palette.primary.main : 'inherit'
                    }}
                  />
                </ListItem>
              ))}
              <Divider sx={{ my: 1.5 }} />
              <ListItem 
                button
                onClick={() => {
                  toggleMobileMenu(false)();
                  setLogoutDialogOpen(true);
                }}
                sx={{ borderRadius: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: theme.palette.error.main }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout" 
                  primaryTypographyProps={{
                    color: theme.palette.error.main
                  }}
                />
              </ListItem>
            </>
          ) : (
            <ListItem
              button
              component={RouterLink}
              to="/auth"
              onClick={toggleMobileMenu(false)}
              sx={{
                py: 1.5,
                borderRadius: 2,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: theme.palette.primary.contrastText }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Sign In / Register" />
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        PaperProps={{ 
          elevation: 3,
          sx: { borderRadius: 3, p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>
          Ready to leave?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout from your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={handleLogoutCancel} 
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLogoutConfirm} 
            color="error" 
            variant="contained"
            autoFocus
            sx={{ borderRadius: 2, px: 3 }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
