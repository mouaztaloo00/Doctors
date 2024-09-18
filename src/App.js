import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
      <CssBaseline/>
      <div className='App' dir={themeDirection}>
        <Router>
            <>
              <Sidebar
                open={sidebarOpen}
                toggleDarkMode={() => setDarkMode(!darkMode)}
                darkMode={darkMode}
                toggleSidebar={setSidebarOpen}
                setLanguage={handleLanguageChange}
              />
              <main style={{ marginLeft: themeDirection === 'ltr' && sidebarOpen ? 240 : 0, marginRight: themeDirection === 'rtl' && sidebarOpen ? 240 : 0 }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/add/add_doctors" element={<AddDoctors />} />
                  <Route path="/add/add_labs" element={<AddLabs />} />
                  <Route path="/add/add_location" element={<AddLocation />} />
                  <Route path="/add/add_tests" element={<AddTests />} />
                  <Route path="/add/add_testcategory" element={<AddTestcategory />} />
                  <Route path="/add/add_paymentMethod" element={<AddPaymentMethod />} />
                  <Route path="/show/show_doctors" element={<ShowDoctors />} />
                  <Route path="/show/show_labs" element={<ShowLabs />} />
                  <Route path="/show/show_location" element={<ShowLocation />} />
                  <Route path="/show/show_tests" element={<ShowTests />} />
                  <Route path="/show/show_testcategory" element={<ShowTestcategory />} />
                  <Route path="/show/show_paymentMethod" element={<ShowPaymentMethod />} />
                  <Route path="/show/show_nurses" element={<ShowNurses />} />
                  <Route path="/feedback/feedback_doctors" element={<FeedbackDoctors />} />
                  <Route path="/feedback/feedback_labs" element={<FeedbackLabs />} />
                  <Route path="/feedback/feedback_nurses" element={<FeedbackNurses />} />
                </Routes>
              </main>
            </>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
