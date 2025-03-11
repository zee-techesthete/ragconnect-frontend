import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireSignup, isPublic }) => {
  const { user, token } = useSelector((state) => state.login);
  const { signupSuccess } = useSelector((state) => state.auth);
  const location = useLocation();

  // Handle public routes (login, signup, etc.)
  if (isPublic) {
    // If user is authenticated, redirect to home
    if (user && token) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // For account created page, check signup success
  if (requireSignup && !signupSuccess && !token) {
    return <Navigate to="/signup" replace />;
  }

  // For protected routes, check for both user and valid token
  if (!user || !token) {
    // Save the attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 