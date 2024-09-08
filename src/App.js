import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import Show from './pages/Show';
import Feedback from './pages/Feedback';
import './i18n';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [themeDirection, setThemeDirection] = useState('ltr');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true); // تعيين حالة تسجيل الدخول لتكون دائما مفعل

  useEffect(() => {
    setThemeDirection(i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  return (
    <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light', themeDirection)}>
      <CssBaseline />
      <div dir={themeDirection}>
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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add" element={<Add />} />
                <Route path="/show" element={<Show />} />
                <Route path="/feedback" element={<Feedback />} />
              </Routes>
            </main>
          </>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
