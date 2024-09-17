import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
  CssBaseline,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import axios from "axios";
import { requestFCMToken, onMessageListener } from "../utils/firebaseUtils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/login`;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const token = await requestFCMToken();
        if (token) {
          setFcmToken(token);
          console.log("FCM Token:", token);
        } else {
          console.log("No FCM token available.");
        }
      } catch (error) {
        console.error("Failed to get FCM token", error);
      }
    };

    fetchFcmToken();
  }, []);

  useEffect(() => {
    const handleMessage = (payload) => {
      toast(
        <div>
          <strong>Message:</strong> {payload.notification.title}
          <br />
          <strong>Body:</strong> {payload.notification.body}
        </div>,
        { position: "top-center" }
      );
      console.log("Received foreground message:", payload);
    };

    const unsubscribe = onMessageListener()
      .then(handleMessage)
      .catch(err => console.error("Error receiving message: ", err));

    return () => {
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setOpenSnackbar(false);

    if (!phoneNumber || !password) {
      setError("Phone Number and Password are required");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(url, { phone_number: phoneNumber, password, fcm_token: fcmToken });

      if (response.data.message === "Login Successful") {
        localStorage.setItem('authToken', response.data.token || '');
        setSuccess("Login successful!");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(response.data.message || "Invalid Phone Number or Password");
        setOpenSnackbar(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error occurred while logging in";
      setError(errorMessage);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError("");
    setSuccess("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1.4, bgcolor: "secondary.main", width: 56, height: 56 }}>
          <LockOutlinedIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PhoneRoundedIcon sx={{ color: 'action.active', fontSize: 40, m: 1, my: 2 }} />
            <TextField
              margin="normal"
              autoComplete="off"
              required
              fullWidth
              label="Phone Number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoFocus
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <HttpsRoundedIcon sx={{ color: 'action.active', mr: 1, fontSize: 40, m: 1, my: 2 }} />
            <TextField
              margin="normal" 
              autoComplete="off"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button
            type="submit"
            endIcon={<LoginRoundedIcon />}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={success ? "success" : error ? "error" : "info"}
            sx={{ width: '100%', borderRadius: '20px' }}
          >
            {success || error}
          </Alert>
        </Snackbar>
        {loading && (
          <CircularProgress sx={{ mt: 2 }} />
        )}
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Login;
