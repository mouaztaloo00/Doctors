import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import './App.css';
import { getTheme } from './theme';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import './i18n';
import { useTranslation } from 'react-i18next';
import ShowDoctors from './pages/SupPages/Show/ShowDoctors';
import ShowLabs from './pages/SupPages/Show/ShowLabs';
import ShowLocation from './pages/SupPages/Show/ShowLocation';
import ShowTests from './pages/SupPages/Show/ShowTests';
import ShowTestcategory from './pages/SupPages/Show/ShowTestcategory';
import ShowPaymentMethod from './pages/SupPages/Show/ShowPaymentMethod';
import ShowNurses from './pages/SupPages/Show/ShowNurses';
import AddDoctors from './pages/SupPages/Add/AddDoctors';
import AddLabs from './pages/SupPages/Add/AddLabs';
import AddLocation from './pages/SupPages/Add/AddLocation';
import AddTests from './pages/SupPages/Add/AddTests';
import AddTestcategory from './pages/SupPages/Add/AddTestcategory';
import AddPaymentMethod from './pages/SupPages/Add/AddPaymentMethod';
import FeedbackDoctors from './pages/SupPages/Feedback/FeedbackDoctors';
import FeedbackLabs from './pages/SupPages/Feedback/FeedbackLabs';
import FeedbackNurses from './pages/SupPages/Feedback/FeedbackNurses';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const MainContent = ({ darkMode, toggleDarkMode, sidebarOpen, setSidebarOpen, handleLanguageChange }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`app-container ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      {!isLoginPage && (
        <Sidebar
          open={sidebarOpen}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          toggleSidebar={setSidebarOpen}
          setLanguage={handleLanguageChange}
          className="sidebar"
        />
      )}
      <main className={`main-content ${!isLoginPage && sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} allowedProfiles={['Patient', 'Nurse', 'LabEmployee', 'Doctor', 'LabManager']} />} />
          <Route path="/add/add_doctors" element={<ProtectedRoute element={<AddDoctors />} allowedProfiles={['LabManager']} />}  />
          <Route path="/add/add_labs" element={<ProtectedRoute element={<AddLabs />} allowedProfiles={['LabManager']} />} />
          <Route path="/add/add_location" element={<ProtectedRoute element={<AddLocation />} allowedProfiles={['LabManager']} />}  />
          <Route path="/add/add_tests" element={<ProtectedRoute element={<AddTests />} allowedProfiles={['LabManager']} />}  />
          <Route path="/add/add_testcategory" element={<ProtectedRoute element={<AddTestcategory />} allowedProfiles={['LabManager']} />}  />
          <Route path="/add/add_paymentMethod" element={<ProtectedRoute element={<AddPaymentMethod />} allowedProfiles={['LabManager']} />} />
          <Route path="/show/show_doctors" element={<ProtectedRoute element={<ShowDoctors />} allowedProfiles={['Doctor']} />} />
          <Route path="/show/show_labs" element={<ProtectedRoute element={<ShowLabs />} allowedProfiles={['Doctor']} />}  />
          <Route path="/show/show_location" element={<ProtectedRoute element={<ShowLocation />} allowedProfiles={['Patient']} />}  />
          <Route path="/show/show_tests" element={<ProtectedRoute element={<ShowTests />} allowedProfiles={['Patient']} />}  />
          <Route path="/show/show_testcategory" element={<ProtectedRoute element={<ShowTestcategory />} allowedProfiles={['LabEmployee']} />}  />
          <Route path="/show/show_paymentMethod" element={<ProtectedRoute element={<ShowPaymentMethod />} allowedProfiles={['LabEmployee']} />}  />
          <Route path="/show/show_nurses" element={<ProtectedRoute element={<ShowNurses />} allowedProfiles={['Nurse']} />}  />
          <Route path="/feedback/feedback_doctors" element={<ProtectedRoute element={<FeedbackDoctors />} allowedProfiles={['Patient']} />} />
          <Route path="/feedback/feedback_labs" element={<ProtectedRoute element={<FeedbackLabs />} allowedProfiles={['Patient']} />}  />
          <Route path="/feedback/feedback_nurses" element={<ProtectedRoute element={<FeedbackNurses />} allowedProfiles={['Patient']} />}  />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [themeDirection, setThemeDirection] = useState('ltr');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    setThemeDirection(i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  const refreshToken = async () => {
    try {
      const oldToken = localStorage.getItem('token');
      const response = await axios.post(`${apiBaseUrl}/api/refresh`, {}, {
        headers: {
          Authorization: `Bearer ${oldToken}`,
        },
      });

      const newToken = response.data.data;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error) {
      console.error('Error refreshing token:', error.response ? error.response.data : error.message);
      localStorage.removeItem('token');
      throw error;
    }
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      if (token.split('.').length !== 3) {
        throw new Error('Invalid token format');
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      const tokenExpirationTime = decodedToken.exp;
      const timeRemaining = tokenExpirationTime - currentTime;

      if (timeRemaining < 60) {
        refreshToken();
      }
    } catch (error) {
      console.error('Error decoding token:', error.message);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    const tokenCheckInterval = setInterval(checkTokenExpiration, 30000);

    return () => {
      clearInterval(tokenCheckInterval); 
    };
  }, []);

  return (
    <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light', themeDirection)}>
      <CssBaseline />
      <div className="App" dir={themeDirection}>
        <Router>
          <MainContent
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode(!darkMode)}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            handleLanguageChange={handleLanguageChange}
          />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
