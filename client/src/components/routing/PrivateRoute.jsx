import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../ui/Loader';
import { showToast } from '../../redux/actions/uiActions';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, error } = useSelector(state => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && !isAuthenticated && !loading) {
      dispatch(showToast('Please log in to access this page', 'warning'));
    }
  }, [error, isAuthenticated, loading, dispatch]);

  if (loading) {
    return <Loader text="Authenticating..." />;
  }

  if (!isAuthenticated) {
    // Redirect to login page with return path
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;
