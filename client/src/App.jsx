import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';

import theme from './theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
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

// New page imports
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

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
      const protectedRoutes = ['/profile', '/dashboard'];
      
      // Check if trying to access protected routes
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
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
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
            
            {/* New Pages */}
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
      </div>
    </ThemeProvider>
  );
}

export default App;
