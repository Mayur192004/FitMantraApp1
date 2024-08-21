import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutComplete, setLogoutComplete] = useState(false); // State to control button visibility

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Send request to logout endpoint
        const response = await fetch('http://localhost:4000/api/v1/logout', {
          method: 'POST',
          credentials: 'include' // Include cookies in the request
        });

        const result = await response.json();

        if (result.success) {
          // Clear local and session storage
          localStorage.removeItem('meals');
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');

          // Dispatch logout action to clear user state in Redux
          dispatch({ type: 'LOGOUT' });

          // Set logout complete state to true
          setLogoutComplete(true);

          // Redirect to home page after a short delay
          setTimeout(() => {
            navigate('/');
          }, 1000); // Adjust delay as needed
        } else {
          alert(result.message);
          navigate('/');
        }
      } catch (err) {
        console.error('Logout error:', err);
        alert('An error occurred during logout. Please try again.');
        navigate('/');
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return (
    <div>
      <p>Logging out...</p>
      {logoutComplete && (
        <div>
          <p>You have been logged out successfully.</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      )}
    </div>
  );
}
