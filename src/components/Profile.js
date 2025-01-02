import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  ListItemIcon,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';

const Profile = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [iconColor, setIconColor] = useState('primary.main');
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState('');
  const [openSettings, setOpenSettings] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();

  const direction = 'ltr';

  useEffect(() => {
    const picturePath = localStorage.getItem('picture');
    const role = localStorage.getItem('role');

    if (picturePath) {
      setProfilePicture(process.env.REACT_APP_API_BASE_URL + '/' + picturePath);
    }

    if (role) {
      setUserName(role);
    }

    const language = localStorage.getItem('language');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    setUserInfo({ language, picturePath, role, token, userId });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIconColor('primary.dark');
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIconColor('primary.main');
  };

  const handleOpenSettings = () => {
    handleClose();
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', direction }}>
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
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: -6,
            ml: 0,
            borderRadius: 4,
            width: 160,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3))',
            '& .MuiAvatar-root': {
              width: 24,
              height: 24,
              ml: -0.5,
              mr: 1,
            }
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Box sx={{ px: 1, py: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
            {userName} 
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleOpenSettings} sx={{ fontSize: 12, textAlign: 'left' }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('sidebar.Settings')}
        </MenuItem>
        <MenuItem onClick={onLogout} sx={{ fontSize: 12, textAlign: 'left' }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('sidebar.Logout')}
        </MenuItem>
      </Menu>

      <Dialog open={openSettings} onClose={handleCloseSettings} sx={{ "& .MuiDialog-paper": { borderRadius: "8px", padding: "16px", direction } }}>
      <DialogTitle 
  sx={{ 
    bgcolor: 'primary.main', 
    color: 'white', 
    borderRadius: '8px 8px 0 0', 
    textAlign: i18n.language === 'ar' ? 'right' : 'left' 
  }}
>
  {t('sidebar.Settings')}
</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ direction }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={profilePicture} alt="Profile Picture" sx={{ width: 56, height: 56, mr: 2 }} />
                <Typography variant="h6" sx={{ textAlign: 'left' }}>{userName}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ textAlign: 'left' }}><strong>{t('userId')}:</strong> {userInfo.userId}</Typography>
              <Typography variant="body2" sx={{ textAlign: 'left' }}><strong>{t('role')}:</strong> {userInfo.role}</Typography>             
              <Typography variant="body2" sx={{ textAlign: 'left' }}><strong>{t('language')}:</strong> {userInfo.language}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettings} color="primary">
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
