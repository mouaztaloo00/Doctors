import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Menu, MenuItem, IconButton, Typography, Divider, ListItemIcon, Box } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';

const Profile = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [iconColor, setIconColor] = useState('primary.main'); 
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState(''); 
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const picturePath = localStorage.getItem('picture');
    const role = localStorage.getItem('role');

    if (picturePath) {
      setProfilePicture(process.env.REACT_APP_API_BASE_URL + '/' + picturePath);
    }

    if (role) {
      setUserName(role);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIconColor('primary.dark'); 
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIconColor('primary.main');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} anchor={direction === 'rtl' ? 'right' : 'left'}>
      <IconButton onClick={handleClick} size="small" edge="end" aria-label="profile" sx={{ p: 0 }}>
        <Avatar 
          sx={{ bgcolor: iconColor, width: 32, height: 32, fontSize: 14 }} 
          src={profilePicture}
        >
          {!profilePicture && userName.charAt(0)}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: -6,
            ml: 0,
            borderRadius: 4,
            width: 160,
            padding: 0,
            flexDirection: 'column',
            filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3))',
            '& .MuiAvatar-root': {
              width: 24,
              height: 24,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 15,
              width: 8,
              height: 8,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Box sx={{ px: 1, py: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {userName} 
          </Typography>
        </Box>
        <Divider />
        <MenuItem sx={{ fontSize: 12 }}>
          <ListItemIcon >
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('sidebar.Settings')}
        </MenuItem>
        <MenuItem onClick={onLogout} sx={{ fontSize: 12 }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('sidebar.Logout')}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
