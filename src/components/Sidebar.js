import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box, Typography, Tooltip
} from '@mui/material';
import { Brightness4, Brightness7, Language, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FeedbackIcon from '@mui/icons-material/Feedback';
import axios from 'axios';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
const Sidebar = ({ open, toggleDarkMode, darkMode }) => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.common['Authorization'] = token;

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${apiBaseUrl}/api/logout`, {}, config);
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
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: darkMode ? '#333' : '#FFFFFF',
          color: darkMode ? '#fff' : '#2C3E50', 
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 10px',
        },
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <BloodtypeOutlinedIcon color={darkMode ? 'secondary' : 'primary'} sx={{ fontSize: 80 }} />
        <Typography variant="h6" sx={{ color: darkMode ? '#fff' : '#2C3E50' }}>
          {t('sidebar.logo')}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List>
        <ListItem button component={Link} to="/" sx={{ mb: 1, borderRadius: '10px' }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <HomeIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.dashboard')} />
        </ListItem>

        <ListItem button component={Link} to="/add/add_doctors" sx={{ mb: 1, borderRadius: '10px' }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <AddBoxIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.add')} />
        </ListItem>

        <ListItem button component={Link} to="/show/show_doctors" sx={{ mb: 1, borderRadius: '10px' }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <VisibilityIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.show')} />
        </ListItem>

        <ListItem button component={Link} to="/feedback/feedback_doctors" sx={{ mb: 1, borderRadius: '10px' }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <FeedbackIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.feedback')} />
        </ListItem>
      </List>

      <Divider sx={{ mt: 'auto', mb: 2 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <Tooltip title={t('mode')}>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>

        <Tooltip title={t('language')}>
          <IconButton onClick={handleLanguageChange}>
            <Language />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('logout')}>
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
