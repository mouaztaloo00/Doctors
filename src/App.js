import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
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
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/add/add_doctors" element={<ProtectedRoute element={<AddDoctors />} />} />
          <Route path="/add/add_labs" element={<ProtectedRoute element={<AddLabs />} />} />
          <Route path="/add/add_location" element={<ProtectedRoute element={<AddLocation />} />} />
          <Route path="/add/add_tests" element={<ProtectedRoute element={<AddTests />} />} />
          <Route path="/add/add_testcategory" element={<ProtectedRoute element={<AddTestcategory />} />} />
          <Route path="/add/add_paymentMethod" element={<ProtectedRoute element={<AddPaymentMethod />} />} />
          <Route path="/show/show_doctors" element={<ProtectedRoute element={<ShowDoctors />} />} />
          <Route path="/show/show_labs" element={<ProtectedRoute element={<ShowLabs />} />} />
          <Route path="/show/show_location" element={<ProtectedRoute element={<ShowLocation />} />} />
          <Route path="/show/show_tests" element={<ProtectedRoute element={<ShowTests />} />} />
          <Route path="/show/show_testcategory" element={<ProtectedRoute element={<ShowTestcategory />} />} />
          <Route path="/show/show_paymentMethod" element={<ProtectedRoute element={<ShowPaymentMethod />} />} />
          <Route path="/show/show_nurses" element={<ProtectedRoute element={<ShowNurses />} />} />
          <Route path="/feedback/feedback_doctors" element={<ProtectedRoute element={<FeedbackDoctors />} />} />
          <Route path="/feedback/feedback_labs" element={<ProtectedRoute element={<FeedbackLabs />} />} />
          <Route path="/feedback/feedback_nurses" element={<ProtectedRoute element={<FeedbackNurses />} />} />
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

  useEffect(() => {
    setThemeDirection(i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

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
