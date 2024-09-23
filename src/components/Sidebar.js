import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box, Typography } from '@mui/material';
import { Brightness4, Brightness7, Language, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FeedbackIcon from '@mui/icons-material/Feedback';
import axios from 'axios'; 

const Sidebar = ({ open, toggleDarkMode, darkMode }) => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.common['Authorization'] = token;

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // عند تحميل المكون، تحقق من اللغة المحفوظة في التخزين المحلي
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en'; // اللغة الافتراضية هي الإنجليزية
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const handleLogout = async () => {
    try {
      await axios.post(`${apiBaseUrl}/api/logout`);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLanguageChange = async () => {
    const newLanguage = i18n.language === 'ar' ? 'en' : 'ar';
    try {
      await axios.post(`${apiBaseUrl}/api/profile/language`, { language: newLanguage });
      i18n.changeLanguage(newLanguage);
      localStorage.setItem('language', newLanguage); 
      window.location.reload();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <Drawer
      variant="persistent"
      anchor={direction === 'rtl' ? 'right' : 'left'}
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          background: darkMode ? '#333' : '#ffff',
          color: darkMode ? '#fff' : '#000',
          display: 'flex',
          justifyItems: 'center',
          flexDirection: 'column',
        },
      }}
    >
      <List sx={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <ListItem>
          <ListItemText 
            primary={
              <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>
                {t('sidebar.title')}
              </Typography>
            } 
          />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ minWidth: 35 }}> 
            <HomeIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.dashboard')} sx={{ textAlign: 'center' }} />
        </ListItem>
        <ListItem button component={Link} to="/add/add_doctors">
          <ListItemIcon sx={{ minWidth: 35 }}> 
            <AddCircleIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.add')} sx={{ textAlign: 'center' }} />
        </ListItem>
        <ListItem button component={Link} to="/show/show_doctors">
          <ListItemIcon sx={{ minWidth: 35 }}> 
            <VisibilityIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.show')} sx={{ textAlign: 'center' }} />
        </ListItem>
        <ListItem button component={Link} to="/feedback/feedback_doctors">
          <ListItemIcon sx={{ minWidth: 35 }}> 
            <FeedbackIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.feedback')} sx={{ textAlign: 'center' }} />
        </ListItem>
      </List>   
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 20, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          display: 'flex', 
          gap: 2, 
          flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
          textAlign: direction === 'rtl' ? 'right' : 'left', 
        }}
      >
        <IconButton onClick={toggleDarkMode} aria-label="toggle dark mode">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <IconButton onClick={handleLanguageChange} aria-label="change language">
          <Language />
        </IconButton>
        <IconButton onClick={handleLogout} aria-label="log out">
          <Logout />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
