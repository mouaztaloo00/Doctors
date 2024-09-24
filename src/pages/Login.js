import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Snackbar, TextField, Button, Alert, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { messaging, getToken } from '../firebase';

const Login = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    getToken(messaging, { vapidKey: 'BPSaMt94J9JyYBN7nby_r0sEkZoPPodtQDh0629OFjJnqXPeVfKSuAl0MuE4MwuR54ecXEvHGWBUcabXHPsiEHE' })
      .then(currentToken => {
        if (currentToken) {
          console.log('FCM Token:', currentToken);
          setFcmToken(currentToken);
        } else {
          console.log('No registration token available.');
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }, []);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!fcmToken) {
      setSnackbarMessage('FCM token is not available. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/api/login`, {
        phone_number: phoneNumber,
        password: password,
        fcm_token: fcmToken,
      });

      const { message, data } = response.data;

      if (response.status === 200) {
        localStorage.setItem('token', data);
        setSnackbarMessage(`Login successful: ${message}`);
        setSnackbarSeverity('success');
        navigate('/');
      } else {
        throw new Error(message);
      }
    } catch (error) {
      setSnackbarMessage(error.response ? error.response.data.message : `Login failed: ${error.message}`);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} // Added this
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          position: 'fixed',
          top: '80%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
