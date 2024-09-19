import React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box, Typography } from '@mui/material';
import { Brightness4, Brightness7, Language, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedbackIcon from '@mui/icons-material/Feedback';
import axios from 'axios'; // Import axios

const Sidebar = ({ open, toggleDarkMode, darkMode, setLanguage }) => {

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

      // جلب التوكن من localStorage
      const token = `Bearer ${localStorage.getItem('token')}`;

      // إعداد التوكن في جميع طلبات axios
      axios.defaults.headers.common['Authorization'] = token;

  const { t, i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the API to log out
      await axios.post(`${apiBaseUrl}/api/logout`);
      
      // Remove token from localStorage
      localStorage.removeItem('token');
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      // Handle errors if needed
      console.error('Logout failed:', error);
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
        <IconButton onClick={setLanguage} aria-label="change language">
          <Language />
        </IconButton>
        <IconButton onClick={handleLogout} aria-label="log out">
          <LogoutIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
