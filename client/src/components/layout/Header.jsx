import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Favorite,
  Notifications,
  CompareArrows,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import SearchBar from '../ui/SearchBar';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Compare', path: '/compare' },
  { name: 'Categories', path: '/categories' },
  { name: 'Loot Deals', path: '/loot-deals' },
];

const settings = [
  { name: 'Profile', path: '/profile', icon: <AccountCircle fontSize="small" sx={{ mr: 1 }} /> },
  { name: 'Watchlist', path: '/profile?tab=1', icon: <Favorite fontSize="small" sx={{ mr: 1 }} /> },
  { name: 'Settings', path: '/profile?tab=3', icon: <Notifications fontSize="small" sx={{ mr: 1 }} /> },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo - Desktop */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DhanBchao
            </Typography>

            {/* Menu - Mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.path}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo - Mobile */}
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DhanBchao
            </Typography>

            {/* Menu - Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Search Bar */}
            <SearchBar />

            {/* Action Icons */}
            <Box sx={{ display: 'flex', ml: 2 }}>
              <Tooltip title="Comparison List">
                <IconButton color="inherit" component={RouterLink} to="/compare">
                  <CompareArrows />
                </IconButton>
              </Tooltip>

              {isAuthenticated && (
                <Tooltip title="Watchlist">
                  <IconButton color="inherit" component={RouterLink} to="/profile?tab=1">
                    <Badge badgeContent={watchlist?.length || 0} color="secondary" max={9}>
                      <Favorite />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            {/* User Menu */}
            <Box sx={{ ml: 1 }}>
              <Tooltip title={isAuthenticated ? 'Account settings' : 'Sign in'}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {isAuthenticated && user?.avatar ? (
                    <Avatar alt={user.name} src={user.avatar} />
                  ) : (
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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
                    <MenuItem disabled>
                      <Typography variant="body2" color="text.secondary">
                        Hello, {user?.name?.split(' ')[0]}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        component={RouterLink}
                        to={setting.path}
                        onClick={handleCloseUserMenu}
                      >
                        {setting.icon}
                        <Typography textAlign="center">{setting.name}</Typography>
                      </MenuItem>
                    ))}
                    <Divider />
                    <MenuItem onClick={handleLogoutClick}>
                      <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem component={RouterLink} to="/auth" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Sign In</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to logout from your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="error" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
