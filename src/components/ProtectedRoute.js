import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Snackbar, Alert } from '@mui/material';


const ProtectedRoute = ({ element, allowedProfiles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken.profileType); 

    const { profileType, isAdmin } = decodedToken; 

    
    if (isAdmin) {
      return element;
    }

    if (allowedProfiles && allowedProfiles.includes(profileType)) {
      return element;
    }

    return(
     <div>
      <Alert severity="error" sx={{ width: '100%' }}>
          401 Unauthorized: Access Denied
      </Alert>
    </div>
    )
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
