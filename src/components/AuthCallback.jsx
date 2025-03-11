import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleSSOCallback } from '../redux/slices/loginSlice';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Dispatch the handleSSOCallback action to store token and fetch user info
      dispatch(handleSSOCallback(token))
        .unwrap()
        .then(() => {
          // On successful authentication, redirect to the main application
          navigate('/');
        })
        .catch((error) => {
          console.error('Authentication failed:', error);
          navigate('/login');
        });
    } else {
      // If no token is present, redirect to login
      navigate('/login');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p>Please wait while we complete your sign-in.</p>
      </div>
    </div>
  );
};

export default AuthCallback; 