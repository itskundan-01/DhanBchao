import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';

import theme from './theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Compare from './pages/Compare';
import Profile from './pages/Profile';
import Authentication from './pages/Authentication';
import Categories from './pages/Categories';
import SearchResults from './pages/SearchResults';
import LootDeals from './pages/LootDeals';
import { loadUser } from './redux/actions/authActions';
import PrivateRoute from './components/routing/PrivateRoute';
import Toast from './components/ui/Toast';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(state => state.auth);

  // Load user data if token exists
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Handle authentication errors
  useEffect(() => {
    if (error && !isAuthenticated) {
      const currentPath = window.location.pathname;
      // Check if trying to access protected routes
      const protectedRoutes = ['/profile'];
      
      if (protectedRoutes.some(route => currentPath.startsWith(route))) {
        navigate('/auth', { state: { from: currentPath } });
      }
    }
  }, [error, isAuthenticated, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:category" element={<Categories />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/loot-deals" element={<LootDeals />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
      </div>
    </ThemeProvider>
  );
}

export default App;
