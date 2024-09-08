import React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider ,Box } from '@mui/material';
import { Brightness4, Brightness7, Language } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FeedbackIcon from '@mui/icons-material/Feedback';

const Sidebar = ({ open, toggleDarkMode, darkMode,setLanguage }) => {
  const { t, i18n } = useTranslation();
  const anchor = i18n.language === 'ar' ? 'right' : 'left';

  return (
    <Drawer
      variant="persistent"
      anchor={anchor}
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: darkMode ? '#333' : '#fff',
          color: darkMode ? '#fff' : '#000',
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary={t('sidebar.title')} />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <HomeIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.dashboard')} />
        </ListItem>
        <ListItem button component={Link} to="/add">
          <ListItemIcon>
            <AddCircleIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.add')} />
        </ListItem>
        <ListItem button component={Link} to="/show">
          <ListItemIcon>
            <VisibilityIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.show')} />
        </ListItem>
        <ListItem button component={Link} to="/feedback">
          <ListItemIcon>
            <FeedbackIcon color={darkMode ? 'secondary' : 'primary'} />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.feedback')} />
        </ListItem>
      </List>
      <Divider />
      <Box 
      sx={{ 
        position: 'absolute', 
        bottom: 20, 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        gap: 2 
      }}
    >
      <IconButton onClick={toggleDarkMode} aria-label="toggle dark mode">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <IconButton onClick={setLanguage} aria-label="change language">
        <Language />
      </IconButton>
    </Box>
    </Drawer>
  );
};

export default Sidebar;
