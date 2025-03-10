import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { logout } from '../redux/slices/loginSlice';

const ProtectedRoute = ({ children, requireSignup }) => {
  const { user, token } = useSelector((state) => state.login);
  const { signupSuccess } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          // Try to make a request to verify token is still valid
          await axios.get(`${import.meta.env.VITE_ROOT_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          if (error.response?.status === 401) {
            // Token is expired or invalid
            dispatch(logout());
          }
        }
      }
    };
    verifyToken();
  }, [token, dispatch]);

  // For account created page, check signup success
  if (requireSignup && !signupSuccess) {
    return <Navigate to="/signup" replace />;
  }

  // For other protected routes, check for both user and valid token
  if (!requireSignup && (!user || !token)) {
    // Clear any stale data from localStorage
    localStorage.removeItem('authToken');
    // Redirect to login page but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 